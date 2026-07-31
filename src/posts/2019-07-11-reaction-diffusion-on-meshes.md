---
title: Growing patterns: reaction-diffusion on meshes
date: 2019-07-11
tags: Grasshopper, C#, Geometry
summary: Gray–Scott reaction-diffusion running on mesh vertices in C# — from screensaver mathematics to façade panelization studies.
---

Reaction-diffusion is the pattern-forming process Alan Turing proposed in 1952 to explain how leopards get spots. Two virtual chemicals spread across a surface and react; from noise, stable spots, stripes and labyrinths emerge. It is also, conveniently, one of the most satisfying things you can run on an architectural surface.

## Gray–Scott in a Grasshopper component

The Gray–Scott model tracks two concentrations, U and V, per sample point:

```
u' = Du·∇²u − u·v² + f·(1 − u)
v' = Dv·∇²v + u·v² − (f + k)·v
```

On a grid, the Laplacian ∇² is a convolution kernel. On a **mesh**, it becomes a weighted sum over each vertex's neighbours — which is exactly why I wanted it in C# rather than on pixels: run the system directly on the mesh of a façade or roof, and the pattern follows the topology of the thing you are designing.

```csharp
for (int i = 0; i < mesh.Vertices.Count; i++)
{
    double lapU = 0, lapV = 0;
    foreach (int n in neighbours[i])
    {
        lapU += u[n] - u[i];
        lapV += v[n] - v[i];
    }
    double uvv = u[i] * v[i] * v[i];
    uNext[i] = u[i] + Du * lapU - uvv + f * (1 - u[i]);
    vNext[i] = v[i] + Dv * lapV + uvv - (f + k) * v[i];
}
```

Per step, that is two passes over the vertices. A 60k-vertex mesh runs at interactive rates if you keep allocations out of the loop — lesson one of writing simulation code in C#: arrays in, arrays out, no LINQ in the hot path.

## The feed/kill safari

The magic is that `f` (feed) and `k` (kill) — two scalars — select the entire zoo. `f=0.055, k=0.062` grows coral. `f=0.030, k=0.057` gives fingerprint stripes. Nudge either by a few thousandths and the pattern reorganizes. I ended up mapping `f` and `k` to surface parameters — curvature, sun exposure — so the pattern *responds* to the building: denser perforation where the analysis wants shade, opening up where it wants light.

That is the real point. As texture, reaction-diffusion is a screensaver. As a **density field driving panelization** — perforation sizes, opening ratios, member thicknesses — it becomes a design tool: analysis in, fabricable geometry out.

Code is on GitHub with the rest of the plugin suite. Next experiment: swapping the hand-rolled Laplacian for cotangent weights so the pattern stops caring about mesh density.
