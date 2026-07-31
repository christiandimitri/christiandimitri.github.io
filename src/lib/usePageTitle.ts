import { useEffect } from "react";

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} — Christian Dimitri`
      : "Christian Dimitri — Architect turned software engineer";
  }, [title]);
}
