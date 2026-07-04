import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ToolIcon } from "@/components/ToolIcons";
import { ViewfinderCursor } from "@/components/ViewfinderCursor";
import { FocusFrame } from "@/components/FocusFrame";
import { TimelineHUD } from "@/components/TimelineHUD";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import heroBg from "@/assets/hero-bg.jpg";
import fav1Video from "@/assets/fav (3).mp4";
import fav2Video from "@/assets/fav (1).mp4";
import fav3Video from "@/assets/fav (2).mp4";
import fav1Image from "@/assets/fav (3).jpg";
import fav2Image from "@/assets/fav (7).jpg";
import fav3Image from "@/assets/fav (5).jpg";
import {
  Camera,
  Film,
  Play,
  Mail,
  Instagram,
  ArrowUpRight,
  MapPin,
  GraduationCap,
  Sparkles,
  Upload,
  Aperture,
} from "lucide-react";

type ProjectMedia =
  | { kind: "image"; src: string }
  | { kind: "video"; poster: string; src?: string };

type Project = {
  title: string;
  type: string;
  blurb: string;
  aspect: string;
  accent: string;
  scene: string;
  media: ProjectMedia;
};

const tools = ["CapCut", "Lightroom", "PicsArt", "AirBrush", "Canva", "InShot"];

const projects: Project[] = [
  {
    title: "Cinematic Birthday Film",
    type: "Video — Personal",
    blurb: "A warm, golden-hour celebration cut to music.",
    aspect: "aspect-[4/5]",
    accent: "from-amber-500/20 to-rose-500/10",
    scene: "SC_01",
    media: {
      kind: "video",
      poster: fav1Image,
      src: fav1Video,
    },
  },
  {
    title: "Furniture Co. Brand Story",
    type: "Video — Commercial",
    blurb: "Texture, craft, and detail. Slow push-ins on grain and light.",
    aspect: "aspect-video",
    accent: "from-amber-400/25 to-orange-600/10",
    scene: "SC_02",
    media: {
      kind: "video",
      poster: fav2Image,
      src: fav2Video,
    },
  },
  {
    title: "Cinematic Showreel",
    type: "Videography",
    blurb:
      "A seamless blend of visuals, motion, and storytelling through dynamic edits and cinematic transitions.",
    aspect: "aspect-video",
    accent: "from-yellow-400/20 to-amber-700/10",
    scene: "SC_03",
    media: {
      kind: "video",
      poster: fav3Image,
      src: fav3Video,
    },
  },
  {
    title: "Portrait Session",
    type: "Photography",
    blurb: "Soft natural light, editorial framing, warm grade.",
    aspect: "aspect-[3/4]",
    accent: "from-rose-400/20 to-amber-500/10",
    scene: "SC_04",
    media: {
      kind: "image",
      src: fav1Image,
    },
  },
  {
    title: "Street & Portrait",
    type: "Photography",
    blurb: "Bold perspectives. Authentic moments. Stories told through light and emotion.",
    aspect: "aspect-square",
    accent: "from-orange-400/20 to-yellow-500/10",
    scene: "SC_05",
    media: {
      kind: "image",
      src: fav2Image,
    },
  },
  {
    title: "Nature & Macro",
    type: "Photography",
    blurb: "Capturing the beauty of nature with vibrant detail, depth, and cinematic focus.",
    aspect: "aspect-[4/5]",
    accent: "from-amber-500/20 to-red-500/10",
    scene: "SC_06",
    media: {
      kind: "image",
      src: fav3Image,
    },
  },
];

const experience = [
  {
    year: "2024 — Now",
    role: "Freelance Video Editor & Photographer",
    place: "Ekiti, Nigeria",
    desc: "Shooting and editing cinematic films and photo sessions for individuals and brands.",
  },
  {
    year: "2023",
    role: "Cinematic Birthday Films",
    place: "Private Clients",
    desc: "Concept, shoot and edit of golden-hour celebration films.",
  },
  {
    year: "2023",
    role: "Furniture Company Brand Film",
    place: "Commercial",
    desc: "Directed and edited a brand story focused on craft and material.",
  },
  {
    year: "2022",
    role: "Conference Coverage",
    place: "Event",
    desc: "Multi-camera shoot and same-week highlight reel delivery.",
  },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <ViewfinderCursor />
      <ScrollProgress />
      <Nav />
      <Hero />
      <FilmStrip />
      <Marquee />
      <About />
      <Tools />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
      <TimelineHUD />
    </div>
  );
}

/* ============ SCROLL PROGRESS (film reel) ============ */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="fixed left-0 top-0 h-0.5 sm:h-1 bg-primary z-50 transition-[width] duration-100"
      style={{ width: `${p * 100}%` }}
    />
  );
}

/* ============ NAV ============ */
function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/50 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
        <a href="#top" className="group flex items-center gap-2 sm:gap-3 min-w-0" data-hover>
          <span className="relative grid place-items-center shrink-0">
            <span className="absolute inset-0 rounded-full bg-primary/30 blur-md group-hover:bg-primary/50 transition-colors" />
            <Aperture className="relative w-5 h-5 sm:w-6 sm:h-6 text-primary aperture-spin" />
          </span>
          <span className="font-signature text-lg sm:text-2xl leading-none tracking-[0.08em] truncate">
            <span className="text-gradient-gold font-normal">Favour</span>
            <span className="text-muted-foreground ml-1.5 hidden sm:inline">Oyedeji</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono tracking-widest uppercase text-muted-foreground">
          <a href="#about" className="hover:text-primary transition-colors" data-hover>
            01 · About
          </a>
          <a href="#work" className="hover:text-primary transition-colors" data-hover>
            02 · Work
          </a>
          <a href="#experience" className="hover:text-primary transition-colors" data-hover>
            03 · Reel
          </a>
          <a href="#contact" className="hover:text-primary transition-colors" data-hover>
            04 · Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="text-[10px] sm:text-xs font-mono uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity shrink-0"
          data-hover
        >
          Hire me
        </a>
      </div>
    </header>
  );
}

/* ============ HERO with parallax + letterbox ============ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] flex items-end pb-16 sm:pb-20 pt-28 sm:pt-32 px-5 sm:px-6 grain vignette overflow-hidden"
    >
      {/* Letterbox bars — cinematic 2.39:1 */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[4vh] sm:h-[6vh] md:h-[8vh] bg-background z-30 letterbox" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 h-[4vh] sm:h-[6vh] md:h-[8vh] bg-background z-30 letterbox-bot" />

      {/* Hero background image with ken-burns + cinematic overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={heroBg}
          alt=""
          aria-hidden
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover ken-burns"
          style={{ transform: `translateY(${y * 0.2}px) scale(1.08)` }}
        />
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
        <div className="absolute top-1/4 left-1/4 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      </div>

      {/* viewfinder corner brackets on the whole hero */}
      {[
        "top-20 sm:top-24 left-4 sm:left-6 border-t border-l",
        "top-20 sm:top-24 right-4 sm:right-6 border-t border-r",
        "bottom-4 sm:bottom-6 left-4 sm:left-6 border-b border-l",
        "bottom-4 sm:bottom-6 right-4 sm:right-6 border-b border-r",
      ].map((c, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 border-primary/40 ${c} dolly-in`}
        />
      ))}

      <div className="max-w-7xl mx-auto w-full relative">
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="dolly-in">
            <span className="chip">
              <span className="rec-dot w-1.5 h-1.5 rounded-full bg-destructive inline-block" /> Now
              Rolling — 2026 · Take 01
            </span>
          </div>

          <h1
            className="font-display text-[3rem] sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.9] dolly-in break-words"
            style={{ transform: `translateY(${y * -0.05}px)` }}
          >
            Cinematic <span className="italic text-gradient-gold">stories</span>,<br />
            framed in <span className="italic text-gradient-gold">light</span>.
          </h1>

          <div className="dolly-in" style={{ animationDelay: "1.5s" }}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-2 sm:mt-4">
              <p className="max-w-md text-muted-foreground text-base sm:text-lg leading-relaxed">
                I'm <span className="text-foreground">Favour</span> — a video editor and
                photographer turning ordinary moments into films you'll want to rewatch.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-primary text-primary-foreground text-sm sm:text-base font-medium hover-shake"
                  data-hover
                >
                  <Play className="w-4 h-4 fill-current" /> View reel
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-border text-sm sm:text-base hover:bg-surface transition-colors"
                  data-hover
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* side rulers (camera grid) */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 font-mono text-[9px] tracking-widest text-muted-foreground/50">
          {["+02", "+01", "00", "-01", "-02"].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <span className="w-3 h-px bg-muted-foreground/40" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ FILM STRIP divider ============ */
function FilmStrip() {
  return (
    <div className="relative overflow-hidden border-y border-border/40">
      <div className="filmstrip h-8 sm:h-10" />
    </div>
  );
}

/* ============ MARQUEE ============ */
function Marquee() {
  const items = [
    "Video Editing",
    "Photography",
    "Color Grading",
    "Cinematic Cuts",
    "Brand Films",
    "Event Coverage",
  ];
  const row = [...items, ...items];
  return (
    <div className="border-b border-border/40 py-4 sm:py-6 overflow-hidden bg-surface/30">
      <div className="flex marquee-track gap-8 sm:gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-8 sm:gap-12 font-display text-2xl sm:text-4xl md:text-5xl text-muted-foreground"
          >
            <span className="italic">{t}</span>
            <span className="text-primary">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ ABOUT ============ */
function About() {
  return (
    <section id="about" className="py-20 sm:py-28 md:py-32 px-5 sm:px-6 relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 md:gap-12 items-start">
        <Reveal className="md:col-span-4">
          <span className="chip mb-6">
            <Sparkles className="w-3 h-3" /> 01 · About
          </span>
          <FocusFrame className="rounded-3xl">
            <div className="relative aspect-[3/4] w-full">
              <img
                src="src/assets/Favour.jpg"
                alt="A portrait of Favour Oyedeji"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </FocusFrame>
        </Reveal>
        <Reveal delay={200} className="md:col-span-8 space-y-5 sm:space-y-6">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
            A storyteller behind the <span className="italic text-gradient-gold">lens</span> and the{" "}
            <span className="italic text-gradient-gold">timeline</span>.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            I'm <span className="text-foreground">Oyedeji Favour Oluwatobi</span> — a 300 level
            Computer Science Education student at{" "}
            <span className="text-foreground">Ekiti State University</span>. I shoot photos, direct
            shoots, and edit films that feel warm, intentional and a little cinematic.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            From birthday films to brand stories for furniture studios and conference recaps — I
            love finding the story inside a moment and giving it rhythm.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-border/50">
            <Stat icon={<MapPin className="w-4 h-4" />} label="Based in" value="Ekiti, Nigeria" />
            <Stat
              icon={<GraduationCap className="w-4 h-4" />}
              label="Studying"
              value="CS Education"
            />
            <Stat icon={<Film className="w-4 h-4" />} label="Specialty" value="Cinematic Edits" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
        <span className="shrink-0">{icon}</span> <span className="truncate">{label}</span>
      </div>
      <div className="font-display text-xl sm:text-2xl">{value}</div>
    </div>
  );
}

/* ============ TOOLS ============ */
function Tools() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-6 border-y border-border/40 bg-surface/20 relative overflow-hidden">
      {/* aperture watermark */}
      <Aperture className="absolute -right-24 -top-24 sm:-right-32 sm:-top-32 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] text-primary/[0.03] aperture-spin pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <Reveal>
          <div className="flex items-end justify-between mb-10 sm:mb-12 flex-wrap gap-4">
            <div>
              <span className="chip mb-3">
                <Sparkles className="w-3 h-3" /> Toolkit
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl">
                The <span className="italic text-gradient-gold">toolkit</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm sm:text-base">
              The apps I reach for to shape color, rhythm and feel.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {tools.map((t, i) => (
            <Reveal key={t} delay={i * 80}>
              <div
                className="group relative aspect-square rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-500 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden hover-shake"
                data-hover
                title={t}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500" />
                <ToolIcon
                  name={t}
                  className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 relative transition-transform duration-500 group-hover:scale-110 [&>svg]:w-full [&>svg]:h-full"
                />
                <span className="absolute bottom-2 sm:bottom-4 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-muted-foreground opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                  {t}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ PROJECTS ============ */
function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  return (
    <section id="work" className="py-20 sm:py-28 md:py-32 px-5 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-12 sm:mb-16 flex-wrap gap-4">
            <div>
              <span className="chip mb-4">
                <Film className="w-3 h-3" /> 02 · Selected Work
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-none">
                Recent <span className="italic text-gradient-gold">frames</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm font-mono text-[10px] sm:text-xs tracking-widest uppercase">
              06 scenes · 2022 — 2024
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 120}>
              <button
                type="button"
                className="group w-full text-left"
                onClick={() => openProject(p)}
                aria-label={`View ${p.title}`}
              >
                <article className="group" data-hover>
                  <FocusFrame
                    className={`relative overflow-hidden rounded-2xl border border-border bg-card ${p.aspect}`}
                  >
                    {p.media.kind === "video" && (
                      <span className="absolute top-3 right-3 z-10 rounded-full bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground border border-border">
                        Video
                      </span>
                    )}
                    <div className="absolute inset-0">
                      {p.media.kind === "video" && p.media.src ? (
                        <video
                          className="absolute inset-0 h-full w-full object-cover"
                          poster={p.media.poster}
                          src={p.media.src}
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={p.media.kind === "image" ? p.media.src : p.media.poster}
                          alt={p.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />
                    {/* scene marker */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-2 z-10">
                      <span className="chip backdrop-blur-md bg-background/60">
                        {p.type.startsWith("Video") && (
                          <span className="rec-dot w-1.5 h-1.5 rounded-full bg-destructive inline-block" />
                        )}
                        {p.scene}
                      </span>
                    </div>
                    {/* timecode bottom-left */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 font-mono text-[9px] tracking-widest text-foreground/70 z-10">
                      00:00:{String(10 + i * 7).padStart(2, "0")}:14
                    </div>
                    {/* play icon */}
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-500 z-10">
                      {p.type.startsWith("Video") ? (
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>
                  </FocusFrame>
                  <div className="pt-4 sm:pt-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-display text-xl sm:text-2xl group-hover:text-gradient-gold transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{p.blurb}</p>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground shrink-0 mt-1">
                      {p.type.split(" — ")[0]}
                    </span>
                  </div>
                </article>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setSelectedProject(null);
        }}
      >
        <DialogContent className="max-w-[min(100vw-2rem,900px)] w-full max-h-[85vh] p-0 sm:rounded-2xl overflow-hidden bg-transparent">
          {selectedProject && (
            <div className="relative bg-background overflow-hidden shadow-2xl rounded-none sm:rounded-2xl">
              <div className="bg-black">
                {selectedProject.media.kind === "video" ? (
                  <video
                    className="w-full max-h-[55vh] sm:max-h-[65vh] lg:max-h-[70vh] object-contain"
                    controls
                    autoPlay
                    playsInline
                    src={selectedProject.media.src}
                    poster={selectedProject.media.poster}
                  />
                ) : (
                  <img
                    src={selectedProject.media.src}
                    alt={selectedProject.title}
                    className="w-full max-h-[55vh] sm:max-h-[65vh] lg:max-h-[70vh] object-contain"
                  />
                )}
              </div>
              <div className="px-4 py-5 sm:px-6 sm:py-6">
                <h2 className="font-display text-2xl sm:text-3xl mb-3">{selectedProject.title}</h2>
                <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground mb-4">
                  {selectedProject.type}
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {selectedProject.blurb}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ============ EXPERIENCE ============ */
function Experience() {
  return (
    <section
      id="experience"
      className="py-20 sm:py-28 md:py-32 px-5 sm:px-6 border-t border-border/40 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 md:gap-12">
        <Reveal className="md:col-span-4">
          <span className="chip mb-4">
            <Camera className="w-3 h-3" /> 03 · Reel
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-none">
            Work <span className="italic text-gradient-gold">history</span>
          </h2>
          <p className="text-muted-foreground mt-5 sm:mt-6 max-w-xs">
            A short reel of projects shot, edited and delivered.
          </p>
        </Reveal>
        <div className="md:col-span-8">
          <ol className="relative border-l-2 border-dashed border-border/70 ml-2 sm:ml-3">
            {experience.map((e, i) => (
              <Reveal key={i} delay={i * 100}>
                <li className="pl-6 sm:pl-8 pb-10 sm:pb-12 relative group" data-hover>
                  <span className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-background ring-2 ring-primary flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary rec-dot" />
                  </span>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2">
                    {e.year}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl group-hover:translate-x-1 transition-transform duration-500">
                    {e.role}
                  </h3>
                  <div className="text-sm text-muted-foreground mt-1">{e.place}</div>
                  <p className="text-muted-foreground mt-2 sm:mt-3 max-w-xl leading-relaxed text-sm sm:text-base">
                    {e.desc}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ============ CONTACT ============ */
function Contact() {
  return (
    <section
      id="contact"
      className="py-20 sm:py-28 md:py-32 px-5 sm:px-6 grain vignette relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center relative">
        {/* big aperture behind */}
        <Aperture className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] text-primary/[0.04] aperture-spin pointer-events-none" />
        <Reveal>
          <span className="chip mb-6">
            <Mail className="w-3 h-3" /> 04 · Let's create
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95]">
            Have a moment worth <span className="italic text-gradient-gold">filming</span>?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-6 sm:mt-8 max-w-xl mx-auto">
            Birthday films, brand stories, conferences, portraits — let's make something you'll
            watch again.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://www.instagram.com/gods_favourite260?igsh=NW96dGZmeHBxbmti"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-medium text-xs sm:text-base md:text-lg hover:opacity-90 transition-opacity hover-shake"
              data-hover
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />{" "}
              <span className="truncate">Instagram</span>
            </a>
            <a
              href="https://www.tiktok.com/@bami_edits2?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-border text-sm sm:text-base hover:bg-surface transition-colors"
              data-hover
            >
              <Play className="w-5 h-5" /> TikTok
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer className="px-4 pb-24 pt-8 sm:px-6 sm:pb-28 sm:pt-10 lg:pb-32">
      <div className="mx-auto max-w-7xl rounded-[1.6rem] border border-border/60 bg-gradient-to-br from-background/90 via-background/80 to-background/90 px-5 py-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:px-7 sm:py-7 lg:px-8 lg:py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
          <div className="flex items-center gap-3 font-display text-xl text-foreground sm:text-2xl lg:text-[1.75rem]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 sm:h-11 sm:w-11">
              <Aperture className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
            </div>
            <div className="leading-none">
              <p className="block font-signature text-xl sm:text-2xl text-gradient-gold tracking-[0.08em]">
                Favour <span className="text-muted-foreground">Oyedeji</span>{" "}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 font-[Rajdhani] text-[10px] uppercase tracking-[0.28em] sm:justify-end sm:gap-3 sm:text-[11px]">
            <span className="rounded-full border border-border/60 bg-background/70 px-3 py-1.5">
              © {new Date().getFullYear()} · End of reel
            </span>
            <span className="hidden text-border/70 sm:inline">•</span>
            <span className="rounded-full border border-border/60 bg-background/70 px-3 py-1.5">
              Made by{" "}
              <a
                href="https://github.com/4desol4"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-foreground transition-colors hover:text-primary"
              >
                4desol4
              </a>
            </span>
            <span className="hidden text-border/70 sm:inline">•</span>
            <span className="rounded-full border border-border/60 bg-background/70 px-3 py-1.5">
              Ekiti · Nigeria
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============ UPLOAD SLOT ============ */
function UploadSlot({
  label,
  className = "",
  subtle = false,
}: {
  label: string;
  className?: string;
  subtle?: boolean;
}) {
  return (
    <div
      className={`group flex items-center justify-center border border-dashed ${subtle ? "border-foreground/20 hover:border-primary/60" : "border-border hover:border-primary/60"} bg-surface/30 hover:bg-surface/60 transition-all cursor-pointer ${className}`}
      data-hover
    >
      <div className="text-center px-4 sm:px-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-background/60 border border-border flex items-center justify-center mb-2 sm:mb-3 group-hover:border-primary/60 transition-colors float-slow">
          <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
        <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60 mt-1">
          Drop · jpg · mp4
        </div>
      </div>
    </div>
  );
}
