import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram,
};

export function Contact() {
  return (
    <Section id="contact" title="Let’s connect" eyebrow="06 / Contact">
      <p className="panel-intro">
        Have a project or opportunity in mind? Find me through these channels.
      </p>
      <div className="contact-list">
        <a className="surface-card contact-link" href={`mailto:${profile.email}`}>
          <Mail size={18} aria-hidden="true" />
          <span>Email</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        {profile.socials.map((social) => {
          const Icon = socialIcons[social.label];

          return (
            <a
              className="surface-card contact-link"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              key={social.label}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{social.label}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </Section>
  );
}
