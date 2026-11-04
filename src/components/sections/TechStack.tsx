import {
  FiGitPullRequest,
  FiServer,
  FiShield,
} from "react-icons/fi";
import {
  FaJava,
} from "react-icons/fa6";
import {
  SiCss3,
  SiFigma,
  SiGit,
  SiGithub,
  SiGitlab,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiNextdotjs,
  SiNuxtdotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { stack } from "@/data/stack";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

const technologyIcons: Record<string, IconType> = {
  "Nuxt.js (Vue.js)": SiNuxtdotjs,
  "Next.js": SiNextdotjs,
  "React.js": SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss3,
  "Tailwind CSS": SiTailwindcss,
  Laravel: SiLaravel,
  PHP: SiPhp,
  "REST API": FiServer,
  PostgreSQL: SiPostgresql,
  Sanctum: FiShield,
  "Supabase (Auth)": SiSupabase,
  "REST API integration": FiGitPullRequest,
  Git: SiGit,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Figma: SiFigma,
  Vercel: SiVercel,
  Python: SiPython,
  Java: FaJava,
};

export function TechStack() {
  return (
    <Section id="stack" title="Tools of the trade" eyebrow="04 / Capabilities">
      <div className="card-grid">
        {stack.map((group) => (
          <Card key={group.name} className="project-card">
            <h3>{group.name}</h3>
            <ul className="tag-list">
              {group.technologies.map((technology) => {
                const Icon = technologyIcons[technology];

                return (
                  <li className="technology-chip" key={technology}>
                    <Icon size={16} aria-hidden="true" />
                    {technology}
                  </li>
                );
              })}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
