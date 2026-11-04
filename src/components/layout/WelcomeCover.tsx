"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "@/app/assets/ZZ-NO-BG.png";

type WelcomeCoverProps = {
  onComplete: () => void;
};

export function WelcomeCover({ onComplete }: WelcomeCoverProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const timer = window.setTimeout(
      () => setIsExiting(true),
      reducedMotion ? 500 : 2200
    );
    const exitTimer = window.setTimeout(
      onComplete,
      reducedMotion ? 750 : 2450
    );

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`welcome-cover${isExiting ? " welcome-cover-exiting" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to ZAND ZONE"
    >
      <div className="welcome-cover-grid" aria-hidden="true" />
      <div className="welcome-cover-content">
        <div className="welcome-cover-logo">
          <Image
            src={Logo}
            alt=""
            width={128}
            height={128}
            priority
            className="welcome-cover-image"
          />
        </div>
        <p className="welcome-cover-kicker">Portfolio / Developer</p>
        <h1 className="welcome-cover-title">
          Welcome to ZAND <span>[Z]</span>ONE
        </h1>
        <p className="welcome-cover-caption">Design. Develop. Deliver.</p>
      </div>
    </div>
  );
}
