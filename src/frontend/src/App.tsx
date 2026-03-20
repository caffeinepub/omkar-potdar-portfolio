import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ChevronDown,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─── Types ────────────────────────────────────────────────────────────── */

type Category = "All" | "Brand Campaigns" | "Content Series" | "Music";

interface Project {
  id: number;
  title: string;
  client: string;
  youtubeId: string;
  description: string;
  role: string;
  category: Exclude<Category, "All">;
}

/* ─── Data ─────────────────────────────────────────────────────────────── */

const projects: Project[] = [
  {
    id: 1,
    title: "Story of Progress",
    client: "Audi",
    youtubeId: "W5ZINnGg8j4",
    description: "Brand narrative exploring innovation and heritage",
    role: "Creative Direction & Production",
    category: "Brand Campaigns",
  },
  {
    id: 2,
    title: "Ionic 5 Launch",
    client: "Hyundai",
    youtubeId: "CV6dIFQJJZU",
    description: "Product launch film for electric vehicle debut",
    role: "Director & Creative Strategy",
    category: "Brand Campaigns",
  },
  {
    id: 3,
    title: "Dating These Nights",
    client: "Bumble",
    youtubeId: "1NEUQLRCsmU",
    description: "Conversation series exploring modern relationships",
    role: "Creative Strategy & Direction",
    category: "Content Series",
  },
  {
    id: 4,
    title: "Spotify Campaign",
    client: "Spotify",
    youtubeId: "HzM59DoQXNk",
    description: "Music streaming brand storytelling",
    role: "Creative Direction",
    category: "Brand Campaigns",
  },
  {
    id: 5,
    title: "Netflix Brand Film",
    client: "Netflix",
    youtubeId: "IYi-bD0Wi7k",
    description: "Entertainment platform brand narrative",
    role: "Director & Producer",
    category: "Brand Campaigns",
  },
  {
    id: 6,
    title: "Buzz Off",
    client: "Cred",
    youtubeId: "Xnky6nLpY_Q",
    description: "Original content series for fintech brand",
    role: "Creative Direction & Strategy",
    category: "Content Series",
  },
  {
    id: 7,
    title: "Red Bull Campaign",
    client: "Red Bull",
    youtubeId: "-1Owu_Qtk50",
    description: "Energy brand storytelling and culture",
    role: "Director & Producer",
    category: "Brand Campaigns",
  },
  {
    id: 8,
    title: "My Two Cents",
    client: "Cred",
    youtubeId: "hutqYMwHEq0",
    description: "Financial literacy content series",
    role: "Creative Strategy & Direction",
    category: "Content Series",
  },
  {
    id: 9,
    title: "Kingfisher Campaign",
    client: "Kingfisher",
    youtubeId: "SbuVWqT_NE8",
    description: "Beverage brand film",
    role: "Creative Direction",
    category: "Brand Campaigns",
  },
  {
    id: 10,
    title: "Supertails Launch",
    client: "Supertails",
    youtubeId: "IYoePOvlp9o",
    description: "Pet care brand campaign film",
    role: "Director & Creative Strategy",
    category: "Brand Campaigns",
  },
  {
    id: 11,
    title: "Ugaoo Campaign",
    client: "Ugaoo",
    youtubeId: "VqvHjxYrW0E",
    description: "Plant brand storytelling",
    role: "Director & Producer",
    category: "Brand Campaigns",
  },
  {
    id: 12,
    title: "Fabric of India",
    client: "Technosport",
    youtubeId: "E6bDicfmARs",
    description:
      "Republic Day campaign celebrating movement and unity through dance",
    role: "Director, Producer & Editor",
    category: "Brand Campaigns",
  },
  {
    id: 13,
    title: "Whatever (Official Music Video)",
    client: "Artist: Hasan",
    youtubeId: "h3psWXt7VEc",
    description: "Original music video",
    role: "Director & Creative",
    category: "Music",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Brand Campaigns",
  "Content Series",
  "Music",
];

/* ─── useReveal ─────────────────────────────────────────────────────────── */

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref as React.RefObject<HTMLElement>;
}

/* ─── Navigation ────────────────────────────────────────────────────────── */

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const close = useCallback(() => setMenuOpen(false), []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,border-color,box-shadow] duration-300 ${
        scrolled ? "nav-glass shadow-xs" : "bg-transparent border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="font-display font-black text-2xl tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          aria-label="Omkar Potdar — home"
        >
          <span className="text-foreground">O</span>
          <span className="text-accent">P</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-ocid="nav.link"
                className="font-body text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-[color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          data-ocid="nav.button"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-2 -mr-2 text-foreground rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden nav-glass border-t border-border px-6 py-6">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid="nav.link"
                  onClick={close}
                  className="font-display text-2xl font-bold text-foreground hover:text-accent transition-[color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

/* ─── Hero Section ──────────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 60%, oklch(0.94 0.02 40 / 0.25) 0%, transparent 70%)",
        }}
      />

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.12 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.12 0 0) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Pre-title tag */}
        <p className="hero-animate-1 font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
          Creative Director
        </p>

        {/* Name */}
        <h1 className="hero-animate-2 font-display font-black leading-[0.9] tracking-tight text-foreground">
          <span className="block text-[clamp(3.5rem,12vw,8rem)]">Omkar</span>
          <span className="block text-[clamp(3.5rem,12vw,8rem)]">Potdar</span>
        </h1>

        {/* Tagline */}
        <p className="hero-animate-3 mt-8 max-w-2xl mx-auto font-body text-[clamp(1.05rem,2.5vw,1.375rem)] leading-relaxed font-light text-muted-foreground">
          "I turn brand strategy into{" "}
          <em className="not-italic font-medium text-accent">
            work people care about
          </em>
          ."
        </p>

        {/* CTA row */}
        <div className="hero-animate-4 mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-none hover:bg-accent hover:text-accent-foreground transition-[background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-foreground text-foreground font-body font-semibold text-sm tracking-wide rounded-none hover:bg-foreground hover:text-primary-foreground transition-[background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        aria-hidden="true"
      >
        <span className="font-body text-[10px] tracking-[0.25em] uppercase">
          Scroll
        </span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}

/* ─── About Section ─────────────────────────────────────────────────────── */

const skills = [
  "Creative Direction",
  "Brand Strategy",
  "Visual Storytelling",
  "Team Leadership",
  "Production & Execution",
  "Cultural Translation",
];

function AboutSection() {
  const titleRef = useReveal();
  const bioRef = useReveal();
  const skillsRef = useReveal();

  return (
    <section id="about" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section label */}
      <div
        ref={titleRef as React.RefObject<HTMLDivElement>}
        className="reveal mb-20"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">
          02 / About
        </p>
        <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-foreground">
          The work.
          <br />
          The thinking.
        </h2>
        <div className="mt-6 w-12 h-0.5 bg-accent" aria-hidden="true" />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Bio */}
        <div
          ref={bioRef as React.RefObject<HTMLDivElement>}
          className="reveal"
          style={{ transitionDelay: "100ms" }}
        >
          <div className="space-y-5 font-body text-base leading-[1.85] text-muted-foreground">
            <p>
              I'm a Creative Director with a decade of experience leading
              creative teams and translating brand strategy into work that
              connects.
            </p>
            <p>
              My background spans{" "}
              <strong className="font-semibold text-foreground">Audi</strong>,{" "}
              <strong className="font-semibold text-foreground">Hyundai</strong>
              ,{" "}
              <strong className="font-semibold text-foreground">
                Red Bull
              </strong>
              ,{" "}
              <strong className="font-semibold text-foreground">Bumble</strong>,{" "}
              <strong className="font-semibold text-foreground">Spotify</strong>
              ,{" "}
              <strong className="font-semibold text-foreground">Netflix</strong>
              ,{" "}
              <strong className="font-semibold text-foreground">Samsung</strong>{" "}
              and many more international brands and international agencies like{" "}
              <strong className="font-semibold text-foreground">
                Condé Nast
              </strong>
              , and{" "}
              <strong className="font-semibold text-foreground">Ogilvy</strong>.
              I've led everything from large-scale campaigns to cultural content
              series, working across brand strategy, visual storytelling, and
              production. Most recently, I founded and scaled a visual
              production studio from under ₹1 million to ₹6 million in revenue
              in one year.
            </p>
            <p>
              I think like a strategist and execute like a producer. I build
              teams that take ownership, bridge cultural authenticity with
              global brand language, and know when to push creative boundaries
              and when to refine for impact.
            </p>
            <p>
              I bring perspective shaped by India's storytelling traditions and
              international production experience.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div
          ref={skillsRef as React.RefObject<HTMLDivElement>}
          className="reveal"
          style={{ transitionDelay: "200ms" }}
        >
          <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-8">
            Capabilities
          </p>
          <ul className="space-y-0 divide-y divide-border">
            {skills.map((skill, i) => (
              <li
                key={skill}
                className="flex items-center gap-4 py-4 group"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span
                  className="text-xs font-mono text-muted-foreground group-hover:text-accent transition-[color] duration-150"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display font-bold text-lg text-foreground group-hover:text-accent transition-[color] duration-150">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─── Project Card ──────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  const ref = useReveal();
  const thumbnail = `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="reveal project-card"
      style={{ transitionDelay: `${(index % 3) * 60}ms` }}
    >
      <button
        type="button"
        className="block w-full text-left cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-none"
        onClick={() => onOpen(project)}
        aria-label={`View project: ${project.title}`}
        data-ocid="work.open_modal_button"
      >
        {/* Thumbnail with play overlay */}
        <div className="relative overflow-hidden aspect-video rounded-none">
          <img
            src={thumbnail}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Dark gradient overlay — always visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Play button — appears on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <polygon points="6,3 17,10 6,17" fill="black" />
              </svg>
            </div>
          </div>

          {/* Bottom text — always visible */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-xs tracking-widest uppercase text-accent mb-1 font-body">
              {project.client}
            </p>
            <h3 className="font-display font-bold text-white text-base leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Role below thumbnail */}
        <div className="pt-3 pb-2">
          <p className="font-body text-xs text-muted-foreground">
            {project.role}
          </p>
        </div>
      </button>
    </div>
  );
}

/* ─── Project Modal ─────────────────────────────────────────────────────── */

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-3xl p-0 rounded-none border-border overflow-hidden gap-0"
        data-ocid="work.dialog"
      >
        {/* 16:9 YouTube embed */}
        <div className="relative w-full aspect-video bg-black">
          {project && (
            <iframe
              key={project.id}
              src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          )}
        </div>

        {/* Metadata below video */}
        {project && (
          <div className="p-6">
            <p className="font-body text-xs tracking-widest uppercase text-accent mb-1">
              {project.client}
            </p>
            <h2 className="font-display font-black text-xl text-foreground leading-tight">
              {project.title}
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-1">
              {project.role}
            </p>
            <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
              {project.description}
            </p>
            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-none font-body font-medium border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground"
                data-ocid="work.close_button"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ─── Work Section ──────────────────────────────────────────────────────── */

function WorkSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const titleRef = useReveal();

  const handleClose = () => setSelectedProject(null);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div
        ref={titleRef as React.RefObject<HTMLDivElement>}
        className="reveal mb-10"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">
          03 / Work
        </p>
        <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-foreground">
          Selected
          <br />
          Projects
        </h2>
        <div className="mt-6 w-12 h-0.5 bg-accent" aria-hidden="true" />
      </div>

      {/* Filter tabs */}
      <fieldset className="flex flex-wrap gap-2 mb-12 border-0 p-0 m-0">
        <legend className="sr-only">Filter projects by category</legend>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            data-ocid="work.filter.tab"
            onClick={() => setActiveFilter(cat)}
            aria-pressed={activeFilter === cat}
            className={`font-body text-xs tracking-[0.15em] uppercase px-4 py-2 transition-[background-color,color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border ${
              activeFilter === cat
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-transparent text-muted-foreground border-border hover:border-accent hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </fieldset>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpen={setSelectedProject}
          />
        ))}
      </div>

      {/* Modal */}
      <ProjectModal project={selectedProject} onClose={handleClose} />
    </section>
  );
}

/* ─── Contact Section ───────────────────────────────────────────────────── */

function ContactSection() {
  const titleRef = useReveal();
  const contentRef = useReveal();

  return (
    <section
      id="contact"
      className="py-32 px-6 lg:px-12 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className="reveal mb-20"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-3">
            04 / Contact
          </p>
          <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-foreground">
            Let's work
            <br />
            together.
          </h2>
          <div className="mt-6 w-12 h-0.5 bg-accent" aria-hidden="true" />
        </div>

        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          className="reveal"
          style={{ transitionDelay: "100ms" }}
        >
          {/* Contact info */}
          <div className="space-y-8 max-w-md">
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              Open to creative director roles, brand strategy partnerships, and
              production collaborations.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:omi.potdar@gmail.com"
                data-ocid="contact.link"
                className="flex items-center gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                <span className="w-10 h-10 flex items-center justify-center border border-border group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground transition-[border-color,background-color,color] duration-150">
                  <Mail size={16} />
                </span>
                <span className="font-body text-base text-foreground group-hover:text-accent transition-[color] duration-150">
                  omi.potdar@gmail.com
                </span>
              </a>

              <a
                href="tel:+917276334069"
                data-ocid="contact.link"
                className="flex items-center gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                <span className="w-10 h-10 flex items-center justify-center border border-border group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground transition-[border-color,background-color,color] duration-150">
                  <Phone size={16} />
                </span>
                <span className="font-body text-base text-foreground group-hover:text-accent transition-[color] duration-150">
                  +91 72763 34069
                </span>
              </a>
            </div>

            {/* Social row */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/directedbyomi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                data-ocid="contact.link"
                className="w-10 h-10 flex items-center justify-center border border-border text-muted-foreground hover:border-accent hover:text-accent transition-[border-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://www.instagram.com/directedbyomi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-ocid="contact.link"
                className="w-10 h-10 flex items-center justify-center border border-border text-muted-foreground hover:border-accent hover:text-accent transition-[border-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-border px-6 lg:px-12 py-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body text-xs text-muted-foreground">
          © {new Date().getFullYear()} Omkar Potdar. All rights reserved.
        </p>
        <p className="font-body text-xs text-muted-foreground">
          Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-[color] duration-150"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

/* ─── App ───────────────────────────────────────────────────────────────── */

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />

        <section id="about-wrapper">
          <AboutSection />
        </section>

        <section id="work-bg" className="bg-secondary/30">
          <WorkSection />
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
