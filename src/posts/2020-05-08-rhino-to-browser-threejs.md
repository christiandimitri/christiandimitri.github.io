---
title: From Rhino to the browser: first steps with three.js
date: 2020-05-08
tags: three.js, JavaScript, Web
summary: Getting architectural models out of Rhino and into a WebGL canvas. The OBJ-to-glTF pipeline hurt, and I think the browser is where geometry tools are heading anyway.
---

For two years my work has lived inside Rhino. This spring, stuck at home like everyone else, I finally asked the obvious question: why does showing someone a 3D model still require them to install anything? The browser has a GPU API. The browser is everywhere. So I've been teaching myself **three.js** and feeding it my models.

## The pipeline problem

Getting a model out of CAD is easy. OBJ export has existed forever. Getting it out *well* is another story. My steel-structure models came out of Rhino as OBJ files of 20 to 35 MB each: plain text, redundant vertices, no compression, materials not worth keeping. Loading one over a normal connection took longer than the whole rest of the page.

The answer the web settled on is **glTF**, a binary GPU-ready format that three.js loads natively. My pipeline now:

1. Export OBJ from Rhino, geometry only, meshes joined.
2. Convert to glTF/GLB. I built a small in-browser converter with three.js's `OBJLoader` and [`GLTFExporter`](https://threejs.org/docs/#examples/en/exporters/GLTFExporter), so the round trip happens client-side.
3. Load with `GLTFLoader`, frame the camera to the bounding box, done.

The same 35 MB OBJ lands around 4 MB as a GLB, before any mesh compression. There's a Draco encoder waiting when I need it.

```js
const loader = new GLTFLoader();
loader.load("/models/aldesa.glb", ({ scene: model }) => {
  scene.add(model);
  const box = new THREE.Box3().setFromObject(model);
  controls.target.copy(box.getCenter(new THREE.Vector3()));
  camera.position.copy(box.max).multiplyScalar(1.8);
});
```

One of the five models in my test gallery, a steel building structure we detailed at the office:

![Edificio Aldesa steel structure](/img/arque-aldesa.jpg)

## What surprised me

Coming from CAD, three.js is refreshingly honest about what a mesh is: buffers of floats, an index, a material. No modelling kernel pretending otherwise. `OrbitControls`, a directional light and a `MeshStandardMaterial` get you a presentable viewer in fifty lines.

What it lacks, and what CAD people notice immediately, is everything around the mesh. Object identity, layers, metadata, units. An OBJ file remembers nothing about which beam was which. Fine for showing a roof to a client. Useless for real AEC tooling, where you need the model's data and not just its skin. The IFC-on-the-web work that's starting to appear looks like the answer to that, and I'm keeping an eye on it.

For now I put five of our built steel projects into an interactive gallery on this site, thumbnails on one side, live model in the canvas. It's a toy. But it runs on a phone, with no installation, from a static host, and that combination is going to matter.
