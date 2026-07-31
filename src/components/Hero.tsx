import { site } from "../data/site";
import { HeroMesh } from "./HeroMesh";

export function Hero() {
  const words = site.heroTitle.split(" ");
  return (
    <section className="hero wrap">
      <HeroMesh />
      <div className="hero-content">
        <h1 className="hero-title" aria-label={site.heroTitle}>
          {words.map((w, i) => (
            <span
              key={i}
              className="hero-word"
              style={{ "--i": i } as React.CSSProperties}
            >
              {w}
            </span>
          ))}
        </h1>
        <p className="hero-sub reveal is-visible" style={{ "--i": 5 } as React.CSSProperties}>
          {site.heroSub}
        </p>
        <p className="hero-now reveal is-visible" style={{ "--i": 7 } as React.CSSProperties}>
          {site.heroNow}
        </p>
      </div>
    </section>
  );
}
