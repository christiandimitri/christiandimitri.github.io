import { parseFrontMatter } from "./posts";

export type CaseStudy = {
  slug: string;
  title: string;
  context: string;
  year: string;
  summary: string;
  body: string;
};

const files = import.meta.glob("../case-studies/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const caseStudies: CaseStudy[] = Object.entries(files).map(
  ([path, raw]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const { meta, body } = parseFrontMatter(raw);
    return {
      slug,
      title: meta.title ?? slug,
      context: meta.context ?? "",
      year: meta.year ?? "",
      summary: meta.summary ?? "",
      body,
    };
  },
);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
