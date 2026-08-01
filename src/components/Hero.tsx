import { strings, type Lang } from "../data/site";
import { HeroMesh } from "./HeroMesh";

export function Hero({ lang = "en" }: { lang?: Lang }) {
  const t = strings[lang];
  const words = t.heroTitle.split(" ");
  return (
    <section className="hero wrap">
      <HeroMesh />
      <div className="hero-content">
        <h1 className="hero-title" aria-label={t.heroTitle}>
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
          {t.heroSub}
        </p>
        <p className="hero-now reveal is-visible" style={{ "--i": 7 } as React.CSSProperties}>
          {t.heroNow}
        </p>
      </div>
    </section>
  );
}
