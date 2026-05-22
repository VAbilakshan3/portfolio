import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  Database,
  Download,
  FileText,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  Map as MapIcon,
  MapPinned,
  Menu,
  Moon,
  Phone,
  Radar,
  Satellite,
  Sparkles,
  Sun,
  Target,
  Users,
  X
} from "lucide-react";
import { profile } from "./data/profileData";
import { experiences } from "./data/experienceData";
import { projects, projectFilters } from "./data/projectsData";
import { certificates, documents, memberships } from "./data/certificatesData";
import { navigationItems } from "./data/navigationData";
import SectionHeading from "./components/SectionHeading";
import SkillGroup from "./components/SkillGroup";
import ProjectCard from "./components/ProjectCard";

const iconMap = {
  GIS: Layers3,
  Surveying: MapPinned,
  "Web GIS": MapIcon,
  Database,
  "Remote Sensing": Satellite,
  Programming: Radar
};

const bringIcons = [MapPinned, Database, Layers3];

const normalizeKey = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getProjectCategoryKeys = (project) => {
  const keys = [project.category, ...(project.categories || [])];
  return [...new Set(keys.map(normalizeKey).filter(Boolean))];
};

const getProjectSlugFromHash = (hash) => {
  const cleanHash = String(hash || "").replace(/^#\/?/, "");
  if (!cleanHash.startsWith("project/")) return "";
  return decodeURIComponent(cleanHash.replace("project/", ""));
};

const scrollToSection = (sectionId, behavior = "auto") => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const headerOffset = document.querySelector("header")?.offsetHeight || 0;
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset - 18;
  window.scrollTo({ top: Math.max(top, 0), behavior });
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = window.localStorage.getItem("portfolio-theme");
      return savedTheme ? savedTheme === "dark" : true;
    } catch {
      return true;
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || "#home");
  const projectSlug = getProjectSlugFromHash(currentHash);
  const activeProject = useMemo(() => projects.find((project) => project.slug === projectSlug), [projectSlug]);

  const navigateToProject = (slug) => {
    const nextHash = `#project/${encodeURIComponent(slug)}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }
    setCurrentHash(nextHash);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const navigateToSection = (sectionId, behavior = "smooth") => {
    const nextHash = `#${sectionId}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }
    setCurrentHash(nextHash);
    setMenuOpen(false);
    window.requestAnimationFrame(() => scrollToSection(sectionId, behavior));
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    try {
      window.localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
    } catch {
      // Theme persistence is optional when storage is unavailable.
    }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.classList.add("js");
    const elements = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("reveal-fallback"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    window.setTimeout(() => {
      elements.forEach((element) => {
        if (!element.classList.contains("is-visible")) {
          element.classList.add("reveal-fallback");
        }
      });
    }, 800);
    return () => observer.disconnect();
  }, [currentHash]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || "#home");
      setMenuOpen(false);
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (activeProject) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [activeProject]);

  useEffect(() => {
    if (activeProject) return undefined;
    const sectionId = String(currentHash || "#home").replace(/^#/, "") || "home";
    const frame = window.requestAnimationFrame(() => {
      scrollToSection(sectionId, "auto");
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeProject, currentHash]);

  return (
    <div className="min-h-screen bg-paper text-ink antialiased transition-colors duration-300 dark:bg-night dark:text-white">
      <div className="fixed inset-0 -z-10 map-grid opacity-80 dark:opacity-30" />
      <Header
        darkMode={darkMode}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((value) => !value)}
        onThemeToggle={() => setDarkMode((value) => !value)}
      />
      {activeProject ? (
        <main>
          <ProjectDetailPage project={activeProject} onBack={() => navigateToSection("projects", "auto")} />
        </main>
      ) : (
        <>
          <StickyCTA />
          <main>
            <Hero />
            <WhatIBring />
            <TrustStrip />
            <DocumentsPreview />
            <About />
            <Experience />
            <Projects onProjectOpen={navigateToProject} />
            <Skills />
            <TechnicalProfile />
            <Certifications />
            <Education />
            <ActivitiesAndReferences />
            <Contact />
          </main>
        </>
      )}
      <Footer />
    </div>
  );
}

function Header({ darkMode, menuOpen, onMenuToggle, onThemeToggle }) {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/[0.88] backdrop-blur-xl dark:border-white/10 dark:bg-night/[0.85]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <a href="#home" className="group flex items-center gap-3" aria-label="Go to home">
          <span className="grid size-10 place-items-center rounded-lg bg-ink text-white shadow-glow dark:bg-limewash dark:text-ink">
            <MapPinned size={20} />
          </span>
          <span>
            <span className="block text-sm font-black uppercase tracking-[0.12em]">{profile.name}</span>
            <span className="block text-xs text-ink/60 dark:text-white/60">GIS & Surveying</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navigationItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="icon-button" type="button" onClick={onThemeToggle} aria-label="Toggle color mode" aria-pressed={darkMode}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="hidden rounded-lg bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-aqua dark:bg-limewash dark:text-ink dark:hover:bg-white sm:inline-flex" href={profile.cvUrl} download>
            CV
          </a>
          <button className="icon-button lg:hidden" type="button" onClick={onMenuToggle} aria-label="Toggle navigation">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="border-t border-ink/10 bg-paper px-5 py-4 dark:border-white/10 dark:bg-night lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navigationItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="rounded-lg px-3 py-3 text-sm font-bold hover:bg-ink/5 dark:hover:bg-white/10">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function StickyCTA() {
  return (
    <div className="fixed bottom-4 left-1/2 z-40 hidden -translate-x-1/2 rounded-xl border border-ink/10 bg-white/90 p-2 shadow-glow backdrop-blur-xl dark:border-white/10 dark:bg-night/90 md:flex">
      <a className="sticky-cta-link sticky-cta-primary" href={profile.cvUrl} download>
        <Download size={16} />
        CV
      </a>
      <a className="sticky-cta-link" href={profile.contact.linkedin} target="_blank" rel="noreferrer">
        <Linkedin size={16} />
        LinkedIn
      </a>
      <a className="sticky-cta-link" href={`mailto:${profile.contact.email}`}>
        <Mail size={16} />
        Email
      </a>
      <a className="sticky-cta-link" href="#projects">
        <Layers3 size={16} />
        Projects
      </a>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden px-5 pb-12 pt-12 sm:pt-16 lg:px-8" data-reveal>
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <div className="mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-ink/10 bg-white/75 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-moss shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-limewash">
            <Radar size={15} />
            {profile.positioning.label}
          </div>

          <p className="text-sm font-black uppercase tracking-[0.22em] text-aqua dark:text-limewash">{profile.name}</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-black leading-[1.05] text-ink sm:text-4xl lg:text-5xl dark:text-white">
            {profile.positioning.headline}
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-moss dark:text-white/75">
            {profile.positioning.summary}
          </p>

          <div className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-3">
            <HeroInfo label="Current" value={profile.positioning.currentStatus.replace("Current: ", "")} />
            <HeroInfo label="Location" value={profile.positioning.location} />
            <HeroInfo label="Target Roles" value={profile.positioning.targetSummary} />
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a className="primary-button" href={profile.cvUrl} download>
              <Download size={18} />
              Download CV
            </a>
            <a className="secondary-button" href="#projects">
              <Layers3 size={18} />
              View Projects
            </a>
            <a className="secondary-button" href={profile.contact.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a className="secondary-button" href="#contact">
              <Mail size={18} />
              Contact
            </a>
          </div>

          <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
            {profile.heroStats.map((stat) => (
              <div key={stat.label} className="premium-card p-4">
                <p className="text-lg font-black text-aqua dark:text-limewash">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink/55 dark:text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative" data-reveal style={{ "--reveal-delay": "120ms" }}>
          <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-glow dark:border-white/10 dark:bg-white/5">
            <div className="absolute left-5 top-5 z-10 rounded-lg bg-ink/90 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-white backdrop-blur dark:bg-limewash dark:text-ink">
              {profile.title}
            </div>
            <img src={profile.profileImage} alt={`${profile.name} professional profile portrait`} className="h-[30rem] w-full object-cover object-top" />
            <div className="bg-ink p-5 text-white dark:bg-limewash dark:text-ink">
              <p className="text-sm font-bold opacity-80">Open to</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.targetRoles.map((role) => (
                  <span key={role} className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-black shadow-sm dark:border-ink/20 dark:bg-ink/10">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroInfo({ label, value }) {
  return (
    <div className="rounded-lg border border-ink/10 bg-white/75 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-aqua dark:text-limewash">{label}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-ink/75 dark:text-white/75">{value}</p>
    </div>
  );
}

function DocumentsPreview() {
  return (
    <section id="cv" className="section-shell" data-reveal>
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <SectionHeading eyebrow="Professional CV" title="Readable CV preview with open and download actions." />
        <div className="flex flex-wrap gap-3">
          <a className="primary-button" href={profile.cvUrl} download>
            <Download size={18} />
            Download CV
          </a>
          <a className="secondary-button" href={profile.cvUrl} target="_blank" rel="noreferrer">
            <FileText size={18} />
            View CV
          </a>
        </div>
      </div>
      <div className="mt-8">
        <PdfPreview title="Professional CV" subtitle="Full CV with references, education, experience, certificates, and projects." url={profile.cvUrl} />
      </div>
    </section>
  );
}

function PdfPreview({ title, subtitle, url }) {
  return (
    <article className="premium-card overflow-hidden bg-white/95 dark:bg-white/[0.06]">
      <div className="flex flex-col justify-between gap-4 border-b border-ink/10 bg-white p-5 dark:border-white/10 dark:bg-night/80 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-black">{title}</h3>
          <p className="mt-1 text-sm font-semibold leading-6 text-ink/60 dark:text-white/60">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a className="secondary-button px-4 py-2" href={url} target="_blank" rel="noreferrer">
            <ArrowUpRight size={16} />
            Open
          </a>
          <a className="primary-button px-4 py-2" href={url} download>
            <Download size={16} />
            Download
          </a>
        </div>
      </div>
      <div className="bg-slate-100 p-3 dark:bg-black/30">
        <iframe
          title={`${title} PDF preview`}
          src={`${url}#toolbar=0&navpanes=0`}
          className="h-[30rem] w-full rounded-lg border border-ink/10 bg-white shadow-sm dark:border-white/10"
        />
      </div>
    </article>
  );
}

function WhatIBring() {
  return (
    <section className="section-shell pt-4" data-reveal>
      <div className="grid gap-4 lg:grid-cols-3">
        {profile.whatIBring.map((item, index) => {
          const Icon = bringIcons[index] || Sparkles;
          return (
            <article key={item.title} className="premium-card group p-6 hover:-translate-y-1" data-reveal style={{ "--reveal-delay": `${index * 80}ms` }}>
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-lg bg-aqua/10 text-aqua dark:bg-limewash/10 dark:text-limewash">
                  <Icon size={23} />
                </span>
                <h2 className="text-xl font-black">{item.title}</h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-ink/70 dark:text-white/70">{item.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tools.map((tool) => (
                  <span key={tool} className="rounded-full bg-ink/[0.045] px-3 py-1 text-xs font-black text-ink/70 dark:bg-white/[0.08] dark:text-white/70">
                    {tool}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="px-5 py-4 lg:px-8" data-reveal>
      <div className="mx-auto max-w-7xl rounded-2xl border border-ink/10 bg-ink p-5 text-white shadow-glow dark:border-white/10 dark:bg-white dark:text-ink">
        <div className="grid gap-3 md:grid-cols-5">
          {profile.trustSignals.map((signal, index) => (
            <div key={signal} className="flex items-start gap-2 rounded-lg bg-white/[0.08] p-3 dark:bg-ink/5" data-reveal style={{ "--reveal-delay": `${index * 50}ms` }}>
              <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-limewash dark:text-aqua" />
              <p className="text-xs font-bold leading-5">{signal}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-shell" data-reveal>
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <SectionHeading eyebrow="About Me" title="A field-to-map geospatial profile for planning, LIS, and Web GIS teams." />
        <div className="space-y-5">
          <p className="text-lg leading-9 text-ink/70 dark:text-white/70">{profile.about}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {profile.recruiterHighlights.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-lg border border-ink/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-white/5" data-reveal style={{ "--reveal-delay": `${index * 60}ms` }}>
                <span className="mt-2 size-2 shrink-0 rounded-full bg-aqua dark:bg-limewash" />
                <p className="text-sm font-semibold leading-7 text-ink/70 dark:text-white/70">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section-shell" data-reveal>
      <SectionHeading eyebrow="Experience" title="Practical experience, summarized for recruiter scanning." />
      <div className="mt-10 grid gap-5">
        {experiences.map((job, index) => (
          <article key={`${job.company}-${job.role}-${job.period}`} className="premium-card p-6 lg:p-7" data-reveal style={{ "--reveal-delay": `${index * 90}ms` }}>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-aqua/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-aqua dark:bg-limewash/10 dark:text-limewash">
                  <BriefcaseBusiness size={15} />
                  {job.period}
                </div>
                <h3 className="text-xl font-black sm:text-2xl">{job.role}</h3>
                <p className="mt-1 font-semibold text-moss dark:text-white/60">{job.company} - {job.location}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.proofUrl && (
                  <a className="secondary-button w-fit" href={job.proofUrl} target="_blank" rel="noreferrer">
                    <FileText size={17} />
                    Letter
                  </a>
                )}
                {job.linkedinPostUrl && (
                  <a className="secondary-button w-fit" href={job.linkedinPostUrl} target="_blank" rel="noreferrer">
                    <Linkedin size={17} />
                    {job.linkedinLabel || "LinkedIn"}
                  </a>
                )}
                <a className="secondary-button w-fit" href={profile.cvUrl} download>
                  <Download size={17} />
                  CV
                </a>
              </div>
            </div>
            <p className="mt-5 max-w-5xl leading-8 text-ink/70 dark:text-white/70">{job.summary}</p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {(job.compactBullets || []).map((item) => (
                <div key={item} className="flex gap-3 rounded-lg bg-ink/[0.035] p-4 dark:bg-white/[0.06]">
                  <CheckCircle2 size={17} className="mt-1 shrink-0 text-aqua dark:text-limewash" />
                  <p className="text-sm font-semibold leading-6 text-ink/70 dark:text-white/70">{item}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects({ onProjectOpen }) {
  const [active, setActive] = useState("all");

  const orderedProjects = useMemo(
    () => [...projects].sort((first, second) => (first.order ?? 99) - (second.order ?? 99)),
    []
  );

  const visibleProjects = useMemo(() => {
    const activeKey = normalizeKey(active);
    if (activeKey === "all") return orderedProjects;
    return orderedProjects.filter((project) => getProjectCategoryKeys(project).includes(activeKey));
  }, [active, orderedProjects]);

  return (
    <section id="projects" className="section-shell" data-reveal>
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <SectionHeading eyebrow="Featured Case Studies" title="Selected work across LIS, open-source GIS, GeoAI, and surveying." />
        <div className="flex flex-wrap gap-2">
          {projectFilters.map((category) => {
            const categoryKey = normalizeKey(category.key);
            const isActive = normalizeKey(active) === categoryKey;
            return (
              <button
                key={category.key}
                type="button"
                onClick={() => setActive(categoryKey)}
                className={`filter-button ${isActive ? "filter-button-active" : ""}`}
                aria-pressed={isActive}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {visibleProjects.length > 0 ? (
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              href={`#project/${project.slug}`}
              onOpen={onProjectOpen}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-ink/10 bg-white/75 p-6 text-sm font-semibold text-ink/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
          No projects are currently tagged for this category.
        </div>
      )}
    </section>
  );
}

function ProjectDetailPage({ project, onBack }) {
  const links = project.links || {};
  const gallery = project.images?.length ? project.images : [{ src: project.coverImage, alt: project.coverAlt, caption: project.title }];

  return (
    <section className="section-shell pb-20">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <a
          className="secondary-button w-fit"
          href="#projects"
          onClick={(event) => {
            event.preventDefault();
            onBack?.();
          }}
        >
          <ArrowLeft size={17} />
          Back to Projects
        </a>
        <a className="primary-button w-fit" href={profile.cvUrl} download>
          <Download size={17} />
          Download CV
        </a>
      </div>

      <article className="overflow-hidden rounded-2xl border border-ink/10 bg-white/80 shadow-glow dark:border-white/10 dark:bg-white/[0.04]">
        <div className="border-b border-ink/10 p-5 dark:border-white/10 sm:p-7 lg:p-9">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-aqua dark:text-limewash">{project.categoryLabel}</p>
            <h1 id={`project-${project.slug}-title`} className="mt-3 max-w-5xl text-3xl font-black leading-tight sm:text-4xl">{project.title}</h1>
            <p className="mt-4 max-w-4xl text-base font-semibold leading-8 text-ink/70 dark:text-white/70">{project.shortDescription}</p>
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.08fr_0.92fr] lg:p-9">
          <div>
            <img src={project.coverImage} alt={project.coverAlt} className="aspect-[16/10] w-full rounded-xl border border-ink/10 object-cover shadow-sm dark:border-white/10" />
            <p className="mt-5 leading-8 text-ink/70 dark:text-white/70">{project.fullDescription}</p>

            <div className="mt-6">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-ink/50 dark:text-white/50">Gallery</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {gallery.map((image) => (
                  <figure key={image.src} className="overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
                    <img src={image.src} alt={image.alt} className="aspect-[16/10] w-full object-cover" />
                    {image.caption && <figcaption className="p-3 text-xs font-semibold leading-5 text-ink/60 dark:text-white/60">{image.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-xl border border-ink/10 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-ink/50 dark:text-white/50">Tools Used</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span key={tool} className="rounded-full bg-aqua/10 px-3 py-1 text-xs font-black text-aqua dark:bg-limewash/10 dark:text-limewash">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-ink/10 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-ink/50 dark:text-white/50">Responsibilities / Outputs</p>
              <div className="mt-4 grid gap-3">
                {project.bullets.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 size={17} className="mt-1 shrink-0 text-aqua dark:text-limewash" />
                    <p className="text-sm font-semibold leading-6 text-ink/70 dark:text-white/70">{item}</p>
                  </div>
                ))}
              </div>
              {project.output && <p className="mt-5 rounded-lg bg-ink/[0.035] p-4 text-sm font-semibold leading-7 text-ink/70 dark:bg-white/[0.06] dark:text-white/70">{project.output}</p>}
            </div>

            {(links.linkedin || links.github || links.live) && (
              <div className="rounded-xl border border-ink/10 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-ink/50 dark:text-white/50">Project Links</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {links.linkedin && (
                    <a className="secondary-button px-4 py-2" href={links.linkedin} target="_blank" rel="noreferrer">
                      <Linkedin size={16} />
                      {links.linkedinLabel || "View LinkedIn Post"}
                    </a>
                  )}
                  {links.github && (
                    <a className="secondary-button px-4 py-2" href={links.github} target="_blank" rel="noreferrer">
                      <Github size={16} />
                      GitHub
                    </a>
                  )}
                  {links.live && (
                    <a className="primary-button px-4 py-2" href={links.live} target="_blank" rel="noreferrer">
                      <ArrowUpRight size={16} />
                      Live
                    </a>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </article>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-shell" data-reveal>
      <SectionHeading eyebrow="Key Skills" title="A practical GIS, surveying, database, and Web GIS toolkit." />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {profile.skillGroups.map((group, index) => (
          <SkillGroup key={group.title} group={group} Icon={iconMap[group.title] || Layers3} index={index} />
        ))}
      </div>
    </section>
  );
}

function TechnicalProfile() {
  return (
    <section id="technical-profile" className="section-shell" data-reveal>
      <SectionHeading eyebrow="Technical Profile" title="Tools, methods, and instrument exposure from the CV." />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {profile.technicalProfile.map((group, index) => (
          <article key={group.title} className="premium-card p-6" data-reveal style={{ "--reveal-delay": `${index * 90}ms` }}>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-lg bg-ink text-white dark:bg-limewash dark:text-ink">
                <Target size={21} />
              </span>
              <h3 className="text-xl font-black">{group.title}</h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-full border border-ink/10 bg-ink/[0.035] px-3 py-2 text-xs font-bold text-ink/70 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/70">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="section-shell" data-reveal>
      <SectionHeading eyebrow="Recruiter Proof" title="Credentials, documents, memberships, and downloadable proof." />
      <div className="mt-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="premium-card p-6">
          <h3 className="text-lg font-black">Documents & Letters</h3>
          <div className="mt-5 grid gap-3">
            {documents.map((document) => (
              <a key={document.label} href={document.url} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-lg bg-ink/[0.035] p-4 text-sm font-semibold leading-6 text-ink/70 transition hover:bg-aqua/10 hover:text-aqua dark:bg-white/[0.06] dark:text-white/70 dark:hover:bg-limewash/10 dark:hover:text-limewash">
                <FileText size={18} className="shrink-0" />
                <span>
                  <span className="block font-black">{document.label}</span>
                  <span className="text-xs uppercase tracking-[0.14em] opacity-60">{document.type}</span>
                </span>
                <ArrowUpRight size={16} className="ml-auto opacity-50 transition group-hover:opacity-100" />
              </a>
            ))}
          </div>
          <h3 className="mt-8 text-lg font-black">Professional Memberships</h3>
          <div className="mt-4 grid gap-3">
            {memberships.map((membership) => (
              <p key={membership} className="rounded-lg bg-ink/[0.035] p-4 text-sm font-semibold leading-6 text-ink/70 dark:bg-white/[0.06] dark:text-white/70">
                {membership}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {certificates.map((certification, index) => (
            <a key={certification.name} href={certification.url} target="_blank" rel="noreferrer" className="group rounded-lg border border-ink/10 bg-white/75 p-4 font-semibold shadow-sm transition hover:-translate-y-1 hover:border-aqua hover:shadow-glow dark:border-white/10 dark:bg-white/5 dark:hover:border-limewash" data-reveal style={{ "--reveal-delay": `${index * 30}ms` }}>
              <span className="flex items-start gap-3">
                <Award size={19} className="mt-0.5 shrink-0 text-aqua dark:text-limewash" />
                <span className="text-sm leading-6">{certification.name}</span>
                <ArrowUpRight size={15} className="ml-auto shrink-0 opacity-45 transition group-hover:opacity-100" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section-shell" data-reveal>
      <SectionHeading eyebrow="Education" title="Academic foundation in surveying sciences, GIS, and web development." />
      <div className="mt-10 grid gap-5">
        {profile.education.map((item, index) => (
          <article key={item.degree} className="premium-card p-6" data-reveal style={{ "--reveal-delay": `${index * 80}ms` }}>
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-ink text-white dark:bg-limewash dark:text-ink">
                <GraduationCap size={23} />
              </span>
              <div>
                <h3 className="text-xl font-black">{item.degree}</h3>
                {item.specialization && <p className="mt-1 font-bold text-aqua dark:text-limewash">{item.specialization}</p>}
                <p className="mt-2 text-ink/60 dark:text-white/60">{item.institution}</p>
                {item.details && <p className="mt-2 text-sm leading-6 text-ink/60 dark:text-white/55">{item.details}</p>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ActivitiesAndReferences() {
  return (
    <section id="activities" className="section-shell" data-reveal>
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <SectionHeading eyebrow="Leadership" title="Activities that show discipline, teamwork, and responsibility." />
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {profile.leadership.map((item, index) => (
              <div key={item} className="rounded-lg border border-ink/10 bg-white/75 p-4 text-sm font-semibold leading-6 shadow-sm dark:border-white/10 dark:bg-white/5" data-reveal style={{ "--reveal-delay": `${index * 45}ms` }}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="premium-card p-6" data-reveal>
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-ink text-white dark:bg-limewash dark:text-ink">
              <Users size={22} />
            </span>
            <div>
              <p className="section-eyebrow">References</p>
              <h3 className="text-lg font-black">Academic and professional referees</h3>
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            {profile.references.map((reference) => (
              <div key={reference.name} className="rounded-lg bg-ink/[0.035] p-4 dark:bg-white/[0.06]">
                <p className="font-black">{reference.name}</p>
                <p className="mt-1 text-sm font-semibold text-aqua dark:text-limewash">{reference.role}</p>
                <p className="mt-1 text-sm leading-6 text-ink/60 dark:text-white/60">{reference.organization}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-ink/60 dark:text-white/55">
            Full referee contact details are included in the downloadable CV.
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-shell pb-24" data-reveal>
      <div className="rounded-2xl bg-ink p-6 text-white shadow-glow dark:bg-white dark:text-ink lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="section-eyebrow text-limewash dark:text-aqua">Contact</p>
            <h2 className="mt-3 max-w-3xl text-2xl font-black leading-tight sm:text-3xl">
              Ready to support surveying, GIS, drone, hydrographic, Web GIS, and planning teams.
            </h2>
            <p className="mt-4 max-w-2xl leading-8 text-white/70 dark:text-ink/70">
              Recruiters and employers can reach me for Surveyor, GIS Analyst, Drone Survey, Hydrographic Surveying, Web GIS Developer, and Planning/GIS Assistant opportunities.
            </p>
          </div>
          <div className="grid gap-3">
            <a className="contact-link" href={`mailto:${profile.contact.email}`}>
              <Mail size={18} />
              {profile.contact.email}
            </a>
            <a className="contact-link" href={`tel:${profile.contact.phone.replaceAll(" ", "")}`}>
              <Phone size={18} />
              {profile.contact.phone}
            </a>
            <div className="contact-link">
              <MapPinned size={18} />
              {profile.location}
            </div>
            <a className="contact-link" href={profile.contact.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} />
              LinkedIn
              <ArrowUpRight size={16} className="ml-auto" />
            </a>
            <a className="contact-link" href={profile.contact.github} target="_blank" rel="noreferrer">
              <Github size={18} />
              GitHub
              <ArrowUpRight size={16} className="ml-auto" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink/10 px-5 py-8 dark:border-white/10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-ink/60 dark:text-white/55 md:flex-row md:items-center md:justify-between">
        <p>Copyright {new Date().getFullYear()} {profile.name}. GIS & Surveying Portfolio.</p>
        <div className="flex flex-wrap gap-4">
          <a className="footer-link" href={profile.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="footer-link" href={profile.contact.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="footer-link" href={`mailto:${profile.contact.email}`}>Email</a>
          <a className="footer-link" href={`tel:${profile.contact.phone.replaceAll(" ", "")}`}>Phone</a>
        </div>
      </div>
    </footer>
  );
}

export default App;
