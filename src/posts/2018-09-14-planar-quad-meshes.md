---
title: Flat panels from curved dreams: rationalizing freeform surfaces
date: 2018-09-14
tags: Grasshopper, C#, Geometry, Research
summary: Why planar quad meshes are the difference between a render and a building — notes from my master's thesis at UPC Barcelona.
---

Every architecture student draws a doubly-curved surface at some point and calls it a roof. Almost none of those roofs get built. The reason is painfully practical: glass and metal panels are flat, and double curvature is not.

This year I finished my thesis for the Master in Parametric Design in Architecture (MPDA) at UPC Barcelona, on exactly that gap: **rationalization** — taking a freeform surface and turning it into a mesh of panels that a fabricator can actually cut, and a contractor can actually pay for.

![Planar quad mesh study](/img/pq-meshes-dark.jpg)

## Why quads, and why planar

Triangles are always flat, so why not triangulate everything? Three reasons:

- **Nodes.** A triangular mesh puts six edges into a typical node; a quad mesh puts four. Fewer members per node means simpler, cheaper connections.
- **Steel.** For the same surface, quad layouts use noticeably less edge length — less material, less welding.
- **Glass.** Rectangular-ish panels waste far less material when cut from stock sheets.

The catch: a quad with four arbitrary corners is generally *not* flat. Planarity becomes a constraint you must optimize for, and that pulls you into the geometry of **conjugate curve networks** — families of curves on the surface whose intersections make planarization possible. Follow the principal curvature directions and the panels want to be flat; ignore them and no solver will save you.

## The solver

I implemented the planarization loop in C# inside Grasshopper: for each quad, project its four corners onto their best-fit plane, then average the corrections per vertex, then repeat. It is dumb, it is iterative, and it works — planarity deviations collapse by orders of magnitude in a few hundred iterations while a soft constraint keeps the mesh close to the reference surface.

```csharp
// one planarization step, per face
Plane fit = FitPlane(f.A, f.B, f.C, f.D);
foreach (var v in f.Vertices)
    corrections[v] += fit.ClosestPoint(v) - v;
// then: vertex += corrections[vertex] / valence
```

## Building one for real

The same master's programme had us design, engineer and *build* an actively-bent gridshell — a spherical Chebyshev net that we assembled flat and bent into shape, covered with a stretchable membrane. Standing under something whose geometry you scripted is a very effective cure for treating geometry as an aesthetic exercise.

![Gridshell built at the MPDA](/img/gridshell-1.jpg)

*Gridshell photography © Andrés Flajszer.*

Rationalization is where architecture stops being about what a surface looks like and starts being about what it costs. I suspect this niche — geometry that negotiates with fabrication — is where I want to keep working.
