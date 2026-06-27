import type { ReactNode } from "react";

/**
 * Wraps a card with animated focus brackets that snap in on hover —
 * mimics autofocus locking on a subject.
 */
export function FocusFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative group overflow-hidden ${className}`} data-hover>
      {children}
      {/* corner brackets */}
      {[
        "top-2 left-2 border-t-2 border-l-2",
        "top-2 right-2 border-t-2 border-r-2",
        "bottom-2 left-2 border-b-2 border-l-2",
        "bottom-2 right-2 border-b-2 border-r-2",
      ].map((c, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute w-4 h-4 sm:w-5 sm:h-5 border-primary opacity-60 md:opacity-0 scale-100 md:scale-125 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 ${c}`}
        />
      ))}
      {/* focus lock label */}
      <span className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-sm bg-primary/90 text-primary-foreground text-[9px] font-mono tracking-widest opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-150">
        AF LOCK
      </span>
    </div>
  );
}
