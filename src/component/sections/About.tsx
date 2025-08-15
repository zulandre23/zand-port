"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { User, Code, Award, MapPin, Globe, Zap, Sparkles } from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiTailwindcss,
  SiMongodb,
  SiTypescript,
  SiJavascript,
  SiPhp,
  SiLaravel,
} from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

/* ========= Profile ========= */
const Profile = () => (
  <div className="space-y-8">
    <div className="relative card-gradient rounded-3xl p-8 overflow-hidden group">
      {/* floating bg */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-0 left-0 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl animate-float"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute top-1/2 right-1/3 w-24 h-24 bg-teal-400/5 rounded-full blur-xl animate-float"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-teal-400 rounded-3xl flex items-center justify-center animate-glow group-hover:scale-110 transition-transform duration-500">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-teal-400 rounded-full animate-ping"></div>
          </div>

          <div className="flex-1">
            <h2 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 mb-4">
              Fullstack Developer
            </h2>
            <p className="text-teal-400 font-semibold flex items-center gap-3 text-lg mb-4">
              <Zap className="w-5 h-5 animate-pulse" />
              Passionate about building web and desktop applications
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-teal-400/10 rounded-full border border-teal-400/20">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span className="text-sm font-medium">Bandung, Indonesia</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-teal-400/10 rounded-full border border-teal-400/20">
                <Globe className="w-4 h-4 text-teal-400" />
                <span className="text-sm font-medium">Open to Remote</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-foreground/90 leading-relaxed text-lg">
            I am a{" "}
            <span className="text-teal-400 font-semibold bg-teal-400/10 px-2 py-1 rounded-lg">
              Fullstack Developer
            </span>{" "}
            experienced in crafting modern, user-friendly applications using
            cutting-edge technologies. With a Bachelor&apos;s degree in
            Informatics from ITENAS Bandung, I bring both academic knowledge and
            practical experience to every project.
          </p>

          <p className="text-foreground/80 leading-relaxed">
            Skilled in both frontend and backend development, with strong{" "}
            <span className="text-teal-400 font-semibold bg-teal-400/10 px-2 py-1 rounded-lg">
              adaptability
            </span>
            ,{" "}
            <span className="text-teal-400 font-semibold bg-teal-400/10 px-2 py-1 rounded-lg">
              attention to detail
            </span>
            , and a focus on delivering{" "}
            <span className="text-teal-400 font-semibold bg-teal-400/10 px-2 py-1 rounded-lg">
              efficient solutions
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  </div>
);

/* ========= Skills ========= */
const Skills = () => {
  const skillList = [
    { name: "Next.js", icon: <SiNextdotjs size={20} /> },
    { name: "React.js", icon: <SiReact size={20} /> },
    { name: "Node.js", icon: <SiNodedotjs size={20} /> },
    { name: "Express.js", icon: <SiExpress size={20} /> },
    { name: "MySQL", icon: <SiMysql size={20} /> },
    { name: "MongoDB", icon: <SiMongodb size={20} /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={20} /> },
    { name: "TypeScript", icon: <SiTypescript size={20} /> },
    { name: "JavaScript", icon: <SiJavascript size={20} /> },
    { name: "PHP", icon: <SiPhp size={20} /> },
    { name: "Laravel", icon: <SiLaravel size={20} /> },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {skillList.map((skill, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 p-3 rounded-xl border border-teal-400/20 bg-teal-400/5 hover:bg-teal-400/10 transition-all"
        >
          {skill.icon}
          <span className="text-sm font-medium">{skill.name}</span>
        </div>
      ))}
    </div>
  );
};

/* ========= Experience ========= */
const Experience = () => {
  const experiences = [
    {
      title: "Frontend Developer, Freelance",
      description:
        "Developed and designed a comprehensive e-learning module website using Next.js and Tailwind CSS. Created responsive landing page layouts, intuitive module interfaces, and cohesive design systems that enhanced user experience.",
    },
    {
      title: "WordPress Developer, Freelance",
      description:
        "Designed and developed custom virtual invitation websites using WordPress, creating personalized digital invitation experiences tailored to client specifications.",
    },
    {
      title: "Frontend Developer Intern, Assist.id",
      description:
        "Designed and developed the help center page for Assist.id’s Clinical Pro system, creating an intuitive and responsive knowledge base interface to guide users through key healthcare workflows.",
    },
  ];

  return (
    <div className="space-y-6">
      {experiences.map((exp, idx) => (
        <div
          key={idx}
          className="p-6 rounded-xl bg-teal-400/10 hover:bg-teal-400/20 transition"
        >
          <h3 className="text-lg font-bold text-teal-400 mb-2">{exp.title}</h3>
          <p className="text-sm text-foreground/80">{exp.description}</p>
        </div>
      ))}

      <div className="mt-6 p-6 rounded-xl border border-teal-400/30">
        <h3 className="text-lg font-bold text-teal-400 mb-2">Education</h3>
        <p className="text-sm font-semibold">
          2017–2024 — Bachelor of Informatics
        </p>
        <p className="text-sm">
          National Institute of Technology (ITENAS), Bandung
        </p>
      </div>
    </div>
  );
};

/* ========= About Navigation ========= */
interface AboutNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AboutNavigation: React.FC<AboutNavigationProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const subSections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "experience", label: "Experience", icon: Award },
  ];

  return (
    <div className="flex justify-center mb-12 px-4">
      <div className="relative inline-flex rounded-2xl p-2 w-full max-w-md border border-teal-400/20 bg-teal-400/5">
        <motion.div
          layout
          className="absolute top-2 bottom-2 rounded-xl bg-teal-400/20"
          initial={false}
          animate={{
            x: `${
              subSections.findIndex((s) => s.id === activeSection) *
              (100 / subSections.length)
            }%`,
            width: `${100 / subSections.length}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        {subSections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`relative flex items-center justify-center gap-2 px-4 py-4 rounded-xl transition-all duration-300 flex-1 z-10 ${
              activeSection === section.id
                ? "text-teal-400 font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <section.icon className="w-5 h-5" />
            <span className="text-sm font-semibold hidden sm:inline">
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ========= Main About Section ========= */
interface AboutSectionProps {
  onNavigateToContact?: () => void;
  onExitAbout?: (direction: number) => void;
  onSubSectionChange?: (index: number) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onExitAbout }) => {
  const [currentSubSection, setCurrentSubSection] = useState(0);
  const isTransitioningRef = useRef(false);
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const subSections = useMemo(() => ["profile", "skills", "experience"], []);
  const activeSection = subSections[currentSubSection];
  const touchStartYRef = useRef<number | null>(null);

  const handleInternalScroll = useCallback(
    (e: WheelEvent) => {
      const aboutContainer = aboutContainerRef.current;
      const contentContainer = contentRef.current;

      if (!aboutContainer || !contentContainer) return;
      if (!aboutContainer.contains(e.target as Node)) return;
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1; // 1 = scroll down, -1 = scroll up
      const scrollTop = contentContainer.scrollTop;
      const scrollHeight = contentContainer.scrollHeight;
      const clientHeight = contentContainer.clientHeight;

      const atBottom = scrollTop + clientHeight >= scrollHeight - 5;
      const atTop = scrollTop <= 5;

      // Hanya pindah subsection kalau sudah di ujung
      if ((direction > 0 && atBottom) || (direction < 0 && atTop)) {
        e.preventDefault();
        const nextIndex = currentSubSection + direction;
        if (nextIndex >= 0 && nextIndex < subSections.length) {
          isTransitioningRef.current = true;
          setCurrentSubSection(nextIndex);
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 700);
        } else if (onExitAbout) {
          onExitAbout(direction);
        }
      }
    },
    [currentSubSection, subSections, onExitAbout]
  );
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartYRef.current - touchEndY;

      const contentContainer = contentRef.current;
      if (!contentContainer) return;

      const scrollTop = contentContainer.scrollTop;
      const scrollHeight = contentContainer.scrollHeight;
      const clientHeight = contentContainer.clientHeight;

      const atBottom = scrollTop + clientHeight >= scrollHeight - 5;
      const atTop = scrollTop <= 5;

      const direction = deltaY > 50 ? 1 : deltaY < -50 ? -1 : 0;

      if (
        direction !== 0 &&
        ((direction > 0 && atBottom) || (direction < 0 && atTop))
      ) {
        const nextIndex = currentSubSection + direction;
        if (nextIndex >= 0 && nextIndex < subSections.length) {
          isTransitioningRef.current = true;
          setCurrentSubSection(nextIndex);
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 700);
        } else if (onExitAbout) {
          onExitAbout(direction);
        }
      }

      touchStartYRef.current = null;
    },
    [currentSubSection, subSections, onExitAbout]
  );

  useEffect(() => {
    const container = aboutContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleInternalScroll, {
        passive: false,
      });
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        container.removeEventListener("wheel", handleInternalScroll);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [handleInternalScroll, handleTouchStart, handleTouchEnd]);

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <Profile />;
      case "skills":
        return <Skills />;
      case "experience":
        return <Experience />;
      default:
        return <Profile />;
    }
  };

  return (
    <div
      ref={aboutContainerRef}
      className="h-screen overflow-hidden flex flex-col"
      data-scroll-area="about"
    >
      <div className="py-12 px-4 text-center border-b border-teal-400/20">
        <h1 className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
          About Me
        </h1>
      </div>

      <div className="py-8">
        <AboutNavigation
          activeSection={activeSection}
          onSectionChange={(sectionId) => {
            const idx = subSections.indexOf(sectionId);
            if (idx !== -1) setCurrentSubSection(idx);
          }}
        />
        <div
          ref={contentRef}
          className="max-w-6xl mx-auto flex-1 overflow-y-auto pb-48"
          style={{ height: "calc(100vh - 200px)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
