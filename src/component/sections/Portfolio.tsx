import React, { useState, useEffect, useCallback } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import {
  Briefcase,
  Github,
  ExternalLink,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import modisImg from "@/app/assets/MODIS.png";
import plannerImg from "@/app/assets/PP.png";
import CsImg1 from "@/app/assets/CS-1.jpg";
import CsImg2 from "@/app/assets/CS-10.jpg";
import CsImg3 from "@/app/assets/CS-11.jpg";

interface Project {
  id: number;
  title: string;
  languages: string[];
  description: string;
  image: string | StaticImageData;
  category: string;
  demoLink?: string;
}

const PortfolioSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Modul MODIS",
      languages: ["NextJs", "TypeScript", "TailwindCSS"],
      description:
        "Developed the frontend of a web-based educational module designed for teachers. I was responsible for creating the landing page, e-module layout, and interface design, ensuring a responsive and intuitive experience. The platform helps teachers deliver sexual education materials effectively to students with visual impairments through accessible and well-structured content.",
      image: modisImg,
      category: "Frontend",
      demoLink: "https://education-module.vercel.app/",
    },
    {
      id: 2,
      title: "Project Planner",
      languages: ["JavaScript", "HTML5", "CSS3"],
      description:
        "Developed a web-based dashboard to manage multiple projects with key metrics such as total projects, duration, tech stack, and average timeline. The platform features project cards highlighting scope, workflow, data sources, and core functionalities. I was responsible for designing and implementing the frontend interface, ensuring a clean, responsive, and visually engaging layout that simplifies project tracking and management.",
      image: plannerImg,
      category: "Frontend",
      demoLink: "https://project-planner-zand-zone.vercel.app/",
    },
    {
      id: 3,
      title: "Comming Soon",
      languages: ["CommingSoon", "CommingSoon", "CommingSoon"],
      description: "PROJECT COMMING SOON.",
      image: CsImg1,
      category: "CommingSoon",
    },
    {
      id: 4,
      title: "CommingSoon",
      languages: ["CommingSoon", "CommingSoon", "CommingSoon", "CommingSoon"],
      description: "PROJECT COMMING SOON.",
      image: CsImg2,
      category: "CommingSoon",
    },
    {
      id: 5,
      title: "CommingSoon",
      languages: ["CommingSoon", "CommingSoon", "CommingSoon", "CommingSoon"],
      description: "PROJECT COMMING SOON.",
      image: CsImg3,
      category: "CommingSoon",
    },
  ];

  // Stabilkan fungsi agar aman dimasukkan ke dependency array
  const nextProject = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevProject = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const goToProject = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning, currentIndex]
  );
  // Auto-slide setiap 4 detik
  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return;
    const interval = setInterval(() => {
      nextProject();
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isTransitioning, nextProject]);

  // Scroll/hover detection
  useEffect(() => {
    const handleScrollStart = () => {
      window.dispatchEvent(new CustomEvent("portfolio-scroll-start"));
    };
    const handleScrollEnd = () => {
      window.dispatchEvent(new CustomEvent("portfolio-scroll-end"));
    };

    const section = document.querySelector('[data-scroll-area="portfolio"]');
    if (section) {
      section.addEventListener("touchstart", handleScrollStart);
      section.addEventListener("touchend", handleScrollEnd);
      section.addEventListener("mouseenter", handleScrollStart);
      section.addEventListener("mouseleave", handleScrollEnd);
    }

    return () => {
      if (section) {
        section.removeEventListener("touchstart", handleScrollStart);
        section.removeEventListener("touchend", handleScrollEnd);
        section.removeEventListener("mouseenter", handleScrollStart);
        section.removeEventListener("mouseleave", handleScrollEnd);
      }
    };
  }, []);

  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-500",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      React: "bg-cyan-500",
      "React Native": "bg-purple-500",
      "Vue.js": "bg-emerald-500",
      "Node.js": "bg-lime-500",
      MongoDB: "bg-green-600",
      PostgreSQL: "bg-indigo-500",
      Firebase: "bg-orange-500",
      Django: "bg-green-700",
      "Chart.js": "bg-pink-500",
      "D3.js": "bg-red-400",
      TensorFlow: "bg-orange-600",
      FastAPI: "bg-teal-600",
      CommingSoon: "bg-white",
    };
    return colors[language] || "bg-gray-500";
  };

  return (
    <section
      data-scroll-area="portfolio"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4 py-8 lg:py-12 
             overflow-y-auto lg:overflow-visible max-h-screen"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-screen lg:h-auto">
        {/* LEFT PANEL */}
        <div className="lg:w-1/3 flex flex-col justify-start lg:justify-center space-y-6 flex-shrink-0 lg:-translate-y-24">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-teal-400 to-cyan-500 p-3 rounded-2xl w-fit shadow-lg">
              <Briefcase className="text-black w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                MY{" "}
                <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                  PORTFOLIO
                </span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mt-2"></div>
            </div>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              Showcase of my latest projects and innovations in web development,
              mobile apps, and AI solutions.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 transition-all duration-300 px-6 py-3 rounded-xl flex items-center justify-center gap-3 border border-gray-700/50"
            >
              {isAutoPlaying ? <Pause size={18} /> : <Play size={18} />}
              <span className="font-medium">
                {isAutoPlaying ? "Pause" : "Play"}
              </span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={prevProject}
                disabled={isTransitioning}
                className="bg-teal-400/10 hover:bg-teal-400/20 border border-teal-400/30 disabled:opacity-50 transition-all duration-300 p-3 rounded-xl transform hover:scale-105"
              >
                <ChevronLeft className="text-teal-400 w-5 h-5 lg:transform lg:rotate-90" />
              </button>
              <button
                onClick={nextProject}
                disabled={isTransitioning}
                className="bg-teal-400/10 hover:bg-teal-400/20 border border-teal-400/30 disabled:opacity-50 transition-all duration-300 p-3 rounded-xl transform hover:scale-105"
              >
                <ChevronRight className="text-teal-400 w-5 h-5 lg:transform lg:rotate-90" />
              </button>
            </div>
          </div>

          {/* Project Counter */}
          <div className="text-sm text-gray-500">
            <span className="text-teal-400 font-bold text-lg">
              {currentIndex + 1}
            </span>{" "}
            / {projects.length}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          className="lg:w-2/3 relative flex flex-col lg:flex-row items-start lg:items-center justify-center 
             min-h-[500px] lg:min-h-[600px] flex-grow h-auto lg:h-full overflow-visible lg:translate-y-8"
        >
          <div
            data-portfolio-content="true"
            className="w-full lg:relative lg:max-w-2xl h-auto lg:h-full lg:overflow-visible pt-8"
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`
                  transition-all duration-700 ease-in-out transform
                  ${
                    index === currentIndex
                      ? "translate-x-0 scale-100 opacity-100 z-30"
                      : index === (currentIndex + 1) % projects.length ||
                        (currentIndex === 0 && index === projects.length - 1)
                      ? "translate-x-full scale-95 opacity-30 z-10 lg:translate-x-0 lg:translate-y-full lg:scale-90 lg:opacity-40"
                      : index ===
                          (currentIndex - 1 + projects.length) %
                            projects.length ||
                        (currentIndex === projects.length - 1 && index === 0)
                      ? "-translate-x-full scale-95 opacity-30 z-10 lg:translate-x-0 lg:-translate-y-full lg:scale-90 lg:opacity-40"
                      : "translate-x-full scale-75 opacity-0 z-0 lg:translate-y-full"
                  }
                  ${
                    index === currentIndex
                      ? "relative"
                      : "absolute inset-0 lg:absolute lg:inset-0"
                  }
                `}
              >
                <div
                  className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl 
                             overflow-hidden shadow-2xl border border-gray-700/30 
                             min-h-screen lg:min-h-0 flex flex-col"
                >
                  <div className="flex flex-col h-full">
                    {/* IMAGE */}
                    <div className="h-48 sm:h-56 lg:h-64 relative overflow-hidden flex-shrink-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={500}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <span className="absolute top-4 left-4 bg-gradient-to-r from-teal-400 to-cyan-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        {project.category}
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6 flex flex-col flex-grow justify-center space-y-4 min-h-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                        {project.title}
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {project.languages.map((lang, idx) => (
                          <span
                            key={`${lang}-${idx}`}
                            className={`${getLanguageColor(
                              lang
                            )} px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm`}
                          >
                            {lang}
                          </span>
                        ))}
                      </div>

                      <p className="text-gray-300 leading-relaxed text-sm line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-black px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-400/25">
                          <Github size={16} />
                          <span>View Code</span>
                        </button>
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-teal-400/50 hover:border-teal-400 hover:bg-teal-400/10 px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all duration-300"
                          >
                            <ExternalLink size={16} />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DOTS INDICATOR */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 
                lg:static lg:translate-x-0 lg:flex-col lg:items-end lg:gap-4 lg:ml-auto lg:mr-4"
          >
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-teal-400 to-cyan-500 scale-125 shadow-lg"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
