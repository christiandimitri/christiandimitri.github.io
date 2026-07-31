---
title: An AEC agent that critiques, not builds
date: 2026-07-15
tags: AI, MCP, Grasshopper, Revit, BIM
summary: My proof of concept for a Claude agent over a live Grasshopper canvas — why I want a code verdict instead of a generated tower, and where the BIM write-back goes next.
---

Every demo of AI in parametric design looks the same: an agent conjures a twisting tower from a prompt, the crowd claps, and no engineer in the room would stamp any of it. I've been building the opposite as a personal project: a Claude agent that connects to a **live Grasshopper canvas over MCP** and starts by *reading* what's already there.

![The pipeline: Revit to Grasshopper to solvers to verdict, with a render branch](/img/aec-agent-pipeline.svg)

## Reading beats writing

The bet behind the whole POC: an agent that audits an existing definition is more useful, and more trustworthy, than one that generates a new one. It walks the document over the bridge, then reasons across lenses a reviewer would use. Is a data tree about to explode? Is that 30-component cluster really four components in a trenchcoat? Will those panels actually fabricate flat? Findings first. Then, if you ask, one targeted rewrite. Not a new tower.

Two open-source bridges exist for talking to Grasshopper over MCP, and I evaluated both rather than writing my own: [alfredatnycu's grasshopper-mcp](https://github.com/alfredatnycu/grasshopper-mcp), a compiled C# component running a TCP server inside Grasshopper, and [veoery's GH_mcp_server](https://github.com/veoery/GH_mcp_server), a pure GHPython approach. I went with the native component because audit workflows need real read access to the object model, and because it produces definitions a human engineer can open and inspect afterwards.

There's a constraint worth knowing before you try this: **the MCP cannot install plugins.** Grasshopper loads libraries at startup, so the bridge only works with what's already on the canvas's machine. In practice the knowledge-base file, not the API, is what limits which components an agent will reach for.

## The verdict is the product

Downstream of the canvas, the pipeline runs two analysis streams through open solvers: structure through [COMPAS FEA](https://compas.dev/), performance through [Ladybug Tools](https://www.ladybug.tools/). Solvers are commodities though. The part I care about is the layer after them, which turns raw numbers into a **normative verdict**: this member passes analysis but fails Eurocode 3 lateral-torsional buckling under the Spanish Código Estructural combination, go to IPE300, utilisation 0.92. An agent that says *that* is speaking the language of someone with liability. An agent that says "I made you a cool roof" is not.

That's also why the codes live in their own skills, separate from the solver skills. Engines change on software release cycles, codes change on legislative ones, and bundling them means both rot together.

## The render branch

Once a design state passes, a separate branch turns it into images and video. I write the geometry's story into a structured prompt and hand it to Higgsfield or GPT-Image (the [Higgsfield skill](https://higgsfield.ai/) I use is O-Side Media's work, not mine; my part is the parametric-to-prompt translation, teaching the formula what a conjugate curve network looks like on camera). It sounds cosmetic. It isn't. Clients approve buildings with their eyes, and a verdict plus a believable image closes a loop that neither closes alone.

## To be continued: the BIM opening

The POC currently runs one direction: Revit in through Rhino.Inside, verdict out. The next opening is the write-back, pushing the passing design state into the BIM model with the analytical model kept intact, and the same agent loop running against browser BIM through That Open's stack, where my [bim-llm](https://github.com/christiandimitri/bim-llm) experiments already live. Three operating modes, in increasing order of trust required: read-only critic, targeted rewrite, generative. I use the first daily, the second carefully, and the third only when nothing is at stake.

I'm building this in the open as skills and doctrine rather than a product, partly because the honest status is "proof of concept", and partly because the doctrine is the interesting part. Agents in AEC will be judged by their verdicts, not their geometry.
