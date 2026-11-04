import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export function Projects() {
  return (
    <Section id="projects" title="Selected projects" eyebrow="03 / Work">
      <div className="card-grid">
        {projects.map((project) => (
          <Card key={project.slug} className="project-card">
            {project.image ? (
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={`${project.title} project preview`}
                  fill
                  sizes="(max-width: 760px) 90vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : (
              <div className="project-image project-image-placeholder">
                Preview unavailable
              </div>
            )}
            <div className="project-card-heading">
              <h3>{project.title}</h3>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} demo in a new tab`}
                >
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}
            </div>
            <p className="muted-text">{project.summary}</p>
            <ul className="tag-list" aria-label={`${project.title} technology stack`}>
              {project.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
