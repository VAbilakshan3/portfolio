import React from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

function ProjectCard({ project, index = 0, href, onOpen }) {
  return (
    <a
      href={href}
      className="group w-full cursor-pointer overflow-hidden rounded-xl border border-ink/10 bg-white/[0.85] text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-aqua hover:shadow-glow dark:border-white/10 dark:bg-white/5 dark:hover:border-limewash"
      style={{ "--reveal-delay": `${index * 80}ms` }}
      aria-label={`Open case study for ${project.title}`}
      onClick={(event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }
        event.preventDefault();
        onOpen?.(project.slug);
      }}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-ink/5 dark:bg-white/5">
        <img src={project.coverImage} alt={project.coverAlt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-4 top-4 rounded-full bg-ink/[0.88] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white backdrop-blur dark:bg-limewash dark:text-ink">
          {project.highlight}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-aqua dark:text-limewash">{project.categoryLabel}</p>
            <h3 className="mt-2 text-xl font-black leading-tight text-ink dark:text-white">{project.title}</h3>
          </div>
          <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-lg bg-ink text-white dark:bg-limewash dark:text-ink">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <p className="mt-5 text-sm font-semibold leading-7 text-ink/70 dark:text-white/70">{project.shortDescription}</p>

        <div className="mt-5 grid gap-3">
          {project.bullets.slice(0, 3).map((item) => (
            <div key={item} className="flex gap-3">
              <CheckCircle2 size={17} className="mt-1 shrink-0 text-aqua dark:text-limewash" />
              <p className="text-sm leading-7 text-ink/70 dark:text-white/70">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tools.slice(0, 5).map((tool) => (
            <span key={tool} className="rounded-full bg-aqua/10 px-3 py-1 text-xs font-black text-aqua dark:bg-limewash/10 dark:text-limewash">
              {tool}
            </span>
          ))}
        </div>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-aqua transition group-hover:text-ink dark:text-limewash dark:group-hover:text-white">
          View case study
          <ArrowUpRight size={15} />
        </span>
      </div>
    </a>
  );
}

export default ProjectCard;
