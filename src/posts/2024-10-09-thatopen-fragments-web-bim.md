---
title: That Open Engine and Fragments: web BIM grows up
date: 2024-10-09
tags: IFC, three.js, That Open, BIM, Web
summary: From IFC.js to @thatopen/components — how the Fragments format and aggressive instancing finally made federated models viable in a browser tab.
---

Two years ago, loading IFC in the browser was a party trick: impressive for one small building, hopeless for a real federated project. That has changed, and the change has a name — **That Open Engine**, the successor of IFC.js, with its `@thatopen/components` toolkit and the **Fragments** geometry format.

## The insight: buildings repeat themselves

A building model is thousands of objects but only hundreds of *shapes*. Every door of a type, every standard column, every repeated façade panel is the same geometry with a different transform. Desktop BIM viewers have exploited this forever; early web IFC loaders did not, uploading every duplicated mesh to the GPU as if it were unique.

**Fragments** is that insight, serialized: unique geometries stored once, instances as transform + ID lists, the whole thing in a compact binary that the browser can memory-map into `InstancedMesh` batches almost directly. Draw calls collapse from tens of thousands to hundreds. Models that crashed a tab now orbit at 60 fps on integrated graphics.

The workflow splits cleanly in two:

```ts
// offline / worker: IFC → Fragments (the expensive part, done once)
const serializer = new FRAGS.IfcImporter();
const bytes = await serializer.process({ bytes: ifcBuffer });

// runtime: instant loads from the pre-processed file
const fragments = components.get(OBC.FragmentsManager);
const model = fragments.load(bytes);
world.scene.three.add(model.object);
```

Pre-convert on upload, store both files, and users never pay the parsing cost again — the pattern that finally makes web BIM feel like a product instead of a demo.

## Components, not a framework

The other thing That Open got right is shape: `@thatopen/components` is a bag of composable tools — raycasting, clipping planes, classification trees, culling, measurement — each usable à la carte on top of vanilla three.js. It does not want to own your app. Coming from monolithic viewer SDKs, this is the correct amount of opinion: I keep my renderer, my scene, my state management, and pull in `Clipper` or `Classifier` where needed.

## What still bites

Honesty section. The IFC → Fragments conversion is heavy enough that you must own where it runs (worker or server — never the UI thread). Property data lives in its own store you must wire to your UI. The ecosystem moves fast and refactors hard; pin versions and read changelogs. And truly huge models still demand streaming and culling strategy from *you* — the format gives you a fighting chance, not a free lunch.

But the direction is unmistakable. The browser is becoming a first-class BIM platform, and for the first time the open-source path is the *performant* path, not the compromise.
