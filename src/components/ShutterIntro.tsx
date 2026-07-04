import { useEffect, useState } from "react";

/**
 * A cinematic camera-roll intro that plays once per session before the portfolio unfolds.
 */
export function ShutterIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.sessionStorage.getItem("shutter_played")) {
      setShow(false);
      return;
    }

    window.sessionStorage.setItem("shutter_played", "1");
    const t = window.setTimeout(() => setShow(false), 2600);
    return () => window.clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden bg-[#060606] text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,216,122,0.2),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_55%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute inset-x-0 top-0 h-1/2 bg-background shutter-top" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-background shutter-bot" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="relative flex flex-col items-center gap-6 text-center">
          <div className="camera-loader-shell iris-open">
            <div className="camera-loader-body">
              <div className="camera-top-plate" />
              <div className="camera-viewfinder" />
              <div className="camera-handle" />
              <div className="camera-film-path" />
              <div className="camera-reel camera-reel-left" />
              <div className="camera-reel camera-reel-right" />
              <div className="camera-lens">
                <div className="camera-lens-core" />
                <div className="camera-lens-ring" />
              </div>
              <div className="camera-record-dot" />
              <div className="camera-button camera-button-one" />
              <div className="camera-button camera-button-two" />
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-primary/80">
              Loading reel
            </p>
            <h1 className="font-signature text-4xl sm:text-5xl md:text-6xl tracking-[0.08em] text-gradient-gold">
              Favour Oyedeji
            </h1>
            <p className="max-w-sm text-sm sm:text-base text-muted-foreground">
              Rolling the camera, cueing the light, and opening the frame.
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full ${i === 1 ? "bg-primary" : "bg-primary/35"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
