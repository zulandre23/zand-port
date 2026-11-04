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
  year?: number;
  status?: ProjectStatus;
};

export type Experience = {
  title: string;
  organization?: string;
  period?: string;
  project?: string;
  description: string;
  highlights?: string[];
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  bio: string;
  availability: string;
  email: string;
  socials: {
    label: "GitHub" | "LinkedIn" | "Instagram";
    href: string;
  }[];
};

export type StackGroup = {
  name: string;
  technologies: string[];
};
