import type { Project } from "../data/projects";

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [g1, g2] = project.gradient;
  const href = project.links?.site ?? project.links?.repo;

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
        <span className="project-oneliner">{project.oneLiner}</span>
        <span className="project-tags">
          {project.tags.map((t) => (
            <span key={t} className="project-tag">
              {t}
            </span>
          ))}
          {href && <span className="project-visit">{project.links?.site ? "visit ↗" : "source ↗"}</span>}
        </span>
      </span>
      {project.image && (
        <span className="project-thumb" aria-hidden="true">
          <img src={project.image} alt="" loading="lazy" />
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
      {href ? (
        <a className="project-surface" href={href} target="_blank" rel="noreferrer">
          {inner}
        </a>
      ) : (
        <div className="project-surface">{inner}</div>
      )}
    </article>
  );
}
