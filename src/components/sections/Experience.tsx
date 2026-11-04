import { experience } from "@/data/experience";
import { Section } from "@/components/ui/Section";

export function Experience() {
  return (
    <Section id="experience" title="Experience" eyebrow="05 / Journey">
      <div className="experience-list">
        {experience.map((item, index) => (
          <article className="experience-item" key={`${item.title}-${index}`}>
            {item.period && <p className="eyebrow">{item.period}</p>}
            <h3>
              {item.title}
              {item.organization ? ` — ${item.organization}` : ""}
            </h3>
            {item.project && <p className="eyebrow">{item.project}</p>}
            <p className="muted-text">{item.description}</p>
            {item.highlights && (
              <ul className="experience-highlights muted-text">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
