import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/usePageTitle";

export function NotFound() {
  usePageTitle("Not found");
  return (
    <section className="notfound wrap">
      <h1>404</h1>
      <p>This page doesn’t exist — or it lived on the old Jekyll site and didn’t make the move.</p>
      <p>
        <Link to="/">Back to the homepage</Link>
      </p>
    </section>
  );
}
