import React from "react";
import { ArrowUpRight, CheckCircle2, Linkedin } from "lucide-react";

function ProjectCard({ project, index = 0 }) {
  return (
    <article
      className="group overflow-hidden rounded-xl border border-ink/10 bg-white/[0.85] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-aqua hover:shadow-glow dark:border-white/10 dark:bg-white/5 dark:hover:border-limewash"
      data-reveal
      style={{ "--reveal-delay": `${index * 80}ms` }}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-ink/5 dark:bg-white/5">
        <img src={project.image} alt={project.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-4 top-4 rounded-full bg-ink/[0.88] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white backdrop-blur dark:bg-limewash dark:text-ink">
          {project.highlight}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-aqua dark:text-limewash">{project.category}</p>
            <h3 className="mt-2 text-xl font-black leading-tight">{project.title}</h3>
          </div>
          <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-lg bg-ink text-white dark:bg-limewash dark:text-ink">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <div className="mt-5 rounded-lg bg-ink/[0.035] p-4 dark:bg-white/[0.06]">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-ink/50 dark:text-white/50">Problem</p>
          <p className="mt-2 text-sm font-semibold leading-7 text-ink/70 dark:text-white/70">{project.problem}</p>
        </div>

        <div className="mt-5 grid gap-3">
          {project.actions.map((item) => (
            <div key={item} className="flex gap-3">
              <CheckCircle2 size={17} className="mt-1 shrink-0 text-aqua dark:text-limewash" />
              <p className="text-sm leading-7 text-ink/70 dark:text-white/70">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 border-t border-ink/10 pt-5 dark:border-white/10">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-ink/50 dark:text-white/50">Output</p>
          <p className="mt-2 text-sm font-semibold leading-7 text-ink/70 dark:text-white/70">{project.result}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span key={tool} className="rounded-full bg-aqua/10 px-3 py-1 text-xs font-black text-aqua dark:bg-limewash/10 dark:text-limewash">
              {tool}
            </span>
          ))}
        </div>
        {project.linkedinPostUrl && (
          <a className="mt-5 inline-flex items-center gap-2 text-sm font-black text-aqua transition hover:text-ink dark:text-limewash dark:hover:text-white" href={project.linkedinPostUrl} target="_blank" rel="noreferrer">
            <Linkedin size={17} />
            {project.linkedinLabel || "View LinkedIn Post"}
            <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
