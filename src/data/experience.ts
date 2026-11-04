import type { Experience } from "@/types";

export const experience: Experience[] = [
  {
    title: "Frontend Developer (Contract Partner)",
    organization: "PT Sinergi Informatika Semen Indonesia",
    period: "Aug 2025 – Dec 2025",
    project:
      "PROCSI (Procurement System Integration): enterprise e-procurement application",
    description:
      "Built and integrated frontend features for the procurement lifecycle using Nuxt.js, TypeScript, and Tailwind CSS.",
    highlights: [
      "Built the frontend for 16+ modules covering the procurement lifecycle (PR management, RFQ, tender invitation, bid opening, evaluation, negotiation, awarding) using Nuxt.js, TypeScript, and Tailwind CSS, based on Figma designs.",
      "Developed reusable components, including a non-standard data table and an amendment datatable, to match design and client requirements.",
      "Integrated modules with REST APIs and traced failed requests with backend developers to determine whether issues came from the frontend or backend.",
      "Created dummy API endpoints so frontend work could proceed in parallel with backend development.",
      "Delivered contract-management features: built the UI for PO Callout, and the UI plus API integration for Amendment, PO Spot, and AdHoc Processing, fixing integration issues found during testing with QA.",
    ],
  },
  {
    title: "Frontend Developer, Freelance",
    description:
      "Developed and designed an e-learning module website using Next.js and Tailwind CSS, including responsive landing page layouts and module interfaces.",
  },
  {
    title: "WordPress Developer, Freelance",
    description:
      "Designed and developed custom virtual invitation websites tailored to client specifications.",
  },
  {
    title: "Frontend Developer Intern",
    organization: "Assist.id",
    description:
      "Designed and developed the help center page for Assist.id’s Clinical Pro system, creating a responsive knowledge base interface.",
  },
];
