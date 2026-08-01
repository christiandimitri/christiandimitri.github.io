import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { strings, type Lang } from "../data/site";
import { useThemeValue } from "../lib/useThemeValue";

export function ProjectRow({
  project,
  index,
  lang = "en",
}: {
  project: Project;
  index: number;
  lang?: Lang;
}) {
  const [g1, g2] = project.gradient;
  const t = strings[lang];
  const theme = useThemeValue();
  const href = project.links?.site ?? project.links?.repo;
  const imgSrc =
    theme === "light" && project.imageLight ? project.imageLight : project.image;

  const inner = (
    <>
      <span className="project-icon" aria-hidden="true">
        {project.title.slice(0, 1)}
      </span>
      <span className="project-body">
        <span className="project-heading">
          <h3 className="project-title">
            {project.title}
            {project.context && <span className="project-context"> · {project.context}</span>}
          </h3>
          <span className="project-year">{project.year}</span>
        </span>
        <span className="project-oneliner">
          {lang === "es" ? project.oneLinerEs : project.oneLiner}
        </span>
        <span className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
          {project.caseStudy ? (
            <span className="project-visit">{t.caseStudy}</span>
          ) : (
            href && (
              <span className="project-visit">
                {project.links?.site ? t.visit : t.source}
              </span>
            )
          )}
        </span>
      </span>
      {imgSrc && (
        <span className="project-thumb" aria-hidden="true">
          <img src={imgSrc} alt="" loading="lazy" />
        </span>
      )}
    </>
  );

  const style = {
    "--g1": g1,
    "--g2": g2,
    "--i": Math.min(index, 8),
  } as React.CSSProperties;

  return (
    <article className="project reveal" style={style}>
      {project.caseStudy ? (
        <Link className="project-surface" to={`/work/${project.slug}`}>
          {inner}
        </Link>
      ) : href ? (
        <a className="project-surface" href={href} target="_blank" rel="noreferrer">
          {inner}
        </a>
      ) : (
        <div className="project-surface">{inner}</div>
      )}
    </article>
  );
}
