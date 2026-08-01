---
title: CheckToBuild — BIM quality assurance in the browser
context: CheckToBuild
year: 2024–now
summary: Core developer on a QA/QC and inspection platform that compares as-designed BIM models against laser-scanned reality.
---

Construction quality control still mostly works like this: someone walks the site with a tablet and a printed plan, photographs what looks wrong, and writes a report a week later. CheckToBuild's bet is that if the as-designed model and the as-built scan live in the same browser viewer, deviation stops being an opinion.

## What I do

I'm a core developer on the platform, which in practice means I own most of what happens between a file arriving and geometry appearing on screen:

- **The IFC and fragments pipeline.** Models come in as IFC, get converted once to That Open's Fragments format, and load instantly afterwards. The conversion, the storage of both artifacts, and the loading strategy are the part of the product users never see and always feel.
- **Deviation checks.** Point clouds from laser scans and E57 imagery are registered against the design model, and differences get surfaced element by element rather than as one giant heatmap nobody acts on.
- **Viewer performance.** React Three Fiber and WebGL work on large federated IFCs and octree point clouds: instancing, culling, and the discipline of never letting a file's size dictate the frame rate.
- **The desktop bridge.** Civil 3D and .NET automations (feature lines, extensions, grading utilities) talk to the React frontend through a WebView2 bridge, so desktop CAD and the web platform stop being separate worlds.
- **Data exchange.** Ingestion and validation for IFC, E57, CSV and JSON, with real-time overlays for site investigations.

## Three decisions that mattered

**Convert once, load forever.** The IFC-to-Fragments conversion is expensive, so it runs at upload time, off the UI thread, and both files are kept. Users pay the parsing cost exactly once per model. I wrote more about this pattern in [the That Open post](/writing/thatopen-fragments-web-bim).

**Deviation as data, not decoration.** A colored point cloud is easy; a per-element verdict you can filter, assign and close out is what an inspection workflow actually needs. The geometry work only matters because it feeds that list.

**Meet the desktop where it is.** Civil engineers were not going to abandon Civil 3D, so the platform went to them: .NET automations inside the tools they already use, bridged to the same web data model everyone else sees.

The stack, compressed: React, TypeScript, three.js / React Three Fiber, web-ifc and That Open Fragments, Potree-style octree point clouds, .NET and the Civil 3D API, WebView2.
