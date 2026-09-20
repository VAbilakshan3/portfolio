import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Download,
  Sun,
  Moon,
  Menu,
  X,
  MapPin,
  Crosshair,
  Layers,
  Satellite,
  Linkedin,
  Github,
  Mail,
  Phone,
  Award,
  GraduationCap,
  Plus,
  Maximize2,
  ChevronDown,
} from "lucide-react";
import content from "./content/portfolio.json";
import { asset } from "./lib/assets";

const WorkMap = lazy(() => import("./components/WorkMap"));
const nav = [
  ["work-map", "Map"],
  ["projects", "Work"],
  ["about", "About"],
  ["experience", "Experience"],
  ["research", "Research"],
  ["credentials", "Credentials"],
];
const filters = [
  ["all", "All work"],
  ["surveying", "Surveying"],
  ["gis", "GIS"],
  ["web-gis", "Web GIS"],
  ["uav", "UAV"],
  ["remote-sensing", "Remote Sensing"],
  ["research", "Research"],
];
const cv = asset(content.cv.path);
const current = content.experience.find((e) => e.status === "Current role");
const external = { target: "_blank", rel: "noopener noreferrer" };
function DeferredWorkMap() {
  const container = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={container}>
      {visible ? (
        <Suspense
          fallback={<div className="map-loading">Loading work map...</div>}
        >
          <WorkMap
            locations={content.mapLocations}
            projects={content.projects}
            experience={content.experience}
          />
        </Suspense>
      ) : (
        <div className="map-loading">
          The interactive map loads as you reach this section.
        </div>
      )}
    </div>
  );
}
function DocumentCard({ document: doc }) {
  return (
    <article className="document-card">
      <a
        href={asset(doc.url)}
        {...external}
        aria-label={`${doc.name} (opens in a new tab)`}
      >
        <div>
          <h4>{doc.name}</h4>
          {doc.type && <p>{doc.type}</p>}
        </div>
        <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </article>
  );
}
function Tags({ items = [] }) {
  return (
    <div className="tags">
      {items.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  );
}
function Heading({ number, label, title, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number} /</span> {label}
        </p>
        <h2>{title}</h2>
      </div>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}
function CvLink({ className = "button primary" }) {
  return (
    <a className={className} href={cv} download={content.cv.filename}>
      <Download size={17} /> Download CV
    </a>
  );
}
function Contours() {
  return (
    <svg
      className="contours"
      viewBox="0 0 1000 800"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 14 }, (_, i) => (
        <ellipse
          key={i}
          cx="650"
          cy="410"
          rx={110 + i * 27}
          ry={65 + i * 24}
          transform="rotate(-32 650 410)"
        />
      ))}
      <path d="M650 0V800M0 410H1000" strokeDasharray="3 12" />
    </svg>
  );
}
function ProjectCard({ project: p, index }) {
  return (
    <article
      className="project-card reveal"
      style={{ "--delay": `${Math.min(index % 3, 2) * 70}ms` }}
    >
      <a
        href={`#project/${p.slug}`}
        className="project-image"
        aria-label={`View ${p.title}`}
      >
        {p.coverImage ? (
          <img
            src={asset(p.coverImage)}
            alt={p.coverAlt}
            loading="lazy"
            width="800"
            height="530"
          />
        ) : (
          <div className="project-no-image">
            <Crosshair size={48} />
            <span>{p.categoryLabel}</span>
            <small>Project overview</small>
          </div>
        )}
        <span className="image-open">
          <ArrowUpRight size={20} />
        </span>
      </a>
      <div className="project-copy">
        <div className="project-meta">
          <span>{p.categoryLabel}</span>
          <span>{p.status}</span>
        </div>
        <h3>
          <a href={`#project/${p.slug}`}>{p.title}</a>
        </h3>
        <p>{p.shortDescription}</p>
        <Tags items={p.tools.slice(0, 3)} />
        <a className="text-link" href={`#project/${p.slug}`}>
          Explore case study <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  );
}
function Lightbox({ images, index, setIndex, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const focus = document.activeElement;
    const d = ref.current;
    d.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = before;
      focus?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Project image gallery"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Tab") {
          const buttons = [...ref.current.querySelectorAll("button")];
          const first = buttons[0],
            last = buttons.at(-1);
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
        if (e.key === "ArrowRight") setIndex((index + 1) % images.length);
        if (e.key === "ArrowLeft")
          setIndex((index + images.length - 1) % images.length);
      }}
    >
      <button
        className="icon-button close"
        autoFocus
        onClick={onClose}
        aria-label="Close image viewer"
      >
        <X />
      </button>
      <figure>
        <img src={asset(images[index].src)} alt={images[index].alt} />
        <figcaption>{images[index].caption}</figcaption>
      </figure>
      <div className="gallery-controls">
        <button
          className="icon-button"
          aria-label="Previous image"
          onClick={() => setIndex((index + images.length - 1) % images.length)}
        >
          <ArrowLeft />
        </button>
        <span aria-live="polite">
          {index + 1} / {images.length}
        </span>
        <button
          className="icon-button"
          aria-label="Next image"
          onClick={() => setIndex((index + 1) % images.length)}
        >
          <ArrowRight />
        </button>
      </div>
    </dialog>
  );
}
function CaseStudy({ project: p }) {
  const [index, setIndex] = useState(null);
  useEffect(() => setIndex(null), [p.slug]);
  return (
    <main id="main" className="case-study wrap">
      <a className="text-link" href="#projects">
        <ArrowLeft size={17} /> Back to all work
      </a>
      <div className="case-heading">
        <p className="eyebrow">
          {p.categoryLabel} / {p.status}
        </p>
        <h1>{p.title}</h1>
        <p className="lead">{p.fullDescription}</p>
        <Tags items={p.tools} />
      </div>
      {p.coverImage && (
        <img
          className="case-cover"
          src={asset(p.coverImage)}
          alt={p.coverAlt}
        />
      )}
      <div className="case-body">
        <section>
          <h2>My role</h2>
          <p>{p.role}</p>
          <h2>Methodology</h2>
          <ol>
            {p.methodology.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
        </section>
        <aside className="panel">
          <p className="eyebrow">Project output</p>
          <h2>Deliverables & results</h2>
          <p>{p.deliverables}</p>
          {p.results && <p>{p.results}</p>}
          {Object.entries(p.links || {})
            .filter(([k, v]) => ["linkedin", "github", "live"].includes(k) && v)
            .map(([k, v]) => (
              <a key={k} className="text-link" href={v} {...external}>
                {k === "live"
                  ? "Live demo"
                  : k === "github"
                    ? "GitHub"
                    : "LinkedIn"}
                <ArrowUpRight size={16} />
              </a>
            ))}
        </aside>
      </div>
      {p.images.length > 0 && (
        <section className="case-gallery">
          <Heading
            number="+"
            label="Field notes & outputs"
            title="A closer look"
          />
          <div className="gallery-grid">
            {p.images.map((im, i) => (
              <figure key={im.src}>
                <button
                  aria-label={`Enlarge: ${im.alt}`}
                  onClick={() => setIndex(i)}
                >
                  <img src={asset(im.src)} alt={im.alt} loading="lazy" />
                  <Maximize2 size={18} />
                </button>
                <figcaption>{im.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      {index !== null && (
        <Lightbox
          images={p.images}
          index={index}
          setIndex={setIndex}
          onClose={() => setIndex(null)}
        />
      )}
      <a className="button" href="#projects">
        <ArrowLeft size={17} /> All projects
      </a>
    </main>
  );
}
function Home() {
  const [filter, setFilter] = useState("all");
  const [showCv, setShowCv] = useState(false);
  const projects = content.projects.filter(
    (p) => filter === "all" || p.categories.includes(filter),
  );
  return (
    <main id="main">
      <section className="hero wrap" id="home">
        <Contours />
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> SURVEYING · GIS · EARTH OBSERVATION
          </p>
          <p className="hero-hello">
            Precision in the field. Perspective from above.
          </p>
          <h1>
            {content.profile.name.split(" ")[0]}
            <br />
            <span>
              {content.profile.name.split(" ").slice(1).join(" ")}
              <span className="accent-dot">.</span>
            </span>
          </h1>
          <h2>{content.profile.headline}</h2>
          <p className="hero-intro">{content.profile.intro}</p>
          <div className="actions">
            <a className="button primary" href="#projects">
              View projects <ArrowUpRight size={18} />
            </a>
            <CvLink className="button" />
          </div>
          <div className="hero-links">
            <a href="#contact">
              Let’s connect <ArrowUpRight size={15} />
            </a>
            <span />
            <a href={content.contact.linkedin} {...external}>
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="portrait-frame">
            <span className="corner top-left" />
            <span className="corner bottom-right" />
            <img
              src={asset(content.profile.image)}
              alt={content.profile.name}
              width="700"
              height="900"
              fetchPriority="high"
            />
            <div className="portrait-caption">
              <Crosshair size={20} />
              <div>
                <strong>Field to insight</strong>
                <span>Surveying & geospatial technology</span>
              </div>
            </div>
          </div>
          <div className="location-label">
            <MapPin size={15} />
            {content.profile.location}
          </div>
          <div className="portrait-note">
            <span className="status-dot" />
            <span>
              {current.role} · {current.company}
            </span>
          </div>
        </div>
        <div className="hero-bottom">
          <span>LAND / WATER / AIR / DATA</span>
          <a href="#projects">
            Explore the portfolio <ChevronDown size={16} />
          </a>
          <span>01 — FIELD TO INSIGHT</span>
        </div>
      </section>
      <div className="expertise-strip">
        <div className="wrap">
          <span>
            <Crosshair /> Surveying & control
          </span>
          <span>
            <Satellite /> UAV photogrammetry
          </span>
          <span>
            <Layers /> GIS & Web GIS
          </span>
          <span>
            <Award /> Faculty Gold Medal · 2026
          </span>
        </div>
      </div>
      <section className="section wrap" id="projects">
        <Heading
          number="01"
          label="Selected work"
          title="Grounded in practice."
        >
          Field surveys, spatial analysis and interactive maps. Explore the work
          behind the deliverables.
        </Heading>
        <div className="filters" aria-label="Filter projects">
          {filters.map(([k, label]) => (
            <button
              key={k}
              aria-pressed={filter === k}
              onClick={() => setFilter(k)}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="result-count" aria-live="polite">
          {projects.length} {projects.length === 1 ? "project" : "projects"}
        </p>
        <div className="project-grid" key={filter}>
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
      <section className="section wrap" id="work-map">
        <Heading
          number="+"
          label="Places behind the work"
          title="My work, on the map."
        >
          Explore project locations and employment bases. Select a pin or
          location to see the work behind it.
        </Heading>
        <DeferredWorkMap />
      </section>
      <section className="section about-section" id="about">
        <div className="wrap">
          <Heading
            number="02"
            label="About me"
            title="One connected perspective."
          />
          <div className="about-grid">
            <div>
              <p className="large-copy">
                From establishing a control point to publishing an interactive
                map.
              </p>
              <p>{content.about}</p>
              <a className="text-link" href="#experience">
                Explore my experience <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="bring-grid">
              {[
                {
                  icon: Crosshair,
                  title: "Reliable field foundations",
                  text: "Survey control, GNSS observations, land and engineering surveys, and field verification.",
                },
                {
                  icon: Satellite,
                  title: "A view from above",
                  text: "UAV survey planning, GCP control and photogrammetry for orthomosaics, point clouds and terrain products.",
                },
                {
                  icon: Layers,
                  title: "Data people can use",
                  text: "Spatial analysis, land information systems and Web GIS that connect data with planning needs.",
                },
              ].map(({ icon: Icon, title, text }, i) => (
                <article key={title}>
                  <span className="bring-icon">
                    <Icon size={24} />
                  </span>
                  <div>
                    <span className="mini-index">0{i + 1}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section wrap" id="experience">
        <Heading
          number="03"
          label="Professional journey"
          title="Experience, in context."
        >
          Surveying practice, applied GIS and research — with a continuous
          connection between field and office.
        </Heading>
        <div className="timeline">
          {content.experience.map((e, i) => (
            <details
              className="experience"
              key={e.company + e.role}
              open={i === 0 ? true : undefined}
            >
              <summary>
                <span className="timeline-date">
                  {e.period}
                  <small>{e.status}</small>
                </span>
                <span className="experience-title">
                  <strong>{e.role}</strong>
                  <span>
                    {e.company} · {e.location}
                  </span>
                </span>
                <Plus size={21} />
              </summary>
              <div className="experience-body">
                <p>{e.summary}</p>
                <ul>
                  {e.compactBullets.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <Tags items={e.tools} />
                {e.workstreams?.map((w) => (
                  <details className="workstream" key={w.title}>
                    <summary>
                      {w.title}
                      <ChevronDown size={16} />
                    </summary>
                    <ul>
                      {w.bullets.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>
      <section className="section skills-section" id="skills">
        <div className="wrap">
          <Heading
            number="04"
            label="Technical toolkit"
            title="The tools behind the work."
          >
            Practical capabilities across data capture, analysis, visualization
            and delivery.
          </Heading>
          <div className="skills-grid">
            {content.skills.map((s, i) => (
              <details className="skill-card" key={s.title}>
                <summary>
                  <span>
                    <span className="mini-index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3>{s.title}</h3>
                  </span>
                  <Plus size={20} aria-hidden="true" />
                </summary>
                <div className="skill-details">
                  <Tags items={s.skills} />
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap" id="research">
        <Heading
          number="05"
          label="Research & conference activity"
          title="Exploring what comes next."
        />
        {content.publications.map((p) => (
          <article className="research-card" key={p.title}>
            <div className="research-icon">
              <Satellite size={38} />
              <span>GEOAI / REMOTE SENSING</span>
            </div>
            <div>
              <p className="eyebrow">
                {p.venue} <span className="badge">{p.status}</span>
              </p>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              {p.url && (
                <a href={p.url} className="text-link" {...external}>
                  Read publication <ArrowUpRight size={16} />
                </a>
              )}
              <a
                href="#project/geoai-spatial-feature-detection-research"
                className="text-link"
              >
                Explore the research project <ArrowUpRight size={16} />
              </a>
            </div>
          </article>
        ))}
      </section>
      <section className="section credentials-section" id="credentials">
        <div className="wrap">
          <Heading
            number="06"
            label="Education & recognition"
            title="A foundation for the future."
          />
          <div className="credentials-grid">
            <div>
              <h3 className="column-label">
                <GraduationCap size={21} /> Education
              </h3>
              {content.education.map((e) => (
                <article className="education" key={e.degree}>
                  <h3>{e.degree}</h3>
                  <p>{e.institution}</p>
                  <span>{e.specialization}</span>
                  <small>{e.details}</small>
                </article>
              ))}
            </div>
            <div>
              <h3 className="column-label">
                <Award size={21} /> Awards & recognition
              </h3>
              {content.awards.map((a) => (
                <article className="award-card" key={a.title}>
                  <span className="mini-index">{a.year}</span>
                  <h3>{a.title}</h3>
                  <p>{a.description}</p>
                </article>
              ))}
              <h3 className="column-label membership-label">
                Professional memberships
              </h3>
              <Tags items={content.memberships} />
            </div>
          </div>
          <section
            className="document-library"
            id="documents"
            aria-labelledby="documents-heading"
          >
            <h3 id="documents-heading" className="column-label">
              Reference & experience letters
            </h3>
            <div className="certificate-grid">
              {content.documents.map((doc) => (
                <DocumentCard key={doc.url} document={doc} />
              ))}
            </div>
          </section>
          <details className="certificate-list" open>
            <summary>
              Certificates & supporting documents{" "}
              <span>
                {content.certificates.length} documents <Plus size={20} />
              </span>
            </summary>
            <div className="certificate-grid">
              {content.certificates.map((c) => (
                <DocumentCard key={c.url} document={c} />
              ))}
            </div>
          </details>
          <details className="certificate-list">
            <summary>
              Leadership & community <Plus size={20} />
            </summary>
            <ul className="leadership-list">
              {content.leadership.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </details>
        </div>
      </section>
      <section className="section wrap cv-section" id="cv">
        <div>
          <p className="eyebrow">THE COMPLETE PICTURE</p>
          <h2>A closer look at my background.</h2>
          <p>
            Experience, qualifications and professional references in one
            document.
          </p>
        </div>
        <div className="actions">
          <CvLink />
          <a className="button" href={cv} {...external}>
            View CV <ArrowUpRight size={16} />
          </a>
          <button
            className="text-link"
            aria-expanded={showCv}
            onClick={() => setShowCv(!showCv)}
          >
            {showCv ? "Hide" : "Preview"} CV <ChevronDown size={17} />
          </button>
        </div>
        {showCv && (
          <div className="cv-preview">
            <iframe title={`${content.profile.name} CV preview`} src={cv} />
            <p>
              If the preview is unavailable,{" "}
              <a href={cv} {...external}>
                open the PDF in a new tab
              </a>
              .
            </p>
          </div>
        )}
      </section>
      <section className="contact-section" id="contact">
        <div className="wrap">
          <p className="eyebrow">07 / LET’S CONNECT</p>
          <h2>
            Let’s put perspective
            <br />
            into your next project<span>.</span>
          </h2>
          <p>
            For surveying and geospatial roles, project collaborations, or
            research opportunities.
          </p>
          <a className="contact-email" href={`mailto:${content.contact.email}`}>
            {content.contact.email}
            <ArrowUpRight />
          </a>
          <div className="contact-links">
            <a href={`tel:${content.contact.phone.replace(/\s/g, "")}`}>
              <Phone size={17} />
              {content.contact.phone}
            </a>
            <a href={content.contact.linkedin} {...external}>
              <Linkedin size={18} /> LinkedIn <ArrowUpRight size={14} />
            </a>
            <a href={content.contact.github} {...external}>
              <Github size={18} /> GitHub <ArrowUpRight size={14} />
            </a>
            <CvLink className="text-link" />
          </div>
        </div>
      </section>
    </main>
  );
}
export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") || "dark";
    } catch {
      return "dark";
    }
  });
  const [menu, setMenu] = useState(false);
  const [hash, setHash] = useState(location.hash);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {}
  }, [theme]);
  useEffect(() => {
    const update = () => {
      setHash(location.hash);
      setMenu(false);
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  let slug = "";
  try {
    if (hash.startsWith("#project/")) slug = decodeURIComponent(hash.slice(9));
  } catch {}
  const project = content.projects.find((p) => p.slug === slug);
  useEffect(() => {
    document.title = project
      ? `${project.title} | ${content.profile.name}`
      : `${content.profile.name} | ${content.profile.headline}`;
    if (slug) window.scrollTo({ top: 0, behavior: "instant" });
    else if (hash) {
      requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
    }
  }, [hash, project, slug]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap nav-wrap">
          <a
            className="brand"
            href="#home"
            aria-label={`${content.profile.name} home`}
          >
            <span className="brand-mark">
              <Crosshair size={23} />
            </span>
            <span>
              AV<span className="brand-dot">.</span>
            </span>
          </a>
          <nav aria-label="Main navigation" className={menu ? "open" : ""}>
            {nav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={hash === `#${id}` ? "location" : undefined}
              >
                {label}
              </a>
            ))}
            <a className="nav-contact" href="#contact">
              Let’s talk <ArrowUpRight size={15} />
            </a>
          </nav>
          <div className="nav-actions">
            <button
              className="icon-button theme-toggle"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              className="icon-button menu-toggle"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setMenu(false);
              }}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      {slug ? (
        project ? (
          <CaseStudy project={project} />
        ) : (
          <main id="main" className="wrap not-found">
            <h1>Project not found</h1>
            <a className="button" href="#projects">
              Back to projects
            </a>
          </main>
        )
      ) : (
        <Home />
      )}
      <footer className="wrap">
        <a className="brand" href="#home">
          AV<span className="brand-dot">.</span>
        </a>
        <p>
          © {new Date().getFullYear()} {content.profile.name} · Surveying &
          geospatial technology
        </p>
        <a href="#home" className="text-link">
          Back to top ↑
        </a>
      </footer>
    </>
  );
}
