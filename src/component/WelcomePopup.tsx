import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Logo from "@/app/assets/ZZ-NO-BG.png";

interface WelcomePopupProps {
  onComplete?: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ onComplete }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Generate particle data only on client side
  const particleData = useMemo(() => {
    if (!isClient) return [];

    return [...Array(25)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      opacity: Math.random() * 0.3 + 0.1,
      animationDelay: Math.random() * 3,
      animationDuration: Math.random() * 2 + 2,
    }));
  }, [isClient]);

  useEffect(() => {
    // Set client flag to enable particle rendering
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Sequence animasi
    const logoTimer = setTimeout(() => setShowLogo(true), 800);
    const textTimer = setTimeout(() => setShowText(true), 1800);

    // Auto hide setelah 6 detik
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 1200);
    }, 6000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-1200 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background particles - only render on client */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {particleData.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                opacity: particle.opacity,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration}s`,
                background: `radial-gradient(circle, ${
                  Math.random() > 0.5
                    ? "rgba(64, 224, 208, 0.6)" // Turquoise
                    : "rgba(13, 148, 136, 0.6)" // Teal
                })`,
              }}
            />
          ))}
        </div>
      )}

      <div
        className={`text-center transform transition-all duration-1000 ${
          isExiting ? "scale-110 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Logo dengan animasi smooth */}
        <div className="mb-8">
          <div
            className={`w-44 h-44 mx-auto bg-gradient-to-br from-gray-800/30 via-gray-700/20 to-gray-900/40 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-2xl transform transition-all duration-1000 border-2 border-teal-400/30 ${
              showLogo
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 rotate-180 opacity-0"
            }`}
            style={{
              boxShadow:
                "0 0 60px rgba(64, 224, 208, 0.4), 0 0 100px rgba(13, 148, 136, 0.2), inset 0 0 30px rgba(64, 224, 208, 0.1)",
            }}
          >
            <div className="relative">
              <Image
                src={Logo}
                alt="ZAND Logo"
                width={120}
                height={120}
                className="object-contain animate-pulse relative z-10"
                priority
                style={{
                  filter:
                    "drop-shadow(0 0 15px rgba(64, 224, 208, 0.8)) drop-shadow(0 0 30px rgba(13, 148, 136, 0.4))",
                }}
              />
              {/* Glow effect behind logo */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-lg blur-lg animate-pulse"
                style={{
                  transform: "scale(1.2)",
                  zIndex: -1,
                }}
              />
            </div>
          </div>
        </div>

        {/* Text dengan animasi fade-in yang elegant */}
        <div className="relative">
          <h1
            className={`text-4xl md:text-6xl font-bold text-white mb-4 transform transition-all duration-1500 ease-out ${
              showText ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              textShadow: "0 0 30px rgba(64, 224, 208, 0.3)",
            }}
          >
            {/* Welcome to ZAND dengan fade-in bertahap */}
            <span
              className={`transition-all duration-1000 delay-200 ${
                showText ? "opacity-100" : "opacity-0"
              }`}
            >
              Welcome to ZAND{" "}
            </span>

            {/* [Z] dengan highlight special */}
            <span
              className={`text-teal-400 font-black text-5xl md:text-7xl relative transition-all duration-1000 delay-700 ${
                showText ? "opacity-100" : "opacity-0"
              }`}
              style={{
                textShadow:
                  "0 0 20px rgba(64, 224, 208, 0.8), 0 0 40px rgba(13, 148, 136, 0.6)",
              }}
            >
              [Z]
              {/* Subtle glow animation hanya untuk [Z] */}
              <span
                className={`absolute inset-0 text-teal-400 animate-pulse ${
                  showText ? "opacity-50" : "opacity-0"
                }`}
                style={{
                  filter: "blur(2px)",
                  animationDuration: "3s",
                }}
              >
                [Z]
              </span>
            </span>

            {/* ONE dengan fade-in terakhir */}
            <span
              className={`transition-all duration-1000 delay-1000 ${
                showText ? "opacity-100" : "opacity-0"
              }`}
            >
              ONE
            </span>
          </h1>

          {/* Subtle background glow - static, tidak bergerak */}
          <div
            className={`absolute inset-0 -z-10 transition-opacity duration-2000 ${
              showText ? "opacity-20" : "opacity-0"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-teal-400 blur-sm">
              Welcome to ZAND <span className="text-cyan-400">[Z]</span>ONE
            </h1>
          </div>
        </div>

        {/* Enhanced divider dengan animasi expand */}
        <div
          className={`transform transition-all duration-1000 delay-1200 ${
            showText ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
        >
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto">
            <div
              className="w-full h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-sm shadow-lg animate-pulse"
              style={{
                boxShadow:
                  "0 0 25px rgba(64, 224, 208, 0.8), 0 0 50px rgba(13, 148, 136, 0.4)",
                animationDuration: "4s",
              }}
            ></div>
          </div>
        </div>

        {/* Loading indicator dengan animasi lebih smooth */}
        <div
          className={`mt-8 transform transition-all duration-1000 delay-1400 ${
            showText ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full shadow-lg"
                style={{
                  animation: `gentle-pulse 2s ease-in-out infinite`,
                  animationDelay: `${index * 0.3}s`,
                  boxShadow: "0 0 10px rgba(64, 224, 208, 0.8)",
                }}
              />
            ))}
          </div>
          <p
            className="text-gray-400 text-sm mt-3 animate-pulse"
            style={{ animationDuration: "3s" }}
          >
            Loading your experience...
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gentle-pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomePopup;
