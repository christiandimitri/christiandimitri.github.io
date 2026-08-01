import { site } from "../data/site";

export function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-links">
        <a href={site.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={site.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={site.cv} target="_blank" rel="noreferrer">
          CV
        </a>
        <a href={site.portfolio} target="_blank" rel="noreferrer">
          Portfolio (PDF)
        </a>
        <a href="/feed.xml">RSS</a>
      </div>
      <p className="footer-note">
        Built with React + TypeScript, deployed from{" "}
        <a
          href="https://github.com/christiandimitri/christiandimitri.github.io"
          target="_blank"
          rel="noreferrer"
        >
          this repo
        </a>
        . Gridshell photography © Andrés Flajszer.
      </p>
    </footer>
  );
}
