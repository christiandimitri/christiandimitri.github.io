---
title: Reading IFC with xBIM: field notes from a .NET developer
date: 2022-04-05
tags: C#, IFC, BIM, .NET
summary: IFC is a thirty-year-old schema hiding a graph database. Notes on extracting real quantities and properties with xBIM, written after the culture shock wore off.
---

If you build software for construction, sooner or later every road leads to **IFC**, the open exchange format every BIM tool can export and every developer wishes they could avoid. This year I stopped avoiding it. My tool on .NET is [xBIM](https://github.com/xBimTeam), and these are the notes I wish someone had handed me at the start.

## The culture shock

IFC is not a 3D format. It's an **EXPRESS schema**, an object graph with hundreds of entity types, where a wall is `IfcWall` but its geometry, placement, material and properties are all separate entities linked through relationship objects. Nothing is where a graphics programmer expects it.

The canonical surprise: properties are not *on* the element. They hang off `IfcRelDefinesByProperties` relations pointing to property sets. I spent a genuinely embarrassing afternoon looking for a wall's fire rating before that clicked.

![How one wall's data actually hangs together in IFC](/img/ifc-graph.svg)

Once you internalize "everything is a relationship", the schema stops fighting you:

```csharp
using var model = IfcStore.Open("project.ifc");

var walls = model.Instances.OfType<IIfcWall>();
foreach (var wall in walls)
{
    var psets = wall.IsDefinedBy
        .Select(r => r.RelatingPropertyDefinition)
        .OfType<IIfcPropertySet>();

    var fireRating = psets.SelectMany(ps => ps.HasProperties)
        .OfType<IIfcPropertySingleValue>()
        .FirstOrDefault(p => p.Name == "FireRating")?
        .NominalValue;
}
```

## Quantities, the honest way

For anything cost-related you want `IfcElementQuantity`: NetVolume, GrossArea and friends, rather than measuring geometry yourself. When the authoring tool exports them they reflect design intent. Recomputing from tessellated meshes gives you approximations with confident faces. My rule now: read declared quantities first, fall back to geometry, and always flag which one you used.

xBIM will also tessellate geometry into meshes (`Xbim.Geometry`), which is how I feed IFC into viewers. But the deeper value is the graph. Spatial containment (site → building → storey → element), type objects carrying shared properties, and `GlobalId`s that survive round-trips between tools. That last one is quietly the most important field in the schema: it's the primary key your database keeps while models get re-exported around you.

## Why bother

Because the alternative is lock-in. Proprietary SDKs read one vendor's files, on their terms, usually on Windows, sometimes only inside their application process. An open schema plus an open-source reader means my extraction pipeline is mine. I can run it in a service, test it in CI, and nobody deprecates my access.

The next frontier is obvious from here: this same graph, parsed in the browser. The [web-ifc](https://github.com/ThatOpen/engine_web-ifc) work happening in JavaScript and WASM is young but moving fast, and a BIM model as just another web resource is too good an idea to ignore.
