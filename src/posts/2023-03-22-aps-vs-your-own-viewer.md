---
title: Autodesk Platform Services vs rolling your own viewer
date: 2023-03-22
tags: APS, three.js, IFC, BIM, Web
summary: The Forge/APS viewer gives you everything on day one and owns you by day ninety — a decision framework from building on both sides.
---

Every AEC software team eventually faces the same fork: build your 3D viewer on **Autodesk Platform Services** (the artist formerly known as Forge), or roll your own on three.js and open formats. I have now shipped work on both sides of that fork, and the trade-off is sharper than most comparisons admit.

## What APS actually gives you

More than a viewer, and it is worth being honest about the list: server-side translation from ~60 CAD formats, streaming of huge models with level-of-detail, a property database exposed through the viewer API, 2D sheets extracted from the same files, markup and measurement tools, and a viewer battle-tested by most of the industry.

```js
Autodesk.Viewing.Initializer(options, () => {
  const viewer = new Autodesk.Viewing.GuiViewer3D(container);
  viewer.start();
  Autodesk.Viewing.Document.load(`urn:${urn}`, (doc) =>
    viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()),
  );
});
```

Ten lines and a Revit model streams into your page. That is a genuinely great developer experience, and for a team without 3D expertise it may be the only realistic path.

## Where the bill arrives

Three places, none of them on the pricing page:

- **The token meter.** Model translation costs per job; viewing requires your files in their derivative format. Costs scale with exactly the thing you want to grow — usage.
- **The architecture constraint.** Files route through Autodesk's cloud for translation. If your product promises on-prem, EU-only data residency, or offline, that promise is now Autodesk's promise too.
- **The rendering ceiling.** The viewer is not three.js — custom shaders, custom post-processing, exotic instancing tricks: you get what the API exposes.

## The other side

Rolling your own means owning loaders (web-ifc for IFC, custom parsers where needed), spatial indexing, LOD, picking, sectioning — months of geometry plumbing that APS gives you free. The break-even question is not "can we build a viewer?" — three.js makes yes cheap. It is **"can we afford to keep owning it?"**

My framework, compressed:

| Situation | Choice |
|---|---|
| Prototype, mixed formats, small team | APS, without hesitation |
| Product whose *core* is the 3D experience | Own viewer — the ceiling will hurt |
| Data residency / on-prem requirements | Own viewer, open formats |
| Revit-centric workflow, need sheets + properties | APS |

The trend I am betting on: open web BIM — web-ifc and the ecosystem forming around it — is climbing the capability curve fast. Every year, "roll your own" starts one rung higher.
