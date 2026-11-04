import { ArrowDownRight, MapPin } from "lucide-react";
import Image from "next/image";
import Logo from "@/app/assets/ZZ-NO-BG.png";
import { profile } from "@/data/profile";

type HeroProps = {
  onNavigate: (id: string) => void;
};

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="home"
      className="portfolio-panel"
      aria-labelledby="hero-heading"
      data-panel
    >
      <div className="hero-layout panel-scroll">
        <div>
          <p className="eyebrow">Portfolio / Developer</p>
          <h1 id="hero-heading" className="display-title">
            Build with <span className="accent-text">purpose.</span>
          </h1>
          <p className="panel-intro">
            {profile.role} focused on creating modern, user-centered digital
            experiences.
          </p>
          <div className="panel-controls">
            <button
              type="button"
              className="button-primary"
              onClick={() => onNavigate("projects")}
            >
              Explore projects <ArrowDownRight size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="button-secondary"
              onClick={() => onNavigate("contact")}
            >
              Get in touch
            </button>
          </div>
          <p className="eyebrow" style={{ marginTop: "2rem" }}>
            <MapPin size={15} aria-hidden="true" />
            {profile.location}
          </p>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="welcome-cover-logo hero-logo">
            <Image
              src={Logo}
              alt=""
              width={128}
              height={128}
              priority
              className="welcome-cover-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
