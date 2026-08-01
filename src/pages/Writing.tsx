import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { posts, allPostTags, formatDate } from "../lib/posts";
import { usePageTitle } from "../lib/usePageTitle";
import { useReveal } from "../lib/useReveal";

export function Writing() {
  usePageTitle("Writing");
  const [tag, setTag] = useState<string | null>(null);

  const visible = useMemo(
    () => (tag ? posts.filter((p) => p.tags.includes(tag)) : posts),
    [tag],
  );

  const ref = useReveal<HTMLElement>([tag]);

  let lastYear = "";

  return (
    <section className="writing wrap" ref={ref}>
      <header className="page-header">
        <h1>Writing</h1>
        <p>
          Notes from the road between architecture and software — Grasshopper and C# in the
          early years, IFC, three.js and WASM lately. Kept in chronological order as a record
          of how the tools changed.
        </p>
      </header>
      <div className="tag-filter" role="group" aria-label="Filter by tag">
        {allPostTags.map((t) => (
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
      <div className="post-list">
        {visible.map((post, i) => {
          const year = post.date.slice(0, 4);
          const showYear = year !== lastYear;
          lastYear = year;
          return (
            <div key={post.slug} className="post-group">
              {showYear && <h2 className="post-year">{year}</h2>}
              <article className="post-row reveal" style={{ "--i": Math.min(i, 8) } as React.CSSProperties}>
                <Link to={`/writing/${post.slug}`} className="post-row-link">
                  <span className="post-row-date">
                    {formatDate(post.date)} · {post.minutes} min
                  </span>
                  <h3 className="post-row-title">{post.title}</h3>
                  <span className="post-row-summary">{post.summary}</span>
                </Link>
              </article>
            </div>
          );
        })}
      </div>
      {visible.length === 0 && tag && (
        <p className="projects-empty">Nothing tagged “{tag}” yet.</p>
      )}
    </section>
  );
}
