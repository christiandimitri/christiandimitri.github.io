---
title: Parametric configurators for real products: Vue + ShapeDiver
date: 2021-06-17
tags: Grasshopper, Vue, ShapeDiver, Web
summary: Putting a Grasshopper definition behind a web UI at a steel fabricator. What I learned turning definitions into products, and the ShapeDiver vs Rhino.Compute call.
---

A Grasshopper definition on my machine is a tool. The same definition behind a web page is a product. At Estructuras Arqué, where I do parametric work for steel structures, that difference is very concrete: a salesperson can quote a canopy variant in front of a client without anyone opening Rhino. The configurator we built, [Arqué Spatial Frames](https://parametric-ui.netlify.app/), is live if you want to click around.

![Curved roof structure in Marbella](/img/arque-marbella.jpg)

## The architecture

What works for me is a **Vue** frontend talking to a hosted Grasshopper solver. The definition stays the single source of truth for geometry; the web app owns UX, validation and pricing.

Two realistic options for the solver tier:

- **[ShapeDiver](https://shapediver.com/)**: upload the definition, get a hosted API plus a WebGL viewer. Zero infrastructure, per-computation limits, and you accept their sandboxing. Fair enough, they run arbitrary GH files from strangers.
- **[Rhino.Compute](https://developer.rhino3d.com/guides/compute/)**: run Rhino headless on your own VM, call it over HTTP. Total freedom, any plugin you want, but you own licensing, scaling, security, and keeping a Windows box alive.

For client-facing configurators I keep choosing ShapeDiver. Infrastructure is exactly the thing a small team should not babysit. Rhino.Compute wins the moment your definition depends on plugins the sandbox forbids.

## What the definition has to become

The uncomfortable discovery: a definition written for design is rarely fit to be an API. Turning one into a configurator meant:

- **Hard input domains.** Every slider needs true min/max/step. Users will find whatever combination explodes. Ours found it on day two.
- **Failure as output.** The definition should emit "invalid configuration, here's why" as data. A red component on a canvas nobody sees helps nobody.
- **Outputs beyond geometry.** Bills of materials, weights, prices. The numbers are half the product's value.

```js
// Vue side: parameters in, geometry + data out
await session.customize({
  [params.span.id]: form.span,
  [params.moduleCount.id]: form.modules,
});
const bom = JSON.parse(session.getOutputByName("BOM").content[0].data);
```

![Padel court canopy](/img/arque-padel.jpg)

The interesting engineering was never the geometry. It was the contract: what the model promises the interface, and what the interface protects the user from. That's API design, applied to buildings. Grasshopper turns out to be a decent backend language as long as you treat the canvas like a service: versioned, validated, and tested with inputs you didn't choose yourself.
