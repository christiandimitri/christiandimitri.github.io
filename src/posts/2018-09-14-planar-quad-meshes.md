---
title: Flat panels from curved dreams: rationalizing freeform surfaces
date: 2018-09-14
tags: Grasshopper, C#, Geometry, Research
summary: My master's thesis at UPC Barcelona, and why planar quad meshes are the difference between a render and a building.
---

Every architecture student draws a doubly-curved surface at some point and calls it a roof. I did it in Beirut, more than once. Almost none of those roofs get built, and the reason is boring: glass and metal panels are flat, double curvature is not, and someone has to pay the difference.

I just finished my thesis for the Master in Parametric Design in Architecture (MPDA) at UPC Barcelona on exactly that gap. The word for it is **rationalization**: taking a freeform surface and turning it into a mesh of panels a fabricator can cut and a contractor can price without laughing at you. The thesis material is [on GitHub](https://github.com/christiandimitri/MPDA18_MastersThesis) if you want the long version.

![Planar quad mesh study](/img/pq-meshes-dark.jpg)

## Why quads, and why planar

Triangles are always flat, so why not triangulate everything? Three reasons I kept running into:

- **Nodes.** A triangular mesh puts six edges into a typical node. A quad mesh puts four. Fewer members per node means simpler, cheaper connections.
- **Steel.** For the same surface, quad layouts use noticeably less edge length. Less material, less welding.
- **Glass.** Rectangular-ish panels waste far less when cut from stock sheets.

The catch is that a quad with four arbitrary corners is generally not flat. Planarity becomes a constraint you optimize for, and that drags you into conjugate curve networks: families of curves on the surface whose intersections make planarization possible. Follow the principal curvature directions and the panels want to be flat. Ignore them and no solver will save you. I learned that second part the hard way, on a surface I was sure was "close enough".

## The solver

I wrote the planarization loop in C# inside Grasshopper. For each quad, project its corners onto their best-fit plane, average the corrections per vertex, repeat. It's dumb and iterative and it works: planarity deviations collapse by orders of magnitude in a few hundred iterations, while a soft constraint keeps the mesh near the reference surface.

```csharp
// one planarization step, per face
Plane fit = FitPlane(f.A, f.B, f.C, f.D);
foreach (var v in f.Vertices)
    corrections[v] += fit.ClosestPoint(v) - v;
// then: vertex += corrections[vertex] / valence
```

## Building one for real

The same master's had us design, engineer and actually build an actively-bent gridshell, a spherical Chebyshev net we assembled flat and bent into shape, then covered with a stretchable membrane. Standing under a structure whose geometry you scripted cures you of treating geometry as an aesthetic exercise. Quickly.

![Gridshell built at the MPDA](/img/gridshell-1.jpg)

*Gridshell photography © Andrés Flajszer.*

Rationalization is where architecture stops being about what a surface looks like and starts being about what it costs. I think this niche, geometry negotiating with fabrication, is where I want to keep working.
