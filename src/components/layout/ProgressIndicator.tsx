import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SectionLink } from "@/components/layout/Header";

type ProgressIndicatorProps = {
  sections: SectionLink[];
  currentSection: number;
  onNavigate: (index: number) => void;
};

export function ProgressIndicator({
  sections,
  currentSection,
  onNavigate,
}: ProgressIndicatorProps) {
  return (
    <div className="scroller-footer" aria-label="Section navigation">
      <span className="muted-text" aria-live="polite">
        {String(currentSection + 1).padStart(2, "0")} /{" "}
        {String(sections.length).padStart(2, "0")}
      </span>
      <div className="progress-dots" aria-label="Choose a section">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            aria-label={`Go to ${section.title}`}
            aria-current={index === currentSection ? "step" : undefined}
            onClick={() => onNavigate(index)}
          />
        ))}
      </div>
      <div className="panel-controls">
        <button
          type="button"
          className="icon-button nav-button"
          aria-label="Previous section"
          disabled={currentSection === 0}
          onClick={() => onNavigate(currentSection - 1)}
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="icon-button nav-button"
          aria-label="Next section"
          disabled={currentSection === sections.length - 1}
          onClick={() => onNavigate(currentSection + 1)}
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
