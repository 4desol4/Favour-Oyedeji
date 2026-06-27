import { useEffect, useState } from "react";

/**
 * Camera shutter intro: two letterbox bars close in then snap open,
 * with an aperture iris reveal. Plays once per session.
 */
export function ShutterIntro() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem("shutter_played")) { setShow(false); return; }
    sessionStorage.setItem("shutter_played", "1");
    const t = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-background shutter-top" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-background shutter-bot" />
      {/* center aperture */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-32 h-32 iris-open opacity-90">
          <svg viewBox="0 0 100 100" className="w-full h-full aperture-spin">
            {Array.from({ length: 8 }).map((_, i) => (
              <polygon
                key={i}
                points="50,50 78,28 88,55"
                fill="none"
                stroke="oklch(0.82 0.15 78)"
                strokeWidth="0.8"
                transform={`rotate(${i * 45} 50 50)`}
                opacity="0.85"
              />
            ))}
            <circle cx="50" cy="50" r="6" fill="none" stroke="oklch(0.82 0.15 78)" strokeWidth="1" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-widest text-primary">
            FAVOUR
          </div>
        </div>
      </div>
    </div>
  );
}
