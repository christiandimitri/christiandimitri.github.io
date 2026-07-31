---
title: Writing Grasshopper components in C#: Delaunay and Voronoi from scratch
date: 2019-02-20
tags: Grasshopper, C#, Rhino, Geometry
summary: Leaving node spaghetti behind — implementing Bowyer–Watson triangulation as a proper Grasshopper plugin, and why rolling your own beats a black box.
---

There is a moment in every Grasshopper user's life when the canvas becomes the problem. Mine came with a definition that had grown to a few hundred components, half of them doing what five lines of code could express. So I opened Visual Studio and started writing components in C# against the Grasshopper SDK.

The first real exercise: **Delaunay triangulation and its dual, the Voronoi diagram**, from scratch. Yes, Grasshopper ships both as native components. That is exactly why they make a good exercise — you can check your output against a reference while learning what the black box actually does.

## Bowyer–Watson in 40 lines

The incremental Bowyer–Watson algorithm reads like a recipe:

1. Start with a super-triangle that contains every point.
2. Insert points one by one. For each point, find all triangles whose circumcircle contains it — the *bad* triangles.
3. The boundary of the bad region forms a polygon; retriangulate it by connecting the new point to each boundary edge.
4. When all points are in, remove every triangle that touches the super-triangle.

```csharp
foreach (Point3d p in points)
{
    var bad = triangles.Where(t => t.CircumcircleContains(p)).ToList();
    var boundary = BoundaryEdges(bad);
    triangles.RemoveAll(bad.Contains);
    triangles.AddRange(boundary.Select(e => new Triangle(e.A, e.B, p)));
}
```

The circumcircle test is one determinant. The boundary extraction is the only part that requires care: an edge is boundary if it belongs to exactly one bad triangle.

Voronoi then costs almost nothing — connect the circumcenters of adjacent triangles and you have your cells. Duality is the closest thing computational geometry has to a magic trick.

## What the SDK teaches you

Wrapping this into a `GH_Component` is mostly boilerplate — `RegisterInputParams`, `RegisterOutputParams`, `SolveInstance` — but the discipline matters: proper input validation, data trees instead of ad-hoc lists, and components that do *one* thing. My suite so far: the Delaunay/Voronoi pair, a reaction-diffusion solver, and a parametric-equations explorer, all on GitHub.

The deeper lesson: **owning the algorithm changes what you can design.** The native Voronoi gives you cells; mine gives me cells plus the triangulation, the adjacency graph, and any weighting rule I care to inject — because I can reach into the middle of the algorithm. That access is the whole point of writing code instead of wiring nodes.
