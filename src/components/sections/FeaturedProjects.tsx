import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export function FeaturedProjects() {
  const featured = projects.find((project) => project.featured && project.caseStudy);

  return (
    <Section id="case-study" title="Featured case study" eyebrow="02 / Selected work">
      {featured?.caseStudy ? (
        <div className="split-layout">
          <Card className="project-card">
            {featured.image && (
              <div className="project-image">
                <Image
                  src={featured.image}
                  alt={`${featured.title} project preview`}
                  fill
                  sizes="(max-width: 760px) 90vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <p className="eyebrow">{featured.role}</p>
            <h3>{featured.title}</h3>
            <p className="muted-text">{featured.summary}</p>
            {featured.demoUrl && (
              <a
                className="button-secondary"
                href={featured.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit project <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </Card>
          <div>
            <h3>Challenge</h3>
            <p className="panel-intro">{featured.caseStudy.problem}</p>
            <h3>Approach</h3>
            <p className="panel-intro">{featured.caseStudy.solution}</p>
            <h3>Outcome</h3>
            <p className="muted-text">{featured.caseStudy.result}</p>
          </div>
        </div>
      ) : (
        <p className="muted-text">Featured case study details: TODO.</p>
      )}
    </Section>
  );
}
