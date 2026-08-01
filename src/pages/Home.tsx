import { Hero } from "../components/Hero";
import { ProjectList } from "../components/ProjectList";
import { usePageTitle } from "../lib/usePageTitle";
import type { Lang } from "../data/site";

export function Home({ lang = "en" }: { lang?: Lang }) {
  usePageTitle();
  return (
    <>
      <Hero lang={lang} />
      <ProjectList lang={lang} />
    </>
  );
}
