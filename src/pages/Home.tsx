import { Hero } from "../components/Hero";
import { ProjectList } from "../components/ProjectList";
import { usePageTitle } from "../lib/usePageTitle";

export function Home() {
  usePageTitle();
  return (
    <>
      <Hero />
      <ProjectList />
    </>
  );
}
