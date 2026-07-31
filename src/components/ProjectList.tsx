import { useMemo, useState } from "react";
import { projects, allTags } from "../data/projects";
import { ProjectRow } from "./ProjectRow";
import { useReveal } from "../lib/useReveal";

export function ProjectList() {
  const [view, setView] = useState<"selected" | "all">("selected");
  const [tag, setTag] = useState<string | null>(null);
  const [tagsOpen, setTagsOpen] = useState(false);

  const visible = useMemo(() => {
    let list = projects;
    if (tag) list = list.filter((p) => p.tags.includes(tag));
    else if (view === "selected") list = list.filter((p) => p.selected);
    return list;
  }, [view, tag]);

  const ref = useReveal<HTMLElement>([view, tag]);

  return (
    <section className="projects wrap" ref={ref} id="work">
      <div className="projects-filters">
        <div className="segmented" role="group" aria-label="Project scope">
          <button
            type="button"
            className={!tag && view === "selected" ? "is-active" : ""}
            onClick={() => {
              setView("selected");
              setTag(null);
            }}
          >
            Selected work
          </button>
          <button
            type="button"
            className={!tag && view === "all" ? "is-active" : ""}
            onClick={() => {
              setView("all");
              setTag(null);
            }}
          >
            Everything
          </button>
        </div>
        <button
          type="button"
          className={`tags-disclosure ${tagsOpen || tag ? "is-open" : ""}`}
          aria-expanded={tagsOpen}
          onClick={() => setTagsOpen((o) => !o)}
        >
          Tags{tag ? `: ${tag}` : ""}
        </button>
      </div>
      {tagsOpen && (
        <div className="tag-filter" role="group" aria-label="Filter by tag">
          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              className={`tag-pill ${tag === t ? "is-active" : ""}`}
              onClick={() => setTag(tag === t ? null : t)}
            >
              {t}
            </button>
          ))}
        </div>
      )}
      <div className="project-list">
        {visible.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} />
        ))}
      </div>
      {visible.length === 0 && <p className="projects-empty">Nothing tagged “{tag}” yet.</p>}
    </section>
  );
}
