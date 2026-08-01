export type TimelineEntry = {
  period: string;
  title: string;
  body: string;
};

export const timeline: TimelineEntry[] = [
  {
    period: "2009–2016",
    title: "Architecture school — Lebanon",
    body: "BSc and MSc in architecture at USEK, thesis on turning an old stadium into a sports hub. Along the way: SLB Architects, the Blank Workshop, and a summer in Bordeaux building the Bordeaux-Bastide model for Youssef Tohme. I liked the geometry problems more than the deadlines.",
  },
  {
    period: "2016–2018",
    title: "Robots, marble and a prize",
    body: "3D scanning and KUKA robot work at Marbres de France, a freeform marble washbasin for NERINEA, the ARTE ROBOTICA workshop in Paris where our team project Insection took best project on an ABB arm. With Building Reality we won the Morpheus Cup 2018, real-estate division. Somewhere in there I stopped calling myself just an architect.",
  },
  {
    period: "2017–2018",
    title: "MPDA — Barcelona",
    body: "Master in Parametric Design in Architecture at UPC. We designed, engineered and physically built an actively-bent gridshell, and my thesis chased the rationalization of freeform surfaces into planar quad meshes. Scripting stopped being a tool here and became the job.",
  },
  {
    period: "2018–2019",
    title: "Noumena",
    body: "Computational-design internship: digital fabrication, 3D printing, Grasshopper all day. First taste of shipping design tools other people had to use.",
  },
  {
    period: "2020–2022",
    title: "Estructuras Arqué",
    body: "Parametric specialist for a steel-structures fabricator. Automated the structural workflow with Tekla, Grasshopper and ShapeDiver, and built the Arqué configurator that put five canopies on the ground across Spain.",
  },
  {
    period: "2022–2023",
    title: "Going full software",
    body: "The freelance-and-startup stretch. Parametric Monkey: turning a Grasshopper proof of concept into a scalable .NET app. Mule Studio: Tekla and Grasshopper automation that fed the Guggenheim UAE effort. Then a year at e-verse building BIM plugins — a solar-farm layout tool and the Navisworks add-ins (Pris, Vero) — in proper scrum, with proper clients.",
  },
  {
    period: "2024–2026",
    title: "CheckToBuild",
    body: "BIM developer on a QA/QC and inspection platform: IFC and fragments pipeline, deviation checks between as-designed models and laser-scanned reality, React Three Fiber performance work on large IFCs and octree point clouds, Civil 3D automations bridged to React through WebView2.",
  },
  {
    period: "2025–now",
    title: "Monstarlab",
    body: "Consultant on an ML system that auto-grades Civil 3D designs — now my main engagement. I own the geometry: extracting and cleaning alignments, feature lines and TIN surfaces, generating training data, and the half-edge topology utilities that keep grading-line tracing robust. Internal validation sits around 99% across project scenarios.",
  },
  {
    period: "on the side",
    title: "Agents, MCP and music",
    body: "Open-source R3F libraries, my own MCP servers, an AEC agent that critiques Grasshopper definitions instead of building demo towers, and music tooling: driving Ableton Live programmatically and mastering against reference tracks with a Python DSP engine.",
  },
];

export const publications = [
  "Study Case: Design & Construction of a Spherical Actively-Bent Chebychev Net Triangular Gridshell Covered by a Stretchable Membrane",
  "ARTE ROBOTICA V.01 — Computational Robotic Painting Workshop with DesignMorphine: INSECTION",
];

export const award = "Morpheus Cup 2018 — winner, Real Estate division (with Building Reality)";

export const languages = [
  { name: "Arabic", level: "native" },
  { name: "French", level: "advanced" },
  { name: "English", level: "advanced" },
  { name: "Spanish", level: "conversational" },
];
