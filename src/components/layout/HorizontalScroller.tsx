"use client";

import {
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";
import { Header, type SectionLink } from "@/components/layout/Header";
import { ProgressIndicator } from "@/components/layout/ProgressIndicator";
import { WelcomeCover } from "@/components/layout/WelcomeCover";

type Panel = SectionLink & {
  content: ReactNode;
};

type DragState = {
  pointerId: number;
  startX: number;
  startScrollLeft: number;
  moved: boolean;
};

const sections: SectionLink[] = [
  { id: "home", title: "Home" },
  { id: "about", title: "About" },
  { id: "projects", title: "Projects" },
  { id: "stack", title: "Stack" },
  { id: "experience", title: "Experience" },
  { id: "contact", title: "Contact" },
];

export function HorizontalScroller() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const currentSectionRef = useRef(0);
  const dragRef = useRef<DragState | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const dismissWelcome = useCallback(() => setShowWelcome(false), []);

  const scrollToSection = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller || index < 0 || index >= sections.length) return;

    scroller.scrollTo({
      left: index * scroller.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    currentSectionRef.current = index;
    setCurrentSection(index);
  }, []);

  const panels: Panel[] = [
    {
      ...sections[0],
      content: (
        <Hero
          onNavigate={(id) =>
            scrollToSection(sections.findIndex((section) => section.id === id))
          }
        />
      ),
    },
    { ...sections[1], content: <About /> },
    { ...sections[2], content: <Projects /> },
    { ...sections[3], content: <TechStack /> },
    { ...sections[4], content: <Experience /> },
    { ...sections[5], content: <Contact /> },
  ];

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const panelContent = target.closest<HTMLElement>(".panel-scroll");
      if (panelContent) {
        const canScrollVertically =
          panelContent.scrollHeight > panelContent.clientHeight &&
          ((event.deltaY < 0 && panelContent.scrollTop > 0) ||
            (event.deltaY > 0 &&
              panelContent.scrollTop + panelContent.clientHeight <
                panelContent.scrollHeight - 1));
        if (canScrollVertically) return;
      }

      event.preventDefault();
      scroller.scrollBy({ left: event.deltaY, behavior: "auto" });
    };

    const handleResize = () => {
      scroller.scrollTo({
        left: currentSectionRef.current * scroller.clientWidth,
        behavior: "auto",
      });
    };

    scroller.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);
    return () => {
      scroller.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller || !scroller.clientWidth) return;
    const nextSection = Math.min(
      sections.length - 1,
      Math.max(0, Math.round(scroller.scrollLeft / scroller.clientWidth))
    );
    currentSectionRef.current = nextSection;
    setCurrentSection(nextSection);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToSection(currentSection + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToSection(currentSection - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToSection(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToSection(sections.length - 1);
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    if (!(event.target instanceof Element)) return;
    if (event.target.closest("a, button, input, textarea, select, [contenteditable]")) {
      return;
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const delta = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(delta) < 4) return;

    if (!drag.moved) {
      drag.moved = true;
      event.currentTarget.classList.add("is-dragging");
      window.getSelection()?.removeAllRanges();
    }

    event.preventDefault();
    event.currentTarget.scrollLeft = drag.startScrollLeft - delta;
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;
    event.currentTarget.classList.remove("is-dragging");
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="portfolio-shell">
      <Header
        sections={sections}
        currentSection={currentSection}
        onNavigate={scrollToSection}
      />
      <main
        ref={scrollerRef}
        id="main-container"
        className="horizontal-scroller"
        tabIndex={0}
        inert={showWelcome}
        aria-label="Portfolio panels. Use the arrow keys to navigate."
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        {panels.map((panel) => (
          <div className="panel-slot" key={panel.id}>
            {panel.content}
          </div>
        ))}
      </main>
      <ProgressIndicator
        sections={sections}
        currentSection={currentSection}
        onNavigate={scrollToSection}
      />
      {showWelcome && (
        <WelcomeCover onComplete={dismissWelcome} />
      )}
    </div>
  );
}
