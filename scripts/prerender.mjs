/**
 * Prerender every route to flat HTML (GitHub Pages serves /writing/foo from
 * writing/foo.html), with per-route head tags, then generate sitemap.xml and
 * feed.xml. Run after `vite build` (client) and `vite build --ssr`.
 */
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ORIGIN = "https://christiandimitri.github.io";
const SITE_TITLE = "Christian Dimitri — Architect turned software engineer";
const SITE_DESC =
  "Christian Dimitri is an architect turned software engineer in Barcelona, building BIM and CAD tools for the web — IFC viewers, DXF editors, computational geometry and AI tooling for the built environment.";

const { render } = await import(path.join(root, "dist-ssr", "entry-server.js"));

// ---------- content manifests ----------

function parseFrontMatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta = {};
  if (match) {
    for (const line of match[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return meta;
}

async function readMarkdownDir(dir, stripDate) {
  const out = [];
  for (const file of await readdir(dir)) {
    if (!file.endsWith(".md")) continue;
    const meta = parseFrontMatter(readFileSync(path.join(dir, file), "utf8"));
    const slug = stripDate
      ? file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "")
      : file.replace(/\.md$/, "");
    out.push({ slug, ...meta });
  }
  return out;
}

const posts = (await readMarkdownDir(path.join(root, "src/posts"), true)).sort(
  (a, b) => b.date.localeCompare(a.date),
);
const studies = await readMarkdownDir(path.join(root, "src/case-studies"), false);

// ---------- head rewriting ----------

const esc = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");

function withHead(template, { title, description, url, extra = "" }) {
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${esc(description)}$2`,
    )
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${esc(description)}$2`,
    )
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace("</head>", `${extra}</head>`);
}

function postJsonLd(post) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: "Christian Dimitri" },
    url: `${ORIGIN}/writing/${post.slug}`,
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

const hreflang = `<link rel="alternate" hreflang="en" href="${ORIGIN}/" /><link rel="alternate" hreflang="es" href="${ORIGIN}/es" /><link rel="alternate" hreflang="x-default" href="${ORIGIN}/" />`;

// ---------- route table ----------

const routes = [
  { url: "/", file: "index.html", title: SITE_TITLE, description: SITE_DESC, extra: hreflang },
  {
    url: "/es",
    file: "es.html",
    title: "Christian Dimitri — Arquitecto y desarrollador BIM",
    description:
      "Arquitecto y desarrollador BIM en Barcelona: visores IFC y DXF, geometría computacional y herramientas de IA para el entorno construido.",
    extra: hreflang,
  },
  {
    url: "/writing",
    file: "writing.html",
    title: "Writing — Christian Dimitri",
    description:
      "Notes from the road between architecture and software: Grasshopper, C#, IFC, three.js, WASM and AI for the built environment.",
  },
  {
    url: "/about",
    file: "about.html",
    title: "About — Christian Dimitri",
    description:
      "From architecture in Beirut to BIM software in Barcelona — the full arc, publications and languages.",
  },
  ...posts.map((p) => ({
    url: `/writing/${p.slug}`,
    file: `writing/${p.slug}.html`,
    title: `${p.title} — Christian Dimitri`,
    description: p.summary ?? SITE_DESC,
    extra: postJsonLd(p),
  })),
  ...studies.map((s) => ({
    url: `/work/${s.slug}`,
    file: `work/${s.slug}.html`,
    title: `${s.title} — Christian Dimitri`,
    description: s.summary ?? SITE_DESC,
  })),
];

// ---------- render ----------

const template = readFileSync(path.join(dist, "index.html"), "utf8");

// unknown routes: plain SPA shell so the client router shows NotFound
writeFileSync(path.join(dist, "404.html"), template);

for (const route of routes) {
  const appHtml = render(route.url);
  const page = withHead(template, route).replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );
  const outPath = path.join(dist, route.file);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, page);
}

// ---------- sitemap + feed ----------

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${ORIGIN}${r.url === "/" ? "/" : r.url}</loc></url>`).join("\n")}
</urlset>
`;
writeFileSync(path.join(dist, "sitemap.xml"), sitemap);

const items = posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${ORIGIN}/writing/${p.slug}</link>
      <guid isPermaLink="true">${ORIGIN}/writing/${p.slug}</guid>
      <pubDate>${new Date(p.date + "T12:00:00Z").toUTCString()}</pubDate>
      <description>${esc(p.summary ?? "")}</description>
    </item>`,
  )
  .join("\n");

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Christian Dimitri — Writing</title>
    <link>${ORIGIN}/writing</link>
    <description>Architecture, computational geometry, BIM software and AI for the built environment.</description>
    <language>en</language>
    <atom:link href="${ORIGIN}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
writeFileSync(path.join(dist, "feed.xml"), feed);

// dist-ssr is a build intermediate — not deployed
rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
// keep the CV/portfolio copies (cpSync imported for future use)
void cpSync;

console.log(`prerendered ${routes.length} routes, sitemap + feed written`);
