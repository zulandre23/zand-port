"use client";

import Image from "next/image";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowUp,
  Pause,
  Play,
} from "lucide-react";
import { projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export function Projects() {
  const touchStartY = useRef<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const currentIndex =
    ((currentStep % projects.length) + projects.length) % projects.length;

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const updateMotionPreference = () =>
      setPrefersReducedMotion(motionPreference.matches);
    const updateVisibility = () =>
      setIsPageVisible(document.visibilityState === "visible");

    updateMotionPreference();
    updateVisibility();
    motionPreference.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      motionPreference.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  const scrollToProject = useCallback((index: number) => {
    const targetIndex = (index + projects.length) % projects.length;
    setCurrentStep((step) => {
      const currentIndex = ((step % projects.length) + projects.length) % projects.length;
      let difference = targetIndex - currentIndex;

      if (difference > projects.length / 2) {
        difference -= projects.length;
      } else if (difference < -projects.length / 2) {
        difference += projects.length;
      }

      return step + difference;
    });
  }, []);

  const moveProject = useCallback((direction: number) => {
    setCurrentStep((step) => step + direction);
  }, []);

  useEffect(() => {
    if (
      !isAutoplayEnabled ||
      isInteractionPaused ||
      !isPageVisible ||
      prefersReducedMotion ||
      projects.length < 2
    ) {
      return;
    }

    const interval = window.setInterval(() => moveProject(1), 5000);

    return () => window.clearInterval(interval);
  }, [
    currentIndex,
    isAutoplayEnabled,
    isInteractionPaused,
    isPageVisible,
    moveProject,
    prefersReducedMotion,
  ]);

  return (
    <Section id="projects" title="Selected projects" eyebrow="03 / Work">
      {projects.length > 0 ? (
        <div
          className="projects-carousel"
          role="group"
          aria-roledescription="carousel"
          aria-label="Projects"
          onMouseEnter={() => setIsInteractionPaused(true)}
          onMouseLeave={() => setIsInteractionPaused(false)}
          onFocusCapture={() => setIsInteractionPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsInteractionPaused(false);
            }
          }}
        >
        <div
          className="project-carousel"
            onTouchStart={(event) => {
              touchStartY.current = event.touches[0]?.clientY ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchStartY.current === null) return;
              const deltaY = touchStartY.current - event.changedTouches[0].clientY;
              if (Math.abs(deltaY) > 40) {
                moveProject(deltaY > 0 ? 1 : -1);
              }
              touchStartY.current = null;
            }}
          >
            <div className="project-carousel-track">
              {[currentStep - 1, currentStep, currentStep + 1].map((step) => {
                const offset = step - currentStep;
                const index =
                  ((step % projects.length) + projects.length) % projects.length;
                const project = projects[index];

                return (
                <article
                  className={`project-slide${offset === 0 ? " is-active" : ""}`}
                  key={step}
                  style={
                    {
                      "--slide-offset": `${offset * 70}%`,
                    } as CSSProperties
                  }
                  aria-hidden={offset !== 0}
                  aria-label={`${project.title}, project ${index + 1} of ${projects.length}`}
                  inert={offset !== 0}
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
                );
              })}
            </div>
          </div>
          <div className="project-carousel-controls">
            {projects.length > 1 && (
              <button
                type="button"
                className="icon-button"
                aria-label={
                  isAutoplayEnabled
                    ? "Pause project autoplay"
                    : "Play project autoplay"
                }
                aria-pressed={isAutoplayEnabled}
                onClick={() => setIsAutoplayEnabled((enabled) => !enabled)}
              >
                {isAutoplayEnabled ? (
                  <Pause size={18} aria-hidden="true" />
                ) : (
                  <Play size={18} aria-hidden="true" />
                )}
              </button>
            )}
            <button
              type="button"
              className="icon-button"
              aria-label="Previous project"
              onClick={() => moveProject(-1)}
            >
              <ArrowUp size={18} aria-hidden="true" />
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
              onClick={() => moveProject(1)}
            >
              <ArrowDown size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
        <p className="muted-text">Projects will be added soon.</p>
      )}
    </Section>
  );
}
