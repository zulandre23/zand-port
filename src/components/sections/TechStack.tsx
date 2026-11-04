import { stack } from "@/data/stack";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export function TechStack() {
  return (
    <Section id="stack" title="Tools of the trade" eyebrow="04 / Capabilities">
      <div className="card-grid">
        {stack.map((group) => (
          <Card key={group.name} className="project-card">
            <h3>{group.name}</h3>
            <ul className="tag-list">
              {group.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
