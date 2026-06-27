import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Play, Pause } from "lucide-react";

/**
 * Fixed bottom timeline HUD (video editor style).
 * Responsive: compact bar on mobile, full timeline on desktop.
 * Collapsible. Clips are clickable scroll targets.
 */
const CLIPS = [
  { id: "about", label: "ABOUT", scene: "SC_01", left: 0, width: 22, tone: "primary" },
  { id: "work", label: "WORK", scene: "SC_02", left: 23, width: 30, tone: "accent" },
  { id: "experience", label: "REEL", scene: "SC_03", left: 54, width: 22, tone: "primary" },
  { id: "contact", label: "CONTACT", scene: "SC_04", left: 77, width: 23, tone: "accent" },
] as const;

export function TimelineHUD() {
  const [progress, setProgress] = useState(0);
  const [tc, setTc] = useState("00:00:00:00");
  const [open, setOpen] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [hoverClip, setHoverClip] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const totalFrames = Math.floor(elapsed * 24);
      const ff = totalFrames % 24;
      const totalSec = Math.floor(elapsed);
      const ss = totalSec % 60;
      const mm = Math.floor(totalSec / 60) % 60;
      const hh = Math.floor(totalSec / 3600);
      const p = (n: number) => String(n).padStart(2, "0");
      setTc(`${p(hh)}:${p(mm)}:${p(ss)}:${p(ff)}`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const ticks = Array.from({ length: 60 });
  const bars = Array.from({ length: 80 }, (_, i) => 18 + Math.abs(Math.sin(i * 1.7) * 60) + Math.abs(Math.cos(i * 0.6) * 22));
  const playheadPct = progress * 100;

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed left-0 right-0 bottom-0 z-40 pointer-events-none print:hidden">
      {/* fade above HUD */}
      <div className="h-6 sm:h-10 bg-gradient-to-t from-background to-transparent" />

      <div className="bg-background/90 backdrop-blur-xl border-t border-primary/20 pointer-events-auto shadow-[0_-10px_40px_-12px_rgba(0,0,0,0.6)]">
        {/* Top status bar — always visible, scales down on mobile */}
        <div className="flex items-center justify-between gap-2 px-3 sm:px-6 py-1.5 sm:py-2 border-b border-border/40 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-muted-foreground">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 overflow-hidden">
            <span className="flex items-center gap-1.5 text-foreground shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive rec-dot inline-block" />
              REC
            </span>
            <span className="shrink-0">CAM_01</span>
            <span className="text-primary shrink-0">4K</span>
            <span className="hidden sm:inline shrink-0">24 FPS</span>
            <span className="hidden xl:inline shrink-0">ISO 400</span>
            <span className="hidden xl:inline shrink-0">f/1.8</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <span className="hidden sm:inline">TC</span>
            <span className="text-foreground tabular-nums">{tc}</span>
            <span className="text-primary tabular-nums hidden sm:inline">{(progress * 100).toFixed(1)}%</span>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause timeline" : "Play timeline"}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/15 hover:bg-primary/30 border border-primary/40 grid place-items-center text-primary transition-all hover:scale-110 active:scale-95"
              data-hover
            >
              {playing ? <Pause className="w-2.5 h-2.5 fill-current" /> : <Play className="w-2.5 h-2.5 fill-current ml-px" />}
            </button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Collapse timeline" : "Expand timeline"}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-surface hover:bg-primary/20 border border-border hover:border-primary/40 grid place-items-center text-muted-foreground hover:text-primary transition-all hover:scale-110 active:scale-95"
              data-hover
            >
              {open ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Collapsible body */}
        <div
          className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            {/* Timeline ruler */}
            <div className="relative h-3 sm:h-4 border-b border-border/30 overflow-hidden">
              <div className="absolute inset-0 flex items-end">
                {ticks.map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 ${i % 5 === 0 ? "h-2 sm:h-2.5 bg-muted-foreground/60" : "h-1 bg-muted-foreground/25"}`}
                    style={{ marginRight: 1 }}
                  />
                ))}
              </div>
            </div>

            {/* Tracks */}
            <div className="relative px-2 sm:px-3 py-2 space-y-1 sm:space-y-1.5">
              {/* V1 — interactive clips */}
              <Track label="V1">
                {CLIPS.map((c) => {
                  const isHover = hoverClip === c.id;
                  const grad =
                    c.tone === "primary"
                      ? "from-primary/80 to-primary/40 border-primary/70"
                      : "from-accent/70 to-accent/30 border-accent/60";
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => jumpTo(c.id)}
                      onMouseEnter={() => setHoverClip(c.id)}
                      onMouseLeave={() => setHoverClip(null)}
                      title={`Jump to ${c.label}`}
                      aria-label={`Jump to ${c.label} section`}
                      className={`group absolute inset-y-0 rounded bg-gradient-to-r ${grad} border transition-all duration-300 ease-out overflow-hidden cursor-pointer
                        ${isHover ? "scale-y-110 z-10 shadow-[0_0_20px_rgba(0,0,0,0.4)] brightness-125" : "hover:brightness-110"}`}
                      style={{ left: `${c.left}%`, width: `${c.width}%` }}
                      data-hover
                    >
                      {/* sweep on hover */}
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
                      {/* label */}
                      <span className="absolute inset-0 flex items-center justify-center px-1 font-mono text-[8px] sm:text-[9px] tracking-widest uppercase text-foreground/90 truncate">
                        <span className="hidden sm:inline mr-1 opacity-60">{c.scene}</span>
                        <span className="truncate">{c.label}</span>
                      </span>
                    </button>
                  );
                })}
              </Track>

              {/* A1 — waveform */}
              <Track label="A1">
                <div className="absolute inset-0 flex items-center gap-[1px] sm:gap-[2px] px-1">
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary/60 rounded-[1px] waveform-bar"
                      style={{
                        height: `${Math.min(100, h)}%`,
                        animationDelay: `${(i % 12) * 0.08}s`,
                        animationPlayState: playing ? "running" : "paused",
                      }}
                    />
                  ))}
                </div>
              </Track>
            </div>
          </div>
        </div>

        {/* Playhead — spans whatever is visible */}
        <div
          className="absolute top-7 sm:top-9 bottom-0 w-px bg-primary pointer-events-none transition-[left] duration-100"
          style={{ left: `${playheadPct}%`, boxShadow: "0 0 8px var(--primary)" }}
        >
          <div className="absolute -top-1 -left-[5px] w-[11px] h-2 bg-primary clip-playhead" />
        </div>
      </div>
    </div>
  );
}

function Track({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-stretch gap-1.5 sm:gap-2 h-6 sm:h-7">
      <div className="w-7 sm:w-8 shrink-0 flex items-center justify-center rounded bg-surface/80 border border-border/60 font-mono text-[8px] sm:text-[9px] tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="relative flex-1 rounded bg-surface/40 border border-border/40 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
