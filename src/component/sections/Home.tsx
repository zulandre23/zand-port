import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Logo from "@/app/assets/ZZ-NO-BG.png";

const HomeSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Generate floating particles
  const particleData = useMemo(() => {
    if (!isClient) return [];

    return [...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      animationDelay: Math.random() * 5,
      animationDuration: Math.random() * 3 + 3,
    }));
  }, [isClient]);

  useEffect(() => {
    setIsClient(true);
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="min-w-full h-full flex items-center justify-center bg-black relative overflow-hidden"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Floating Particles Background */}
      {isClient && (
        <div className="absolute inset-0">
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
                    ? "rgba(64, 224, 208, 0.6)"
                    : "rgba(13, 148, 136, 0.6)"
                })`,
              }}
            />
          ))}
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-black/50 to-gray-900/30"></div>

      <div
        className={`text-center text-white z-10 transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Logo Section */}
        <div className="mb-8">
          <div
            className={`w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full flex items-center justify-center mb-8 shadow-2xl border-2 border-teal-400/40 transform transition-all duration-1000 ${
              isVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"
            }`}
            style={{
              background:
                "linear-gradient(135deg, rgba(64,224,208,0.2) 0%, rgba(13,148,136,0.3) 50%, rgba(20,184,166,0.2) 100%)",
              boxShadow:
                "0 0 60px rgba(64, 224, 208, 0.4), 0 0 100px rgba(13, 148, 136, 0.2), inset 0 0 30px rgba(64, 224, 208, 0.1)",
              animation: isVisible ? "float 6s ease-in-out infinite" : "none",
            }}
          >
            <div className="relative">
              <Image
                src={Logo}
                alt="ZAND Logo"
                width={80}
                height={80}
                className="md:w-[100px] md:h-[100px] object-contain relative z-10"
                style={{
                  filter:
                    "brightness(1.2) contrast(1.3) drop-shadow(0 0 15px rgba(64, 224, 208, 0.8))",
                }}
              />
              {/* Logo glow effect */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-lg blur-lg animate-pulse"
                style={{
                  transform: "scale(1.2)",
                  zIndex: -1,
                  animationDuration: "4s",
                }}
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-6 relative">
            <span className="relative z-10">
              Hello.{" "}
              <span
                className="text-teal-400"
                style={{
                  textShadow: "0 0 20px rgba(64, 224, 208, 0.5)",
                }}
              >
                ZAND
              </span>{" "}
              Here
            </span>

            {/* Text glow background */}
            <div
              className="absolute inset-0 text-teal-400 opacity-20 blur-sm animate-pulse"
              style={{ animationDuration: "3s" }}
            >
              Hello. ZAND Here
            </div>
          </h1>
        </div>

        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Creative Developer & Designer
          </p>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-10 border-2 border-teal-400/50 rounded-full flex justify-center">
              <div
                className="w-1 h-3 bg-teal-400 rounded-full mt-2"
                style={{
                  animation: "scroll-indicator 2s infinite",
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">Scroll Down</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(5px) rotate(-1deg);
          }
        }

        @keyframes scroll-indicator {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          50% {
            opacity: 1;
            transform: translateY(0px);
          }
          100% {
            opacity: 0;
            transform: translateY(10px);
          }
        }
      `}</style>
    </section>
  );
};

export default HomeSection;
