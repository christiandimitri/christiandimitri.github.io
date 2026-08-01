export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  summary: string;
  body: string;
  minutes: number;
};

export function parseFrontMatter(raw: string): {
  meta: Record<string, string>;
  body: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta: Record<string, string> = {};
  if (match) {
    for (const line of match[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return { meta, body: match ? raw.slice(match[0].length) : raw };
}

const files = import.meta.glob("../posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parse(path: string, raw: string): Post {
  const slug = path
    .split("/")
    .pop()!
    .replace(/\.md$/, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "");

  const { meta, body } = parseFrontMatter(raw);
  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: meta.title ?? slug,
    date: meta.date ?? "1970-01-01",
    tags: meta.tags ? meta.tags.split(",").map((t) => t.trim()) : [],
    summary: meta.summary ?? "",
    body,
    minutes: Math.max(1, Math.round(words / 200)),
  };
}

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date));

export const allPostTags: string[] = [
  ...new Set(posts.flatMap((p) => p.tags)),
].sort((a, b) => a.localeCompare(b));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(date: string): string {
  return new Date(date + "T12:00:00").toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
