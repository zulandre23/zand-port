import modisImage from "@/app/assets/MODIS.png";
import plannerImage from "@/app/assets/PP.png";
import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "e-modul-modis",
    title: "E-Modul MODIS",
    summary:
      "Frontend for an educational module website designed to help teachers deliver materials to students with visual impairments.",
    role: "Frontend Developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: modisImage,
    demoUrl: "https://education-module.vercel.app/",
    status: "live",
  },
  {
    slug: "project-planner",
    title: "Project Planner",
    summary:
      "A web dashboard for managing projects with metrics, scope, workflows, data sources, and core functionality.",
    role: "Frontend Developer",
    stack: ["JavaScript", "HTML5", "CSS3"],
    image: plannerImage,
    demoUrl: "https://project-planner-zand-zone.vercel.app/",
    status: "live",
  },
];
