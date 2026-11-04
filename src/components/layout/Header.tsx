"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export type SectionLink = {
  id: string;
  title: string;
};

type HeaderProps = {
  sections: SectionLink[];
  currentSection: number;
  onNavigate: (index: number) => void;
};

export function Header({
  sections,
  currentSection,
  onNavigate,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (index: number) => {
    onNavigate(index);
    setMenuOpen(false);
  };

  return (
    <header className="portfolio-header">
      <a
        className="brand-mark"
        href="#home"
        onClick={(event) => {
          event.preventDefault();
          navigate(0);
        }}
      >
        <span aria-hidden="true">Z</span>
        ZAND
      </a>
      <nav
        className="header-nav"
        aria-label="Portfolio sections"
        id="portfolio-navigation"
        data-open={menuOpen}
      >
        {sections.map((section, index) => (
          <button
            type="button"
            key={section.id}
            aria-current={currentSection === index ? "page" : undefined}
            onClick={() => navigate(index)}
          >
            {section.title}
          </button>
        ))}
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <button
          type="button"
          className="icon-button menu-toggle"
          aria-label={menuOpen ? "Close section menu" : "Open section menu"}
          aria-expanded={menuOpen}
          aria-controls="portfolio-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X size={19} aria-hidden="true" />
          ) : (
            <Menu size={19} aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}
