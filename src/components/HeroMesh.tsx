import { useEffect, useRef } from "react";

/**
 * A relaxing quad grid — the thesis motif. Points start jittered and relax
 * toward a smooth surface (Laplacian smoothing) while a slow wave passes
 * through. Click to re-jitter. Plain 2D canvas, no three.js in the bundle.
 */
type Pt = { x: number; y: number; ox: number; oy: number };

const COLS = 30;
const ROWS = 16;

export function HeroMesh() {
  const ref = useRef<HTMLCanvasElement>(null);
  const ptsRef = useRef<Pt[]>([]);

  const seed = (w: number, h: number) => {
    const pts: Pt[] = [];
    const cw = w / (COLS - 1);
    const ch = h / (ROWS - 1);
    const jitter = Math.min(cw, ch) * 1.4;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const ox = c * cw;
        const oy = r * ch;
        const edge = r === 0 || c === 0 || r === ROWS - 1 || c === COLS - 1;
        pts.push({
          ox,
          oy,
          x: ox + (edge ? 0 : (Math.random() - 0.5) * jitter * 2),
          y: oy + (edge ? 0 : (Math.random() - 0.5) * jitter * 2),
        });
      }
    }
    ptsRef.current = pts;
  };

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let raf = 0;
    let t = 0;
    let color = "#888888";

    const readColor = () => {
      color = getComputedStyle(canvas).color || "#888888";
    };

    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.max(1, W * dpr);
      canvas.height = Math.max(1, H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed(W, H);
      readColor();
      if (reduced) {
        relax(40);
        draw();
      }
    };

    const relax = (iterations = 1) => {
      const pts = ptsRef.current;
      for (let n = 0; n < iterations; n++) {
        for (let r = 1; r < ROWS - 1; r++) {
          for (let c = 1; c < COLS - 1; c++) {
            const i = r * COLS + c;
            const p = pts[i];
            const nx =
              (pts[i - 1].x + pts[i + 1].x + pts[i - COLS].x + pts[i + COLS].x) / 4;
            const ny =
              (pts[i - 1].y + pts[i + 1].y + pts[i - COLS].y + pts[i + COLS].y) / 4;
            p.x += (nx - p.x) * 0.06;
            p.y += (ny - p.y) * 0.06;
          }
        }
      }
    };

    const draw = () => {
      const pts = ptsRef.current;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.16;
      ctx.lineWidth = 1;
      ctx.beginPath();
      const wave = (p: Pt) =>
        reduced ? 0 : Math.sin(p.ox * 0.015 + p.oy * 0.011 + t) * 5;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const p = pts[r * COLS + c];
          const y = p.y + wave(p);
          if (c === 0) ctx.moveTo(p.x, y);
          else ctx.lineTo(p.x, y);
        }
      }
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS; r++) {
          const p = pts[r * COLS + c];
          const y = p.y + wave(p);
          if (r === 0) ctx.moveTo(p.x, y);
          else ctx.lineTo(p.x, y);
        }
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      t += 0.008;
      relax();
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (!reduced) raf = requestAnimationFrame(loop);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const observer = new MutationObserver(readColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  const reseed = () => {
    const canvas = ref.current;
    if (canvas) seed(canvas.clientWidth, canvas.clientHeight);
  };

  return (
    <canvas
      ref={ref}
      className="hero-mesh"
      onClick={reseed}
      aria-hidden="true"
      title="Click to perturb the mesh"
    />
  );
}
