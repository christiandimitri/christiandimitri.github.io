---
title: Outlining ten thousand objects in React Three Fiber
date: 2025-06-26
tags: R3F, three.js, GLSL, Open Source
summary: Selection outlines look trivial until the selection is half a BIM model — the rendering trade-offs behind my r3f-peridot library.
---

Selection outlines are one of those features nobody specifies and everybody expects. Click a wall, the wall glows. In a scene with fifty meshes any approach works. In a BIM model where "the third floor" means *ten thousand instanced elements*, most approaches die instantly. That problem is why I wrote **r3f-peridot**, an outline post-processing library for React Three Fiber, three.js and That Open fragments.

## Three ways to draw an outline

- **Scale-and-repaint** — redraw the object slightly bigger behind itself. Free for one convex prop; garbage for concave geometry, and per-object cost for thousands.
- **Stencil passes** — mask the selection into the stencil buffer, redraw expanded. Crisp, but multiplies draw calls by selection size — the exact thing instancing exists to avoid.
- **Post-processing edge detection** — render selected objects into an offscreen mask target, run an edge filter over that texture, composite. Cost scales with *pixels*, not objects.

For BIM-scale selections only the third survives. The interesting engineering is keeping the mask pass cheap:

## The mask is the whole game

Re-rendering ten thousand selected meshes into the mask buffer would just move the bottleneck. The trick is that with instanced rendering you don't re-render *anything* — you re-*color*. Selection state lives in a per-instance attribute; the mask pass renders the same instanced draw calls with an override material that reads the flag and writes white or discards:

```glsl
// mask fragment: selection flag arrives from a per-instance attribute
varying float vSelected;
void main() {
  if (vSelected < 0.5) discard;
  gl_FragColor = vec4(1.0);
}
```

Toggling selection becomes a buffer update of a few bytes per element — no scene graph surgery, no material swapping, no draw-call growth. Then a separable blur pass dilates the mask, and the composite draws `mask − original` as the outline ring. Two fullscreen passes, fixed cost, whether one door or a whole storey is selected.

## The R3F part

Wrapping this for React Three Fiber is mostly about *not* fighting the reconciler: the library exposes an `<Outline>` effect and a selection API, while buffer writes happen imperatively under the hood — React declares intent, the render loop does surgery. The same pattern every serious R3F library converges on.

There is a live demo on GitHub Pages with glTF and fragments examples. The name, since people ask: peridot is a green gemstone — it started as "the green glow library" and the name stuck.

Next up: outline styles per selection group (error-red vs highlight-green in one pass) — a small mask-channel trick that falls out of the architecture almost free.
