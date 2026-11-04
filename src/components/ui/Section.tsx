import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  eyebrow?: string;
};

export function Section({ id, title, children, eyebrow }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      className="portfolio-panel"
      aria-labelledby={headingId}
      data-panel
    >
      <div className="panel-scroll">
        <div className="section-content">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 id={headingId} className="panel-heading">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}
