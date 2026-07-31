import { Link } from "react-router-dom";
import { posts, formatDate } from "../lib/posts";
import { usePageTitle } from "../lib/usePageTitle";
import { useReveal } from "../lib/useReveal";

export function Writing() {
  usePageTitle("Writing");
  const ref = useReveal<HTMLElement>();

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
      <div className="post-list">
        {posts.map((post, i) => {
          const year = post.date.slice(0, 4);
          const showYear = year !== lastYear;
          lastYear = year;
          return (
            <div key={post.slug} className="post-group">
              {showYear && <h2 className="post-year">{year}</h2>}
              <article className="post-row reveal" style={{ "--i": Math.min(i, 8) } as React.CSSProperties}>
                <Link to={`/writing/${post.slug}`} className="post-row-link">
                  <span className="post-row-date">{formatDate(post.date)}</span>
                  <h3 className="post-row-title">{post.title}</h3>
                  <span className="post-row-summary">{post.summary}</span>
                </Link>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
