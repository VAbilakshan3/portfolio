import React from "react";

function SkillGroup({ group, Icon, index = 0 }) {
  return (
    <article
      className="group rounded-xl border border-ink/10 bg-white/80 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-glow dark:border-white/10 dark:bg-white/5"
      data-reveal
      style={{ "--reveal-delay": `${index * 70}ms` }}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-lg bg-aqua/10 text-aqua dark:bg-limewash/10 dark:text-limewash">
          <Icon size={22} />
        </span>
        <h3 className="text-xl font-black">{group.title}</h3>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span key={skill} className="rounded-full border border-ink/10 bg-ink/[0.035] px-3 py-2 text-xs font-bold text-ink/70 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/70">
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}

export default SkillGroup;
