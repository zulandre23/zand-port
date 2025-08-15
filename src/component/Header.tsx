import React, { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Logo from "@/app/assets/ZZ-NO-BG.png";

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface HeaderProps {
  sections: Section[];
  currentSection: number;
  scrollToSection: (index: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  sections,
  currentSection,
  scrollToSection,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (index: number) => {
    scrollToSection(index);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-90 backdrop-blur-md border-b border-teal-400/20">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          {/* Logo Section - Clickable */}
          <button
            onClick={() => scrollToSection(0)}
            className="flex items-center space-x-2 sm:space-x-3 hover:scale-105 transition-transform duration-300"
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 border-teal-400/60 shadow-lg relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(64,224,208,0.2) 0%, rgba(13,148,136,0.3) 50%, rgba(20,184,166,0.2) 100%)",
                boxShadow:
                  "0 0 25px rgba(64, 224, 208, 0.4), inset 0 0 20px rgba(64, 224, 208, 0.1)",
              }}
            >
              <Image
                src={Logo}
                alt="ZAND Logo"
                width={24}
                height={24}
                className="object-contain relative z-10"
                style={{
                  filter:
                    "brightness(1.2) contrast(1.3) drop-shadow(0 0 8px rgba(64, 224, 208, 0.8))",
                }}
              />

              {/* Outer glow effect */}
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  background:
                    "radial-gradient(circle, transparent 70%, rgba(64, 224, 208, 0.3) 100%)",
                  animationDuration: "3s",
                }}
              />
            </div>

            <div className="flex items-center">
              <span
                className="text-teal-400 font-black text-lg sm:text-xl ml-1"
                style={{
                  textShadow: "0 0 10px rgba(64, 224, 208, 0.5)",
                }}
              >
                [Z]
              </span>
              <span className="text-white font-bold text-lg sm:text-xl">
                AND
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {sections.map((section, navIndex) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(navIndex)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    currentSection === navIndex
                      ? "bg-gradient-to-r from-teal-400 to-cyan-400 text-black shadow-lg"
                      : "text-white hover:bg-gray-700/50 hover:text-teal-400"
                  }`}
                  style={{
                    boxShadow:
                      currentSection === navIndex
                        ? "0 0 20px rgba(64, 224, 208, 0.4)"
                        : "none",
                  }}
                >
                  <Icon size={18} />
                  <span className="font-medium">{section.title}</span>
                </button>
              );
            })}
          </nav>

          {/* Tablet Navigation (Icons Only) */}
          <nav className="hidden md:flex lg:hidden space-x-1">
            {sections.map((section, navIndex) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(navIndex)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    currentSection === navIndex
                      ? "bg-gradient-to-r from-teal-400 to-cyan-400 text-black shadow-lg"
                      : "text-white hover:bg-gray-700/50 hover:text-teal-400"
                  }`}
                  style={{
                    boxShadow:
                      currentSection === navIndex
                        ? "0 0 20px rgba(64, 224, 208, 0.4)"
                        : "none",
                  }}
                  title={section.title}
                >
                  <Icon size={18} />
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-teal-400 transition-colors duration-300 p-2 relative z-50"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Slide Down */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-teal-400/20 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(17,24,39,0.95) 100%)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="py-2">
            {sections.map((section, navIndex) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(navIndex)}
                  className={`w-full flex items-center space-x-3 px-6 py-3 transition-all duration-300 ${
                    currentSection === navIndex
                      ? "bg-gradient-to-r from-teal-400/20 to-cyan-400/20 text-teal-400 border-r-4 border-teal-400"
                      : "text-white hover:bg-gray-700/30 hover:text-teal-400"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Spacer untuk mobile menu agar tidak overlap dengan konten */}
      {isMobileMenuOpen && (
        <div className="md:hidden h-16" style={{ marginTop: "64px" }} />
      )}
    </>
  );
};

export default Header;
