---
title: Civil Autograder — teaching a machine to read grading plans
context: Monstarlab
year: 2025–now
summary: Outside consultant on an ML system that auto-grades Civil 3D land-development designs. I own the geometry.
---

Grading design review is slow, expert work: someone senior opens a Civil 3D drawing and checks whether the lots drain, the slopes hold, and the earthwork balances. Monstarlab brought me in as an outside consultant on an ML system that does the first pass automatically — and my part is everything geometric between a DWG and a training set.

## What I own

- **Extraction.** Alignments, feature lines, parcels and TIN surfaces out of Civil 3D, through its .NET API, into clean serializable structures. Civil 3D's object model was designed for drafting, not for data science; the translation layer is real work.
- **Data preparation.** Turning extracted geometry into training data the ML side can actually learn from: normalized, validated, labeled, and honest about its edge cases. Garbage tolerance here is zero, because the model will happily learn the garbage.
- **The topology toolkit.** Grading-line tracing across TIN surfaces needs robust mesh surgery — edge splits, collapses, continuity voting across junctions. I wrote up the whole kit, with diagrams, in [Half-edge surgery](/writing/half-edge-surgery).
- **Parsing across the infrastructure.** The pipeline spans C# plugins for Civil 3D 2023 through 2027, a Python geometry service, and a React + React Three Fiber frontend for visual review.

## Three decisions that mattered

**Geometry and learning stay separated.** The ML system never touches raw CAD; it sees prepared, validated features. When a prediction looks wrong, we can tell in minutes whether the geometry pipeline or the model is to blame — because there's a clean seam between them.

**Half-edge or bust.** Early tracing attempts on plain triangle lists kept dying on real-world surfaces (slivers, T-junctions, coincident vertices). Moving to a half-edge structure with a small set of surgical operations made the tracer boring, which is the goal.

**Validate against the humans.** The system's outputs are checked against expert-reviewed projects; internal validation currently sits around 99% across project scenarios. That number is the product — nobody adopts an auto-grader they have to double-check.

Stack: C# / Civil 3D API (2023–2027), Python (Shapely, NetworkX, Numba), FastAPI, React, React Three Fiber.
