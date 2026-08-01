export const site = {
  name: "Christian Dimitri",
  tagline: "Architect / BIM developer",
  heroTitle: "I turn buildings into software.",
  heroSub:
    "I'm an architect who ended up a software developer, based in Barcelona. These days I build parametric and interoperable workflows across Autodesk and open-BIM stacks: real-time inspection tools, grading automation, viewers that survive files from actual construction sites.",
  heroNow: "Currently at CheckToBuild, consulting for Monstarlab on the side.",
  email: "christian.j.dimitrii@gmail.com",
  github: "https://github.com/christiandimitri",
  linkedin: "https://linkedin.com/in/chrisdimitri",
  cv: "/downloads/ChristianDimitri_CV.pdf",
  portfolio: "/downloads/ChristianDimitri_Portfolio.pdf",
};

export type Lang = "en" | "es";

export const strings = {
  en: {
    heroTitle: site.heroTitle,
    heroSub: site.heroSub,
    heroNow: site.heroNow,
    tagline: site.tagline,
    nav: { work: "Work", writing: "Writing", about: "About" },
    selectedWork: "Selected work",
    everything: "Everything",
    tags: "Tags",
    caseStudy: "case study →",
    visit: "visit ↗",
    source: "source ↗",
    nothingTagged: (tag: string) => `Nothing tagged “${tag}” yet.`,
  },
  es: {
    heroTitle: "Convierto edificios en software.",
    heroSub:
      "Soy arquitecto y acabé siendo desarrollador de software, en Barcelona. Hoy construyo flujos paramétricos e interoperables sobre los ecosistemas de Autodesk y openBIM: herramientas de inspección en tiempo real, automatización de explanaciones y visores que aguantan archivos de obra reales.",
    heroNow: "Actualmente en CheckToBuild, y como consultor para Monstarlab.",
    tagline: "Arquitecto / desarrollador BIM",
    nav: { work: "Trabajo", writing: "Escritos", about: "Sobre mí" },
    selectedWork: "Trabajo seleccionado",
    everything: "Todo",
    tags: "Etiquetas",
    caseStudy: "caso de estudio →",
    visit: "visitar ↗",
    source: "código ↗",
    nothingTagged: (tag: string) => `Nada etiquetado como “${tag}” todavía.`,
  },
} as const;
