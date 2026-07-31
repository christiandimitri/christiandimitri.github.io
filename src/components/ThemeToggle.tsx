import { useEffect, useState } from "react";

type Mode = "light" | "dark" | "system";

function resolve(mode: Mode): "light" | "dark" {
  if (mode !== "system") return mode;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function stored(): Mode {
  const s = localStorage.getItem("theme");
  return s === "light" || s === "dark" ? s : "system";
}

const OPTIONS: { mode: Mode; label: string; icon: string }[] = [
  { mode: "system", label: "System theme", icon: "◐" },
  { mode: "light", label: "Light theme", icon: "○" },
  { mode: "dark", label: "Dark theme", icon: "●" },
];

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>(stored);

  useEffect(() => {
    document.documentElement.dataset.theme = resolve(mode);
    if (mode === "system") {
      localStorage.removeItem("theme");
      const mq = matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => {
        document.documentElement.dataset.theme = resolve("system");
      };
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      {OPTIONS.map((o) => (
        <button
          key={o.mode}
          type="button"
          aria-label={o.label}
          aria-pressed={mode === o.mode}
          className={mode === o.mode ? "is-active" : ""}
          onClick={() => setMode(o.mode)}
        >
          {o.icon}
        </button>
      ))}
    </div>
  );
}
