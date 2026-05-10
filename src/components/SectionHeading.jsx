import React from "react";

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="max-w-3xl">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-black leading-tight text-ink sm:text-3xl dark:text-white">{title}</h2>
    </div>
  );
}

export default SectionHeading;
