"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export function Projects() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToProject = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const nextIndex = (index + projects.length) % projects.length;
    carousel.scrollTo({
      left: nextIndex * carousel.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    setCurrentIndex(nextIndex);
  };

  return (
    <Section id="projects" title="Selected projects" eyebrow="03 / Work">
      {projects.length > 0 ? (
        <div className="projects-carousel">
          <div
            ref={carouselRef}
            className="project-carousel"
            aria-label="Projects carousel"
            onScroll={(event) => {
              const carousel = event.currentTarget;
              if (!carousel.clientWidth) return;
              setCurrentIndex(
                Math.min(
                  projects.length - 1,
                  Math.max(0, Math.round(carousel.scrollLeft / carousel.clientWidth))
                )
              );
            }}
          >
            <div className="project-carousel-track">
              {projects.map((project, index) => (
                <article
                  className="project-slide"
                  key={project.slug}
                  aria-label={`${project.title}, project ${index + 1} of ${projects.length}`}
                >
                  <Card className="project-card">
                    {project.image ? (
                      <div className="project-image">
                        <Image
                          src={project.image}
                          alt={`${project.title} project preview`}
                          fill
                          sizes="(max-width: 760px) 85vw, 65vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ) : (
                      <div className="project-image project-image-placeholder">
                        Preview unavailable
                      </div>
                    )}
                    <p className="eyebrow">
                      {project.role ?? "Project"}{" "}
                      {project.year ? ` / ${project.year}` : ""}
                    </p>
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
                    <ul
                      className="tag-list"
                      aria-label={`${project.title} technology stack`}
                    >
                      {project.stack.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  </Card>
                </article>
              ))}
            </div>
          </div>
          <div className="project-carousel-controls">
            <button
              type="button"
              className="icon-button"
              aria-label="Previous project"
              onClick={() => scrollToProject(currentIndex - 1)}
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <div className="progress-dots" aria-label="Choose a project">
              {projects.map((project, index) => (
                <button
                  type="button"
                  key={project.slug}
                  aria-label={`Show project ${index + 1}: ${project.title}`}
                  aria-current={index === currentIndex ? "step" : undefined}
                  onClick={() => scrollToProject(index)}
                />
              ))}
            </div>
            <span className="muted-text" aria-live="polite">
              {currentIndex + 1} / {projects.length}
            </span>
            <button
              type="button"
              className="icon-button"
              aria-label="Next project"
              onClick={() => scrollToProject(currentIndex + 1)}
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
        <p className="muted-text">Projects will be added soon.</p>
      )}
    </Section>
  );
}
