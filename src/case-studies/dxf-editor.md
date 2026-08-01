---
title: A web DXF editor for files that break desktop CAD
context: construction robotics
year: 2024–2026
summary: Browser CAD editing at the scale construction robotics needs — C++ core in WASM, GPU highlighting, viewport streaming.
---

For a construction-robotics platform, floor plans are not documentation, they're input: machines work from them. The files arrive as DXF, they are routinely hundreds of megabytes, and the people who need to view and correct them should not need a CAD seat and a workstation. So the editor lives in the browser, and my job was making that not be a contradiction.

## The shape of the problem

A big DXF is millions of entities: nested block references, hatches with thousands of loops, polylines that digitize entire buildings. A browser tab gives you one JavaScript thread, a GC that hates object-per-entity designs, and a GPU that only helps if you feed it correctly. Every design decision follows from those constraints.

## What I built

- **A C++ parsing core compiled to WebAssembly.** The parser emits packed typed arrays — positions, entity IDs, style indices — that cross the WASM boundary once, as views. No per-entity objects, ever. The C++ side owns semantics; the JS side sees buffers ready for the GPU.
- **GPU per-entity highlighting.** Every vertex carries its entity ID; a small data texture maps ID to state (hovered, selected, hidden, recolored). Highlighting an entity is a one-texel update instead of a geometry rebuild, so hover response is independent of file size.
- **Instant editing.** Delete, move and rotate are applied as visibility and transform state first, so the interaction feels immediate while the real geometry rebuild happens lazily off the hot path.
- **Viewport streaming.** The drawing is tiled like a map: tiles load and evict by camera distance, aggregate geometry stands in when zoomed out. Files that kill desktop CAD scroll like a map application.

The full technical story — LUT shaders, embind interface discipline, streaming strategy — is in [Parsing DXF at scale](/writing/dxf-at-scale-wasm-gpu).

## The decision that mattered most

Treating the WASM boundary as a hard API contract. Everything that went wrong early came from letting entity objects leak across it; everything that got fast came from refusing to. It's the same lesson BIM taught me about formats, applied one level down: own the data layout and the rest becomes engineering.

Stack: C++ / Emscripten (embind), three.js, TypeScript, custom DXF parser and writer, GLSL.
