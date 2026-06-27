import { useEffect, useRef, useState } from "react";

/**
 * Camera viewfinder cursor: animated focus brackets + HUD readouts
 * that track the mouse. Hides on touch devices.
 */
export function ViewfinderCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [touch, setTouch] = useState(false);
  const [tc, setTc] = useState("00:00:00:00");

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) { setTouch(true); return; }
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    let raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      const target = e.target as HTMLElement;
      setHover(!!target.closest("a, button, [role=button], .group, [data-hover]"));
    };
    const tick = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);

    const start = Date.now();
    const tcId = setInterval(() => {
      const ms = Date.now() - start;
      const s = Math.floor(ms / 1000);
      const f = Math.floor((ms % 1000) / 41.66);
      const hh = String(Math.floor(s / 3600)).padStart(2, "0");
      const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      setTc(`${hh}:${mm}:${ss}:${String(f).padStart(2, "0")}`);
    }, 80);

    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); clearInterval(tcId); };
  }, []);

  if (touch) return null;

  return (
    <>
      {/* center dot (fast) */}
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[100] w-1.5 h-1.5 rounded-full bg-primary mix-blend-difference" />
      {/* trailing focus reticle */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[100] transition-[width,height,opacity] duration-300 ${hover ? "w-24 h-24 opacity-100" : "w-10 h-10 opacity-80"}`}
      >
        <div className="relative w-full h-full">
          {/* 4 focus brackets */}
          {[
            "top-0 left-0 border-t border-l",
            "top-0 right-0 border-t border-r",
            "bottom-0 left-0 border-b border-l",
            "bottom-0 right-0 border-b border-r",
          ].map((c, i) => (
            <span key={i} className={`absolute w-3 h-3 border-primary ${c}`} />
          ))}
          {/* HUD readouts visible on hover */}
          {hover && (
            <>
              <span className="absolute -top-5 left-0 text-[9px] font-mono text-primary tracking-widest">f/1.4</span>
              <span className="absolute -top-5 right-0 text-[9px] font-mono text-primary tracking-widest">ISO 400</span>
              <span className="absolute -bottom-5 left-0 text-[9px] font-mono text-primary tracking-widest">24mm</span>
              <span className="absolute -bottom-5 right-0 text-[9px] font-mono text-primary tracking-widest">1/250</span>
            </>
          )}
        </div>
      </div>

      {/* Persistent HUD: REC + timecode */}
      <div className="pointer-events-none fixed top-20 right-6 z-40 hidden md:flex items-center gap-2 font-mono text-[10px] tracking-widest text-primary/80">
        <span className="rec-dot w-2 h-2 rounded-full bg-destructive inline-block" />
        <span className="text-destructive">REC</span>
        <span className="text-muted-foreground">{tc}</span>
      </div>
      <div className="pointer-events-none fixed bottom-6 left-6 z-40 hidden md:block font-mono text-[10px] tracking-widest text-muted-foreground/70">
        <span className="tick">●</span> CAM_01 · 4K · 24FPS
      </div>
    </>
  );
}
