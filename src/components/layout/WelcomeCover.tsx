"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Logo from "@/app/assets/ZZ-NO-BG.png";

type WelcomeCoverProps = {
  onComplete: () => void;
};

export function WelcomeCover({ onComplete }: WelcomeCoverProps) {
  const [isExiting, setIsExiting] = useState(false);
  const skipButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    skipButtonRef.current?.focus();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const timer = window.setTimeout(
      () => setIsExiting(true),
      reducedMotion ? 900 : 3900
    );
    const exitTimer = window.setTimeout(
      onComplete,
      reducedMotion ? 1100 : 4400
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
      <button
        ref={skipButtonRef}
        type="button"
        className="welcome-cover-skip"
        onClick={() => {
          setIsExiting(true);
          window.setTimeout(onComplete, 350);
        }}
      >
        Skip intro
      </button>
    </div>
  );
}
