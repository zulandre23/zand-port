import { MapPin, Radio } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export function About() {
  return (
    <Section id="about" title="About me" eyebrow="01 / Profile">
      <div className="split-layout">
        <p className="panel-intro">{profile.bio}</p>
        <Card className="project-card">
          <p className="eyebrow">
            <Radio size={15} aria-hidden="true" /> Current status
          </p>
          <h3>{profile.availability}</h3>
          <p className="muted-text">
            <MapPin size={15} aria-hidden="true" /> {profile.location}
          </p>
        </Card>
      </div>
    </Section>
  );
}
