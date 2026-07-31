---
title: That Open Engine and Fragments: web BIM grows up
date: 2024-10-09
tags: IFC, three.js, That Open, BIM, Web
summary: From IFC.js to @thatopen/components. How the Fragments format and aggressive instancing finally made federated models viable in a browser tab.
---

Two years ago, loading IFC in the browser was a party trick. Impressive for one small building, hopeless for a real federated project. That has changed, and the change has a name: [That Open Engine](https://github.com/ThatOpen), the successor of IFC.js, with its [`@thatopen/components`](https://github.com/ThatOpen/engine_components) toolkit and the **Fragments** geometry format. I work with this stack daily now, so consider this a field report rather than a review.

## The insight: buildings repeat themselves

A building model is thousands of objects but only hundreds of *shapes*. Every door of a type, every standard column, every repeated façade panel is the same geometry with a different transform. Desktop BIM viewers have exploited this forever. Early web IFC loaders did not, and uploaded every duplicated mesh to the GPU as if it were unique.

**Fragments** is that insight, serialized: unique geometries stored once, instances as transform-plus-ID lists, the whole thing in a compact binary the browser can turn into `InstancedMesh` batches almost directly. Draw calls collapse from tens of thousands to hundreds. Models that used to crash a tab now orbit at 60 fps on integrated graphics. The first time I loaded one of our heavy federated models this way I actually laughed.

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

Pre-convert on upload, store both files, and users never pay the parsing cost again. That pattern is what finally makes web BIM feel like a product instead of a demo.

## Components, not a framework

The other thing That Open got right is shape. `@thatopen/components` is a bag of composable tools: raycasting, clipping planes, classification trees, culling, measurement, each usable à la carte on top of vanilla three.js. It doesn't want to own your app. Coming from monolithic viewer SDKs, this is the correct amount of opinion. I keep my renderer, my scene, my state management, and pull in `Clipper` or `Classifier` where needed.

## What still bites

Honesty section. The IFC-to-Fragments conversion is heavy enough that you must own where it runs, in a worker or on a server, never the UI thread. Property data lives in its own store you have to wire to your UI yourself. The ecosystem moves fast and refactors hard, so pin versions and actually read changelogs; I've been burned. And truly huge models still demand streaming and culling strategy from you. The format gives you a fighting chance, not a free lunch.

But the direction is unmistakable. The browser is becoming a first-class BIM platform, and for the first time the open-source path is the performant path rather than the compromise.
