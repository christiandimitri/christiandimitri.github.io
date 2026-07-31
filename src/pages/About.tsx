import { timeline, publications, languages, award } from "../data/timeline";
import { site } from "../data/site";
import { usePageTitle } from "../lib/usePageTitle";
import { useReveal } from "../lib/useReveal";
import headshot from "../assets/headshot.jpg";

export function About() {
  usePageTitle("About");
  const ref = useReveal<HTMLElement>();

  return (
    <section className="about wrap" ref={ref}>
      <header className="page-header">
        <h1>About</h1>
      </header>
      <div className="about-grid">
        <aside className="about-aside reveal">
          <img src={headshot} alt="Christian Dimitri" className="about-photo" width={280} height={280} />
          <dl className="about-facts">
            <dt>Based in</dt>
            <dd>Barcelona, Spain</dd>
            <dt>Working on</dt>
            <dd>BIM &amp; CAD software for the web</dd>
            <dt>Languages</dt>
            <dd>{languages.map((l) => `${l.name} (${l.level})`).join(", ")}</dd>
            <dt>Documents</dt>
            <dd>
              <a href={site.cv} target="_blank" rel="noreferrer">
                CV
              </a>{" "}
              ·{" "}
              <a href={site.portfolio} target="_blank" rel="noreferrer">
                Architecture portfolio
              </a>
            </dd>
            <dt>Elsewhere</dt>
            <dd>
              <a href={site.github} target="_blank" rel="noreferrer">
                GitHub
              </a>{" "}
              ·{" "}
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </dd>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </dl>
        </aside>
        <div className="about-main">
          <p className="about-lede reveal">
            I&rsquo;m a Lebanese architect who moved to Barcelona to study parametric design
            and never really left the code editor after that. These days I build the software
            that architecture and construction run on: IFC viewers, DXF editors, CAD plugins,
            geometry engines, and lately AI agents for the built environment.
          </p>
          <ol className="timeline">
            {timeline.map((entry, i) => (
              <li key={entry.period} className="timeline-entry reveal" style={{ "--i": Math.min(i, 8) } as React.CSSProperties}>
                <span className="timeline-period">{entry.period}</span>
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <section className="about-publications reveal">
            <h2>Publications</h2>
            <ul>
              {publications.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <h2>Award</h2>
            <ul>
              <li>{award}</li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
