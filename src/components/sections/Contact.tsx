import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";

export function Contact() {
  return (
    <Section id="contact" title="Let’s connect" eyebrow="06 / Contact">
      <p className="panel-intro">
        Have a project or opportunity in mind? Find me through these channels.
      </p>
      <div className="contact-list">
        {profile.socials.map((social) => (
          <a
            className="surface-card contact-link"
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            key={social.label}
          >
            {social.label} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
      </div>
    </Section>
  );
}
