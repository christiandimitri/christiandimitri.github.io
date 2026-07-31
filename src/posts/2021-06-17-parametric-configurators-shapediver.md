---
title: Parametric configurators for real products: Vue + ShapeDiver
date: 2021-06-17
tags: Grasshopper, Vue, ShapeDiver, Web
summary: Putting a Grasshopper definition behind a web UI — lessons from building configurators for modular steel structures, and the ShapeDiver vs Rhino.Compute trade-off.
---

A Grasshopper definition on my machine is a tool. The same definition behind a web page is a *product* — a salesperson can quote a canopy variant in front of a client without ever opening Rhino. Over the last year I have been building exactly that: web configurators where the sliders users drag are the parameters of a live Grasshopper model.

## The architecture

The setup that works for me is a **Vue** frontend talking to a hosted Grasshopper solver. The definition stays the single source of truth for the geometry; the web app owns the UX, validation and pricing.

Two realistic options for the solver tier:

- **ShapeDiver** — upload the definition, get a hosted API plus a WebGL viewer. Zero infrastructure, per-computation limits, and you accept their sandboxing (fair: they run arbitrary GH files).
- **Rhino.Compute** — run Rhino headless on your own VM, call `Grasshopper/Evaluate` over HTTP. Total freedom (any plugin!), but you own licensing, scaling, security, and keeping a Windows box alive.

For client-facing configurators I keep choosing ShapeDiver: infrastructure is exactly the thing a small team should not babysit. Rhino.Compute wins the moment your definition depends on plugins the sandbox forbids.

## What the definition must become

The uncomfortable discovery: a definition written for *design* is rarely fit to be an *API*. Turning one into a configurator means:

- **Hard input domains.** Every slider needs true min/max/step — the user will find whatever combination explodes.
- **Failure as output.** The definition should emit "invalid configuration, here's why" as data, never a red component.
- **Outputs beyond geometry.** Bills of materials, weights, prices — the numbers are half the product's value.

```js
// Vue side: parameters in, geometry + data out
await session.customize({
  [params.span.id]: form.span,
  [params.moduleCount.id]: form.modules,
});
const bom = JSON.parse(session.getOutputByName("BOM").content[0].data);
```

## The lesson

The interesting engineering was never the geometry — it was the **contract**: what does the model promise the interface, and what does the interface protect the user from? That is API design, applied to buildings.

Grasshopper turns out to be a decent backend language, as long as you treat the canvas with the same discipline you would give any service: versioned, validated, and tested with inputs you did not choose yourself.
