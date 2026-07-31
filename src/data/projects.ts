export type Project = {
  slug: string;
  title: string;
  context?: string; // company / institution, shown after the title
  oneLiner: string;
  year: string;
  tags: string[];
  gradient: [string, string];
  selected?: boolean;
  links?: { site?: string; repo?: string };
};

export const projects: Project[] = [
  {
    slug: "civil-autograder",
    title: "Civil Autograder",
    context: "Monstar Lab",
    oneLiner:
      "AI-assisted grading design for land development — React + R3F frontend, a Python computational-geometry engine, and C# plugins for Civil 3D 2023–2027.",
    year: "2025–26",
    tags: ["React", "R3F", "Python", "C#", "Civil 3D", "AI"],
    gradient: ["#f59e0b", "#ef4444"],
    selected: true,
  },
  {
    slug: "dxf-editor",
    title: "Web DXF editor at scale",
    context: "construction robotics",
    oneLiner:
      "A browser CAD editor that opens DXF files desktop apps choke on — C++ core compiled to WASM, GPU per-entity highlighting, viewport streaming.",
    year: "2024–26",
    tags: ["three.js", "C++", "WASM", "DXF", "Performance"],
    gradient: ["#06b6d4", "#3b82f6"],
    selected: true,
  },
  {
    slug: "check2build",
    title: "Check2Build",
    oneLiner:
      "BIM quality-assurance SaaS: web IFC viewers comparing as-built point clouds and scans against as-designed models, deviation by deviation.",
    year: "2024–26",
    tags: ["React", "three.js", "IFC", "Point Clouds", "Node"],
    gradient: ["#22c55e", "#0ea5e9"],
    selected: true,
  },
  {
    slug: "closclub-ai-os",
    title: "CLŌS Club AI OS",
    oneLiner:
      "A 16-agent AI system running a fashion-trading platform end to end — event-driven orchestration, creative pipeline, and a .NET MAUI companion app.",
    year: "2026",
    tags: ["AI", "Agents", "TypeScript", ".NET MAUI"],
    gradient: ["#a855f7", "#ec4899"],
    selected: true,
  },
  {
    slug: "ableton-studio",
    title: "Ableton by code",
    oneLiner:
      "Producing techno headlessly: driving Ableton Live over a socket protocol and performing gzipped-XML surgery on .als files the API refuses to touch.",
    year: "2025–26",
    tags: ["Music", "Python", "MCP", "AI"],
    gradient: ["#f43f5e", "#8b5cf6"],
    selected: true,
  },
  {
    slug: "refmaster",
    title: "Refmaster",
    oneLiner:
      "Reference-based audio mastering in the browser — a Python DSP engine behind FastAPI, with waveform-level A/B against the reference track.",
    year: "2025",
    tags: ["DSP", "Python", "React", "Music"],
    gradient: ["#14b8a6", "#22d3ee"],
  },
  {
    slug: "bim-llm",
    title: "bim-llm",
    oneLiner:
      "Bills of quantities straight from IFC models with LLM agents — LangChain RAG over IfcOpenShell, aligned to NRM2 and MasterFormat.",
    year: "2025",
    tags: ["AI", "LLM", "IFC", "Python"],
    gradient: ["#8b5cf6", "#6366f1"],
    links: { repo: "https://github.com/christiandimitri/bim-llm" },
  },
  {
    slug: "r3f-peridot",
    title: "r3f-peridot",
    oneLiner:
      "Outline post-processing for React Three Fiber, three.js and That Open fragments — selection outlines that hold up at scale.",
    year: "2025",
    tags: ["R3F", "three.js", "GLSL", "Open Source"],
    gradient: ["#84cc16", "#10b981"],
    selected: true,
    links: {
      site: "https://christiandimitri.github.io/r3f-peridot/",
      repo: "https://github.com/christiandimitri/r3f-peridot",
    },
  },
  {
    slug: "fragments-webxr",
    title: "fragments-webxr",
    oneLiner:
      "BIM models in the headset — That Open Fragments streamed into WebXR for VR and AR walkthroughs.",
    year: "2025–26",
    tags: ["WebXR", "IFC", "three.js", "Open Source"],
    gradient: ["#06b6d4", "#8b5cf6"],
    links: { repo: "https://github.com/christiandimitri/fragments-webxr" },
  },
  {
    slug: "splat-poc",
    title: "Gaussian splats on the web",
    oneLiner:
      "An R3F Gaussian-splatting viewer with multi-splat depth sorting and live performance monitoring.",
    year: "2025",
    tags: ["three.js", "R3F", "Splats"],
    gradient: ["#f97316", "#f43f5e"],
  },
  {
    slug: "hydra",
    title: "Hydra",
    oneLiner:
      "Interactive solar-analysis tooling built on web IFC viewers, for daylight decisions at early design stages.",
    year: "2022–23",
    tags: ["IFC", "three.js", "Solar"],
    gradient: ["#eab308", "#f97316"],
  },
  {
    slug: "vero",
    title: "Vero",
    oneLiner:
      "QA automation for Navisworks and Revit — viewpoint inspection pipelines that replace manual model checking.",
    year: "2022",
    tags: ["C#", "Revit", "Navisworks"],
    gradient: ["#0ea5e9", "#6366f1"],
  },
  {
    slug: "pris",
    title: "Pris",
    oneLiner:
      "Revit ↔ Civil 3D interoperability for NWD model data — one model language across two ecosystems that refuse to talk.",
    year: "2022",
    tags: ["C#", "Revit", "Civil 3D"],
    gradient: ["#64748b", "#0ea5e9"],
  },
  {
    slug: "optinave",
    title: "Optinave",
    oneLiner:
      "Cloud structural analysis for naval structures — heavy computation moved off the desktop and into the browser.",
    year: "2021",
    tags: ["C#", "Cloud", "Structural"],
    gradient: ["#0e7490", "#155e75"],
  },
  {
    slug: "arque",
    title: "Arque",
    oneLiner:
      "A parametric configurator for modular steel roof structures — five built canopies across Spain, from Grasshopper definition to fabrication drawings.",
    year: "2019–21",
    tags: ["Grasshopper", "C#", "Rhino", "Fabrication"],
    gradient: ["#ef4444", "#f59e0b"],
    selected: true,
  },
  {
    slug: "gh-plugin-suite",
    title: "Grasshopper plugin suite",
    oneLiner:
      "Delaunay–Voronoi, reaction-diffusion and parametric-equation components, written in C# against the Grasshopper SDK.",
    year: "2019",
    tags: ["Grasshopper", "C#", "Rhino", "Open Source"],
    gradient: ["#10b981", "#84cc16"],
    links: { repo: "https://github.com/christiandimitri/DelaunayVoronoi" },
  },
  {
    slug: "pq-meshes",
    title: "Planar quad meshes",
    context: "MPDA · UPC Barcelona",
    oneLiner:
      "Master's thesis: rationalizing freeform gridshells into planar quad panels — geometry that can actually be fabricated and built.",
    year: "2018",
    tags: ["Grasshopper", "C#", "Rhino", "Geometry", "Research"],
    gradient: ["#6366f1", "#a855f7"],
    selected: true,
    links: { repo: "https://github.com/christiandimitri/MPDA18_MastersThesis" },
  },
  {
    slug: "in-between",
    title: "In Between",
    context: "M.Arch · USEK",
    oneLiner:
      "A cultural centre stitching together a divided neighbourhood — the architecture degree project where all of this started.",
    year: "2017",
    tags: ["Architecture", "AutoCAD", "3ds Max"],
    gradient: ["#78716c", "#a8a29e"],
  },
];

export const allTags: string[] = [...new Set(projects.flatMap((p) => p.tags))].sort(
  (a, b) => a.localeCompare(b),
);
