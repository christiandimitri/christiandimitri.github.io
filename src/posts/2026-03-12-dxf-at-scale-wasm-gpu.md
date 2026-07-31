---
title: Parsing DXF at scale: C++, WASM, and a GPU highlight pipeline
date: 2026-03-12
tags: C++, WASM, three.js, DXF, Performance
summary: What it takes to open, render and edit hundred-megabyte DXF floor plans in a browser tab — entity ID textures, viewport streaming, and a C++ core behind embind.
---

DXF is a forty-year-old text format that construction still runs on. Floor-plan files in the wild reach hundreds of megabytes — nested block references, hatches with thousands of loops, polylines by the million. For a construction-robotics platform I work on, those files must open **in a browser**, render at 60 fps, and stay editable. Some notes on what that actually takes, format-agnostic enough to be useful beyond DXF.

## Parse where the memory is: C++ → WASM

JavaScript DXF parsers exist and are fine — until the file is 300 MB of text producing millions of entities, at which point GC pressure and per-entity object overhead eat the tab. Our core moved to **C++ compiled to WebAssembly** (embind bindings): the parser produces packed typed arrays — positions, entity IDs, style indices — that cross the WASM boundary once, as views, not object graphs.

The interface discipline is the whole design: **no per-entity objects cross the boundary, ever.** The C++ side owns entity semantics; the JS side sees flat buffers ready for `BufferGeometry`. One entity, one ID; one ID, one row in a lookup texture.

## Highlighting a million entities without re-uploading anything

Hover and selection in CAD means *this* entity changes color, *now*. Rebuilding vertex colors for a million-vertex batch on every mouse move is not a plan. The pipeline that works:

- Every vertex carries its **entity ID** as an attribute.
- A small **data texture** maps entity ID → state (hovered, selected, hidden, custom color).
- The shader looks up its state per fragment; changing a highlight is a one-texel `texSubImage2D` update.

```glsl
vec4 state = texelFetch(uEntityLUT, ivec2(vEntityId & 4095, vEntityId >> 12), 0);
if (state.a < 0.5) discard;            // hidden
color = mix(color, state.rgb, state.r > 0.0 ? 0.85 : 0.0);
```

Hover response stops depending on scene size at all. Delete and move become LUT writes too — visibility off, or a transform applied at draw time — so *editing feels instant while the real geometry rebuild happens lazily* off the hot path.

## Streaming the viewport

Even perfectly batched, a full-city DXF exceeds GPU memory. The last piece is treating the drawing like a map: tile the model space, prioritize tiles by viewport intersection, load and evict by distance. Zoomed out you draw cheap aggregate geometry; zoomed in, the tiles under the camera carry full detail. CAD users get map-application smoothness on files their desktop software refuses to open.

None of these techniques is novel alone — game engines have done all three for decades. The novelty is the sum crossing into AEC tooling through a browser tab: the heaviest desktop-only file format in construction, made portable. The gap between "CAD software" and "web app" is now purely an engineering decision, not a platform limitation.
