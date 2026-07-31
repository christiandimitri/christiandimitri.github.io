export type Project = {
  slug: string;
  title: string;
  context?: string; // company / institution, shown after the title
  oneLiner: string;
  year: string;
  tags: string[];
  gradient: [string, string];
  selected?: boolean;
  image?: string;
  links?: { site?: string; repo?: string };
};

export const projects: Project[] = [
  {
    slug: "civil-autograder",
    title: "Civil Autograder",
    context: "Monstarlab",
    oneLiner:
      "ML-assisted grading design for Civil 3D. I own the geometry side: alignments, feature lines and TIN surfaces in, clean training data out, half-edge topology utilities holding it together.",
    year: "2025–26",
    tags: ["Python", "C#", "Civil 3D", "React", "R3F", "AI"],
    gradient: ["#f59e0b", "#ef4444"],
    selected: true,
  },
  {
    slug: "dxf-editor",
    title: "Web DXF editor at scale",
    context: "construction robotics",
    oneLiner:
      "A browser CAD editor that opens DXF files desktop apps choke on. C++ core compiled to WASM, per-entity GPU highlighting, viewport streaming.",
    year: "2024–26",
    tags: ["three.js", "C++", "WASM", "DXF", "Performance"],
    gradient: ["#06b6d4", "#3b82f6"],
    selected: true,
  },
  {
    slug: "checktobuild",
    title: "CheckToBuild",
    oneLiner:
      "BIM quality-assurance platform. IFC and fragments pipeline, deviation checks between the model and laser-scanned reality, point clouds and E57 imagery in the browser.",
    year: "2024–26",
    tags: ["React", "three.js", "IFC", "Point Clouds", "Node"],
    gradient: ["#22c55e", "#0ea5e9"],
    selected: true,
  },
  {
    slug: "aec-agent",
    title: "AEC agent: Revit → Grasshopper → render",
    context: "personal project",
    oneLiner:
      "A Claude agent that reads a live Grasshopper canvas over MCP, runs open solvers on it, and answers with a code verdict instead of a pretty picture. Then Higgsfield handles the pretty picture. To be continued into full BIM write-back.",
    year: "2026",
    tags: ["AI", "MCP", "Grasshopper", "Revit", "BIM"],
    gradient: ["#8b5cf6", "#84cc16"],
    selected: true,
    image: "/img/aec-agent-pipeline.svg",
  },
  {
    slug: "mcp-servers",
    title: "MCP servers & skills",
    oneLiner:
      "My own MCP servers: a 23-tool property-operations server where risky actions need human approval, a 59-tool fork driving Ableton Live, and 100+ Claude skills covering AEC, music and design.",
    year: "2025–26",
    tags: ["MCP", "AI", "TypeScript", "Python"],
    gradient: ["#a78bfa", "#6366f1"],
    selected: true,
  },
  {
    slug: "closclub-ai-os",
    title: "CLŌS Club AI OS",
    oneLiner:
      "A fashion-trading platform run by an 18-agent hierarchy: CEO agent down to churn detection, event-driven over Redis, with a .NET MAUI app on top.",
    year: "2026",
    tags: ["AI", "Agents", "TypeScript", ".NET MAUI"],
    gradient: ["#a855f7", "#ec4899"],
  },
  {
    slug: "ableton-studio",
    title: "Ableton by code",
    oneLiner:
      "Producing techno without touching the DAW: a 59-tool MCP layer into Live, gzipped-XML surgery on .als files, and 44 skills that encode groove as functions.",
    year: "2025–26",
    tags: ["Music", "Python", "MCP", "AI"],
    gradient: ["#f43f5e", "#8b5cf6"],
    selected: true,
  },
  {
    slug: "refmaster",
    title: "Refmaster",
    oneLiner:
      "Reference-based mastering in the browser. Python DSP engine, match-EQ against the track you wish yours sounded like, honest 'fix the mix' warnings.",
    year: "2025",
    tags: ["DSP", "Python", "React", "Music"],
    gradient: ["#14b8a6", "#22d3ee"],
    image: "/img/refmaster-ui.jpg",
  },
  {
    slug: "bim-llm",
    title: "bim-llm",
    oneLiner:
      "Bills of quantities from IFC models with LLM agents. IfcOpenShell does the measuring, the agents do the classifying, NRM2 and MasterFormat keep everyone honest.",
    year: "2025",
    tags: ["AI", "LLM", "IFC", "Python"],
    gradient: ["#8b5cf6", "#6366f1"],
    links: { repo: "https://github.com/christiandimitri/bim-llm" },
  },
  {
    slug: "r3f-peridot",
    title: "r3f-peridot",
    oneLiner:
      "Outline post-processing for React Three Fiber, three.js and That Open fragments. Selection outlines that survive ten thousand objects.",
    year: "2025",
    tags: ["R3F", "three.js", "GLSL", "Open Source"],
    gradient: ["#84cc16", "#10b981"],
    selected: true,
    image: "/img/r3f-peridot.jpg",
    links: {
      site: "https://christiandimitri.github.io/r3f-peridot/",
      repo: "https://github.com/christiandimitri/r3f-peridot",
    },
  },
  {
    slug: "fragments-webxr",
    title: "fragments-webxr",
    oneLiner:
      "BIM models in the headset. That Open Fragments streamed into WebXR for VR and AR walkthroughs.",
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
    context: "e-verse",
    oneLiner:
      "Solar-analysis tool on web IFC viewers, for daylight decisions before the design hardens. Built during my year at e-verse.",
    year: "2022–23",
    tags: ["IFC", "three.js", "Solar"],
    gradient: ["#eab308", "#f97316"],
    links: { site: "https://solarshapediver.e-verse.com/" },
  },
  {
    slug: "vero",
    title: "Vero",
    context: "e-verse",
    oneLiner:
      "Navisworks add-in that generates viewpoints by level, so model reviews stop being a manual scavenger hunt. Demo on YouTube.",
    year: "2022",
    tags: ["C#", "Revit", "Navisworks"],
    gradient: ["#0ea5e9", "#6366f1"],
    links: { site: "https://www.youtube.com/watch?v=BXMpaEBzcwQ" },
  },
  {
    slug: "pris",
    title: "Pris",
    context: "e-verse",
    oneLiner:
      "Navisworks add-in that selects NWD elements by Revit ID — two ecosystems that refuse to talk, made to talk. Demo on YouTube.",
    year: "2022",
    tags: ["C#", "Revit", "Civil 3D"],
    gradient: ["#64748b", "#0ea5e9"],
    links: { site: "https://www.youtube.com/watch?v=ccjQzQ4VoaU" },
  },
  {
    slug: "optinave",
    title: "Optinave",
    oneLiner:
      "Cloud structural analysis for naval structures. Heavy computation moved off the desktop and into the browser.",
    year: "2021",
    tags: ["C#", "Cloud", "Structural"],
    gradient: ["#0e7490", "#155e75"],
    links: { site: "http://www.optinave.com" },
  },
  {
    slug: "arque",
    title: "Arqué Spatial Frames",
    context: "Estructuras Arqué",
    oneLiner:
      "Parametric configurator for modular steel roofs — five built canopies across Spain, from Grasshopper definition to fabrication drawings. The web app is still live.",
    year: "2020–22",
    tags: ["Grasshopper", "C#", "Rhino", "Fabrication"],
    gradient: ["#ef4444", "#f59e0b"],
    selected: true,
    image: "/img/arque-marbella.jpg",
    links: { site: "https://parametric-ui.netlify.app/" },
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
      "Master's thesis: rationalizing freeform gridshells into planar quad panels — geometry that can actually be fabricated and paid for.",
    year: "2018",
    tags: ["Grasshopper", "C#", "Rhino", "Geometry", "Research"],
    gradient: ["#6366f1", "#a855f7"],
    selected: true,
    image: "/img/pq-meshes-dark.jpg",
    links: { repo: "https://github.com/christiandimitri/MPDA18_MastersThesis" },
  },
  {
    slug: "in-between",
    title: "In Between",
    context: "M.Arch · USEK",
    oneLiner:
      "A cultural centre stitching together a divided neighbourhood — the architecture degree project where all of this started.",
    year: "2016",
    tags: ["Architecture", "AutoCAD", "3ds Max"],
    gradient: ["#78716c", "#a8a29e"],
    image: "/img/in-between.jpg",
  },
];

export const allTags: string[] = [...new Set(projects.flatMap((p) => p.tags))].sort(
  (a, b) => a.localeCompare(b),
);
