---
title: From Rhino to the browser: first steps with three.js
date: 2020-05-08
tags: three.js, JavaScript, Web
summary: Getting architectural models out of Rhino and into a WebGL canvas — the OBJ-to-glTF pipeline, and why I think the browser is where geometry tools are heading.
---

For two years my work has lived inside Rhino. This spring I finally asked the obvious question: why does showing someone a 3D model still require them to install anything? The browser has a GPU API. The browser is everywhere. So I have been teaching myself **three.js** and wiring my models into it.

## The pipeline problem

Getting a model *out* of CAD is easy — OBJ export has existed forever. Getting it out **well** is another story. My steel-structure models came out of Rhino as OBJ files of 20–35 MB each: plain text, redundant vertices, no compression, no materials worth keeping. Loading one over a normal connection took longer than the entire page.

The answer the web has settled on is **glTF** — a binary, GPU-ready format that three.js loads natively. My current pipeline:

1. Export OBJ from Rhino (geometry only, joined meshes).
2. Convert to glTF/GLB — I even built a small in-browser converter with three.js's `OBJLoader` + `GLTFExporter`, so the whole round trip happens client-side.
3. Load with `GLTFLoader`, frame the camera to the bounding box, done.

The same 35 MB OBJ lands around 4 MB as a binary GLB before any mesh compression — and there is a Draco encoder waiting when I need it.

```js
const loader = new GLTFLoader();
loader.load("/models/aldesa.glb", ({ scene: model }) => {
  scene.add(model);
  const box = new THREE.Box3().setFromObject(model);
  controls.target.copy(box.getCenter(new THREE.Vector3()));
  camera.position.copy(box.max).multiplyScalar(1.8);
});
```

## What surprised me

Coming from CAD, three.js feels refreshingly honest about what a mesh is: buffers of floats, an index, a material. There is no modelling kernel pretending otherwise. `OrbitControls` plus a directional light plus a `MeshStandardMaterial` gets you a presentable viewer in fifty lines.

What it lacks — and what CAD people notice immediately — is everything *around* the mesh: object identity, layers, metadata, units. An OBJ file remembers nothing about which beam was which. For showing a roof to a client, fine. For real AEC tooling you need the model's *data*, not just its skin — which is why the IFC-on-the-web work starting to appear looks so interesting.

I put five of our built steel projects into an interactive gallery on this site — thumbnails on the left, live model in the canvas. It is a toy. But it is a toy that runs on a phone, with no installation, from a static host. That combination is going to matter.
