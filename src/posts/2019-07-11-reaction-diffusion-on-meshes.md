---
title: Growing patterns: reaction-diffusion on meshes
date: 2019-07-11
tags: Grasshopper, C#, Geometry
summary: Gray–Scott reaction-diffusion running on mesh vertices in C#, and how screensaver mathematics turned into a façade panelization tool.
---

Reaction-diffusion is the pattern-forming process Alan Turing proposed in 1952 to explain how leopards get spots. Two virtual chemicals spread across a surface and react, and out of noise you get stable spots, stripes, labyrinths. [Karl Sims' page](https://karlsims.com/rd.html) is still the best visual introduction I know. It's also one of the most satisfying things you can run on an architectural surface, which is my excuse for spending a month on it.

## Gray–Scott in a Grasshopper component

The Gray–Scott model tracks two concentrations, U and V, per sample point:

```
u' = Du·∇²u − u·v² + f·(1 − u)
v' = Dv·∇²v + u·v² − (f + k)·v
```

On a pixel grid the Laplacian ∇² is a convolution kernel. On a **mesh** it becomes a weighted sum over each vertex's neighbours. That's why I wanted this in C# on geometry rather than on pixels: run the system directly on the mesh of a façade or roof and the pattern follows the topology of the thing you're designing. Code is in my [ReactionDiffusion repo](https://github.com/christiandimitri/ReactionDiffusion).

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

Two passes over the vertices per step. A 60k-vertex mesh runs at interactive rates if you keep allocations out of the loop. That was lesson one of simulation code in C#: arrays in, arrays out, no LINQ in the hot path. My first version was elegant and unusable.

## The feed/kill safari

The magic is that `f` (feed) and `k` (kill), two scalars, select the entire zoo. `f=0.055, k=0.062` grows coral. `f=0.030, k=0.057` gives fingerprint stripes. Nudge either by a few thousandths and the whole pattern reorganizes. I lost evenings to this.

Where it got useful: I started mapping `f` and `k` to surface data like curvature and sun exposure, so the pattern responds to the building. Denser perforation where the analysis wants shade, opening up where it wants light. As texture, reaction-diffusion is a screensaver. As a density field driving panelization (perforation sizes, opening ratios, member thicknesses) it earns its place in the toolchain.

Next experiment: swapping my hand-rolled Laplacian for cotangent weights so the pattern stops caring about mesh density.
