---
title: Writing Grasshopper components in C#: Delaunay and Voronoi from scratch
date: 2019-02-20
tags: Grasshopper, C#, Rhino, Geometry
summary: The moment the canvas became the problem, I opened Visual Studio. First real exercise: Bowyer–Watson triangulation as a proper Grasshopper component.
---

There's a moment in every Grasshopper user's life when the canvas becomes the problem. Mine came with a definition that had grown to a few hundred components, half of them doing what five lines of code could say better. Scrolling through that spaghetti one evening, I gave up and opened Visual Studio.

First real exercise: **Delaunay triangulation and its dual, the Voronoi diagram**, from scratch. Grasshopper ships both natively, which is exactly why they make a good exercise. You can check your output against a reference while you learn what the black box actually does. The code ended up in my [DelaunayVoronoi repo](https://github.com/christiandimitri/DelaunayVoronoi), next to [ReactionDiffusion](https://github.com/christiandimitri/ReactionDiffusion) and [ParametricEquations](https://github.com/christiandimitri/ParametricEquations).

## Bowyer–Watson in 40 lines

The [incremental Bowyer–Watson algorithm](https://en.wikipedia.org/wiki/Bowyer%E2%80%93Watson_algorithm) reads like a recipe:

1. Start with a super-triangle that contains every point.
2. Insert points one by one. For each point, find the triangles whose circumcircle contains it. Those are the bad triangles.
3. The boundary of the bad region forms a polygon. Retriangulate it by connecting the new point to each boundary edge.
4. When all points are in, remove every triangle touching the super-triangle.

```csharp
foreach (Point3d p in points)
{
    var bad = triangles.Where(t => t.CircumcircleContains(p)).ToList();
    var boundary = BoundaryEdges(bad);
    triangles.RemoveAll(bad.Contains);
    triangles.AddRange(boundary.Select(e => new Triangle(e.A, e.B, p)));
}
```

The circumcircle test is one determinant. The only part that needs real care is the boundary extraction: an edge is boundary if it belongs to exactly one bad triangle. I got that wrong twice before it clicked.

Voronoi then costs almost nothing. Connect the circumcenters of adjacent triangles and you have your cells. Duality is the closest thing computational geometry has to a magic trick.

## What the SDK teaches you

Wrapping this into a `GH_Component` is mostly boilerplate (`RegisterInputParams`, `RegisterOutputParams`, `SolveInstance`), but the discipline matters: validate inputs, use data trees properly, make components that do one thing.

The deeper lesson took longer to see. Owning the algorithm changes what you can design. The native Voronoi component gives you cells. Mine gives me cells plus the triangulation, the adjacency graph, and any weighting rule I care to inject, because I can reach into the middle of the algorithm. That access is the whole point of writing code instead of wiring nodes.
