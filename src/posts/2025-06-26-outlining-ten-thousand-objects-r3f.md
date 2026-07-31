---
title: Outlining ten thousand objects in React Three Fiber
date: 2025-06-26
tags: R3F, three.js, GLSL, Open Source
summary: Selection outlines look trivial until the selection is half a BIM model. The rendering trade-offs behind my r3f-peridot library.
---

Selection outlines are one of those features nobody specifies and everybody expects. Click a wall, the wall glows. In a scene with fifty meshes any approach works. In a BIM model where "the third floor" means ten thousand instanced elements, most approaches die instantly. I wrote [r3f-peridot](https://github.com/christiandimitri/r3f-peridot), an outline post-processing library for React Three Fiber, three.js and That Open fragments, because I kept solving this at work and wanted a version I owned. There's a [live demo](https://christiandimitri.github.io/r3f-peridot/) with glTF and fragments examples.

![r3f-peridot outline demo](/img/r3f-peridot.jpg)

## Three ways to draw an outline

- **Scale-and-repaint.** Redraw the object slightly bigger behind itself. Free for one convex prop, garbage for concave geometry, and per-object cost for thousands.
- **Stencil passes.** Mask the selection into the stencil buffer, redraw expanded. Crisp, but multiplies draw calls by selection size, which is the exact thing instancing exists to avoid.
- **Post-processing edge detection.** Render selected objects into an offscreen mask, run an edge filter over that texture, composite. Cost scales with pixels, not objects.

For BIM-scale selections only the third survives. Omar Shehata's [outline post-processing write-up](https://omar-shehata.medium.com/how-to-render-outlines-in-webgl-8253c14724f9) was my starting point here, and his open code is vendored gratefully in my experiments. The interesting engineering after that is keeping the mask pass cheap.

## The mask is the whole game

Re-rendering ten thousand selected meshes into the mask buffer would just move the bottleneck. The trick with instanced rendering is that you don't re-render anything. You re-*color*. Selection state lives in a per-instance attribute, and the mask pass renders the same instanced draw calls with an override material that reads the flag and writes white or discards:

```glsl
// mask fragment: selection flag arrives from a per-instance attribute
varying float vSelected;
void main() {
  if (vSelected < 0.5) discard;
  gl_FragColor = vec4(1.0);
}
```

Toggling selection becomes a buffer update of a few bytes per element. No scene-graph surgery, no material swapping, no draw-call growth. A separable blur dilates the mask, and the composite draws mask-minus-original as the outline ring. Two fullscreen passes, fixed cost, whether one door or a whole storey is selected.

## The R3F part

Wrapping this for React Three Fiber is mostly about not fighting the reconciler. The library exposes an `<Outline>` effect and a selection API, while buffer writes happen imperatively under the hood. React declares intent, the render loop does surgery. Every serious R3F library I've read converges on this pattern.

The name, since people ask: peridot is a green gemstone. It started as "the green glow library" and the name stuck.

Next: outline styles per selection group, error-red and highlight-green in one pass. It's a small mask-channel trick that falls out of the architecture almost free.
