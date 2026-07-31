---
title: Techno by code: driving Ableton Live without touching it
date: 2026-06-20
tags: Music, Python, MCP, AI
summary: Producing full techno tracks headlessly — a socket protocol into Live, gzipped-XML surgery on .als files, and what geometry work taught me about groove.
---

My other life is electronic music. This year the two lives merged: I have been producing techno tracks **entirely by code** — no mouse, no piano roll, Ableton Live running as what is effectively a render farm for arrangements written in Python.

## Two doors into Live

Live has no official scripting API for composition, so the toolchain uses two complementary back doors:

- **A remote-script socket.** A MIDI Remote Script inside Live exposes a TCP/JSON protocol — create tracks, insert devices, write clip notes, set parameters. This is the interactive path, wrapped in an MCP server so AI agents can call it as tools. Every write is followed by a read-back verification, because a command that silently no-ops is worse than one that fails.
- **`.als` surgery.** A Live set is gzipped XML. Some things the runtime API refuses — arrangement-view automation, precise clip placement across the timeline — are just XML nodes. So the pipeline pops the file open, edits the tree, re-gzips, and relaunches. Undocumented, fragile, version-pinned — and it works.

```python
with gzip.open("track.als") as f:
    tree = etree.parse(f)
for env in tree.iter("AutomationEnvelope"):
    write_curve(env, lfo_curve(bars=64, shape="exp"))
```

## Groove is arithmetic (annoyingly)

The revelation was how much of "feel" is specifiable. Swing is timing offsets on off-beats; a hardgroove shuffle is a velocity *and* timing pattern with specific ratios; the pocket of a good hi-hat line is jitter with structure. Coming from computational geometry, this is familiar territory — groove templates are just constraint systems on a timeline:

- 16th-note swing ≈ +20–35 ms on even 16ths, depending on tempo
- ghost notes: velocity 25–40, never quantized exactly
- the kick *never* moves; everything else breathes around it

Encoding these as reusable functions means a track's rhythmic identity is versioned, diffable and transferable between projects — things no DAW project file gives you.

## Does it slap, though

The honest answer: the pipeline produces *credible* techno — correct structure, tension curves, mixdown headroom — and the taste still has to come from listening. I A/B against reference tracks with a Python analysis rig (spectral balance, dynamics, loudness) and adjust in code. The loop is slower than tweaking a knob but it *accumulates*: every decision becomes a function I keep.

Buildings, geometry, music — it is all the same job in the end: find the structure inside the thing, then write it down precisely enough to execute. Turns out that job is called programming.
