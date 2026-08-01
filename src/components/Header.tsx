import { NavLink, Link, useLocation } from "react-router-dom";
import { Monogram } from "./Monogram";
import { ThemeToggle } from "./ThemeToggle";
import { site, strings, type Lang } from "../data/site";

export function Header() {
  const { pathname } = useLocation();
  const lang: Lang = pathname === "/es" ? "es" : "en";
  const t = strings[lang];

  const links = [
    { to: lang === "es" ? "/es" : "/", label: t.nav.work, end: true },
    { to: "/writing", label: t.nav.writing, end: false },
    { to: "/about", label: t.nav.about, end: false },
  ];

  return (
    <header className="header wrap">
      <Link to={lang === "es" ? "/es" : "/"} className="header-identity" aria-label="Home">
        <Monogram />
        <span className="header-name">
          {site.name}
          <em>{t.tagline}</em>
        </span>
      </Link>
      <nav className="header-nav" aria-label="Main">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => (isActive ? "is-active" : "")}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="header-actions">
        <Link
          to={lang === "es" ? "/" : "/es"}
          className="lang-switch"
          aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
        >
          {lang === "es" ? "EN" : "ES"}
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
