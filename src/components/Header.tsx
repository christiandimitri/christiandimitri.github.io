import { NavLink, Link } from "react-router-dom";
import { Monogram } from "./Monogram";
import { ThemeToggle } from "./ThemeToggle";
import { site } from "../data/site";

const links = [
  { to: "/", label: "Work" },
  { to: "/writing", label: "Writing" },
  { to: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="header wrap">
      <Link to="/" className="header-identity" aria-label="Home">
        <Monogram />
        <span className="header-name">
          {site.name}
          <em>{site.tagline}</em>
        </span>
      </Link>
      <nav className="header-nav" aria-label="Main">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            className={({ isActive }) => (isActive ? "is-active" : "")}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  );
}
