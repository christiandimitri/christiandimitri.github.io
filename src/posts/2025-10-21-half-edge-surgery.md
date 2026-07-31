---
title: Half-edge surgery: the topology toolkit behind auto-grading
date: 2025-10-21
tags: Geometry, Python, Civil 3D, Meshes
summary: Edge flips, splits, collapses and the rest of the operations I lean on when tracing grading lines through messy TIN surfaces. With diagrams, because I drew them anyway.
---

For the auto-grading work I do on Civil 3D designs, the input is a TIN surface: a triangulated terrain, sometimes beautiful, usually not. Tracing grading lines through one robustly means editing mesh topology on the fly, and for that you want a **half-edge structure** and a small set of surgical operations. I drew diagrams of the toolkit for my own notes, so I might as well publish them.

## The structure

A half-edge mesh stores each edge as two directed twins, each knowing its face, its next half-edge, and its origin vertex. It sounds like bureaucracy until you try to answer "which faces touch this vertex?" on a plain triangle list and find yourself scanning the whole mesh. With half-edges, every adjacency question is a few pointer hops.

![Half-edge legend](/img/topology/legend.png)

## The operations

**Edge flip.** Two triangles share an edge; rotate it to connect the opposite corners instead. This is the workhorse of Delaunay refinement: flip until every edge passes the circumcircle test, and triangle quality improves without moving a single vertex.

![Edge flip](/img/topology/edge_flip.png)

**Edge split.** Insert a vertex on an edge, splitting both adjacent faces. This is how a grading line enters a mesh that doesn't have vertices where you need them: split, then walk.

![Edge split](/img/topology/edge_split.png)

**Edge collapse.** Merge an edge's two vertices into one, deleting the degenerate faces. Simplification, but also cleanup: survey data loves giving you slivers thinner than the tolerance of anything downstream.

![Edge collapse](/img/topology/edge_collapse.png)

**Face split.** Drop a vertex into a triangle's interior, making three. The other entry move, for when your target point isn't near any edge.

![Face split](/img/topology/face_split.png)

**Hole fill and vertex split.** Fill closes a boundary loop with new faces; vertex split is collapse's inverse, pulling one vertex apart into two. Fill shows up around surface voids, split when a ridge line needs to become two distinct banks.

![Hole fill](/img/topology/hole_fill.png)

**Plane cut.** Slice the mesh with a plane, splitting every crossing edge and stitching the section. Grading is full of these: daylight lines, bench cuts, pad boundaries.

![Plane cut](/img/topology/plane_cut.png)

## Why this matters for grading

A grading line tracer walks across the surface asking, at every step, "which triangle am I in, and where do I exit?" On clean topology that's trivial. On real data the walk hits slivers, T-junctions, and coincident vertices, and it needs the surgery kit to normalize as it goes. On top of the walk sits **continuity voting**: at each junction, candidate continuations get scored (angle deviation, slope consistency) with dynamic angle tolerances, and the winner extends the trace. The votes are only trustworthy if the topology underneath is sound, which is really the whole point of this post.

None of this is new mathematics. It's the difference between geometry that works in a paper and geometry that works on a Tuesday, on a client file, with a deadline. The diagrams are mine; steal them if they help.
