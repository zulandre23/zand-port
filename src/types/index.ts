import type { StaticImageData } from "next/image";

export type ProjectStatus = "live" | "wip" | "archived";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  role?: string;
  stack: string[];
  image?: string | StaticImageData;
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  year?: number;
  status?: ProjectStatus;
  caseStudy?: {
    problem: string;
    solution: string;
    result: string;
  };
};

export type Experience = {
  title: string;
  organization?: string;
  period?: string;
  description: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  bio: string;
  availability: string;
  socials: {
    label: string;
    href: string;
  }[];
};

export type StackGroup = {
  name: string;
  technologies: string[];
};
