---
title: Techno by code: driving Ableton Live without touching it
date: 2026-06-20
tags: Music, Python, MCP, AI
summary: Producing full techno tracks headlessly. A socket protocol into Live, gzipped-XML surgery on .als files, and what geometry work taught me about groove.
---

My other life is electronic music. This year the two lives merged: I've been producing techno tracks entirely by code. No mouse, no piano roll, Ableton Live running as what is effectively a render farm for arrangements written in Python.

## Two doors into Live

Live has no official scripting API for composition, so my toolchain uses two back doors:

- **A remote-script socket.** A MIDI Remote Script inside Live exposes a TCP/JSON protocol: create tracks, insert devices, write clip notes, set parameters. This lineage isn't mine — it started with [ahujasid's ableton-mcp](https://github.com/ahujasid/ableton-mcp) and grew through [uisato's extended fork](https://github.com/uisato/ableton-mcp-extended). My fork pushes it to 59 MCP tools, adding the things I actually needed: direct arrangement-view editing, bar-accurate clip placement, interpolated automation ramps instead of step envelopes, master and return-track mixing. Every write is followed by a read-back verification, because a command that silently no-ops is worse than one that fails.
- **`.als` surgery.** A Live set is gzipped XML. Some things the runtime API refuses (arrangement automation, precise timeline placement) are just XML nodes. So the pipeline pops the file open, edits the tree, re-gzips, relaunches. Undocumented, fragile, version-pinned. Works.

```python
with gzip.open("track.als") as f:
    tree = etree.parse(f)
for env in tree.iter("AutomationEnvelope"):
    write_curve(env, lfo_curve(bars=64, shape="exp"))
```

## Groove is arithmetic (annoyingly)

The revelation was how much of "feel" is specifiable. Swing is timing offsets on off-beats. A hardgroove shuffle is a velocity *and* timing pattern with specific ratios. The pocket of a good hi-hat line is jitter with structure. Coming from computational geometry this felt familiar; groove templates are constraint systems on a timeline:

- 16th-note swing ≈ +20–35 ms on even 16ths, depending on tempo
- ghost notes: velocity 25–40, never exactly quantized
- the kick never moves; everything else breathes around it

I've encoded these as 44 reusable skills, which means a track's rhythmic identity is versioned, diffable and transferable between projects. No DAW project file gives you that.

## Does it slap, though

Honest answer: the pipeline produces credible techno with correct structure, tension curves and mixdown headroom, and the taste still has to come from listening. I A/B against reference tracks with a Python DSP rig I built (Refmaster, on the Work page, grew out of the same itch): spectral balance, dynamics, loudness, then adjust in code.

![Refmaster match-EQ report, reference vs target](/img/refmaster-report.jpg)

The loop is slower than tweaking a knob, but it accumulates. Every decision becomes a function I keep. One track's build-up logic became the next track's starting point, which never happened once in ten years of mousing around a DAW.

Buildings, geometry, music. It's all the same job in the end: find the structure inside the thing, then write it down precisely enough to execute.
