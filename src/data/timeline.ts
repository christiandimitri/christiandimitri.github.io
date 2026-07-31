export type TimelineEntry = {
  period: string;
  title: string;
  body: string;
};

export const timeline: TimelineEntry[] = [
  {
    period: "2011–2016",
    title: "Architecture — Beirut",
    body: "Master of Architecture at the Holy Spirit University of Kaslik (USEK). Drawing boards, concrete, and a growing suspicion that the most interesting part of every project was the geometry problem hiding inside it.",
  },
  {
    period: "2017–2018",
    title: "Parametric design — Barcelona",
    body: "Master in Parametric Design in Architecture (MPDA) at UPC Barcelona. Built and stress-tested actively-bent gridshells, and wrote a thesis on rationalizing freeform surfaces into planar quad meshes — where scripting stopped being a tool and became the job.",
  },
  {
    period: "2018–2021",
    title: "Computational design & fabrication",
    body: "Grasshopper and C# full-time: custom plugins, form-finding, digital fabrication with CNC and robotic arms, and Arque — a parametric configurator that put five steel canopies on the ground across Spain.",
  },
  {
    period: "2021–2023",
    title: "BIM software developer",
    body: "Crossed fully into software. Built Hydra (solar analysis on web IFC viewers), Pris (Revit ↔ Civil 3D interop), Vero (Navisworks/Revit QA automation) and Optinave (cloud analysis for naval structures) — .NET on the desktop, web tech everywhere else.",
  },
  {
    period: "2023–today",
    title: "Web BIM at scale",
    body: "3D on the web as a day job: Check2Build's BIM quality-assurance platform (IFC + point clouds in the browser), an AI-assisted civil autograder at Monstar Lab, and a WASM-powered DXF editor for a construction-robotics platform. React, three.js, C++, Python, C# — whatever the geometry needs.",
  },
  {
    period: "on the side",
    title: "Open source, agents & music",
    body: "R3F rendering libraries (r3f-peridot, fragments-webxr), LLM agents for BIM quantities, and an unreasonable amount of code that makes techno — driving Ableton Live programmatically and mastering tracks with a Python DSP engine.",
  },
];

export const publications = [
  "Study Case: Design & Construction of a Spherical Actively-Bent Chebychev Net Triangular Gridshell Covered by a Stretchable Membrane",
  "ARTE ROBOTICA V.01 — Computational Robotic Painting Workshop with DesignMorphine: INSECTION",
];

export const languages = [
  { name: "English", level: "native" },
  { name: "Arabic", level: "native" },
  { name: "French", level: "fluent" },
  { name: "Spanish", level: "fluent" },
];
