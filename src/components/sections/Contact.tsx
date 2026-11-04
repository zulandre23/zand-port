import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/app/assets/ZZ-NO-BG.png";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";

const builtWith = ["Next.js", "TypeScript", "Tailwind CSS"];

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram,
};

export function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <Section id="contact" title="Let’s connect" eyebrow="06 / Contact">
      <div className="contact-mondrian-layout">
        <div className="contact-main">
          <p className="panel-intro">
            Have a project or opportunity in mind? Find me through these
            channels.
          </p>
          <div className="contact-mondrian">
            <a
              className="contact-tile contact-email"
              href={`mailto:${profile.email}`}
            >
              <Mail size={24} aria-hidden="true" />
              <span>Email</span>
              <strong>{profile.email}</strong>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            {profile.socials.map((social) => {
              const Icon = socialIcons[social.label];

              return (
                <a
                  className={`contact-tile contact-${social.label.toLowerCase()}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={social.label}
                >
                  <Icon size={22} aria-hidden="true" />
                  <span>{social.label}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
        <footer className="contact-footer">
          <div>
            <span className="brand-logo-frame contact-footer-mark">
              <Image
                src={Logo}
                alt=""
                width={128}
                height={128}
                className="brand-logo-image"
              />
            </span>
            <p className="eyebrow">{profile.name}</p>
            <h3>{profile.role}</h3>
          </div>
          <div className="contact-footer-stack">
            <p className="eyebrow">Built with</p>
            <ul className="tag-list">
              {builtWith.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
          <p className="contact-copyright">
            © {currentYear} {profile.name}
          </p>
        </footer>
      </div>
    </Section>
  );
}
