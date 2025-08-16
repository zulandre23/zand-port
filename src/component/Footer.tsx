import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-full bg-gray-900 border-l border-gray-700 lg:border-l lg:border-t-0 md:border-t md:border-l-0 border-t-0 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-4 w-16 h-16 bg-teal-400 rounded-full filter blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-4 left-4 w-12 h-12 bg-cyan-400 rounded-full filter blur-lg animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Desktop & Tablet Footer */}
      <div className="hidden md:block text-center w-full px-4 lg:px-6 relative z-10">
        <div className="space-y-6 lg:space-y-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <div className="absolute inset-0 bg-teal-400 rounded-lg blur-sm opacity-30"></div>
              <div className="relative bg-gray-800 px-4 py-2 rounded-lg border border-teal-400/20">
                <span className="text-white font-bold text-lg lg:text-xl bg-gradient-to-r from-teal-300 to-teal-400 bg-clip-text text-transparent">
                  ZAND
                </span>
              </div>
            </div>
            <span className="text-teal-300 text-xs lg:text-sm font-medium">
              Full Stack Developer
            </span>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="text-teal-400 font-semibold text-xs lg:text-sm flex items-center justify-center">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-teal-400 mr-2"></span>
              Built With
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-teal-400 ml-2"></span>
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {[
                { name: "Next.js", color: "from-teal-600/20 to-teal-700/20" },
                { name: "React", color: "from-teal-500/20 to-teal-600/20" },
                {
                  name: "TypeScript",
                  color: "from-teal-400/20 to-teal-500/20",
                },
                { name: "Tailwind", color: "from-teal-600/20 to-teal-700/20" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className={`px-3 py-2 bg-gradient-to-r ${tech.color} text-teal-200 rounded-lg text-xs text-center hover:scale-105 transition-all duration-200 border border-teal-700/50 hover:border-teal-400/30 cursor-default`}
                >
                  {tech.name}
                </div>
              ))}
            </div>
          </div>

          {/* Copyright Section */}
          <div className="space-y-3 pt-4 border-t border-teal-700/50">
            <div className="flex items-center justify-center space-x-2 text-xs text-teal-300">
              <span>© {currentYear}</span>
              <span className="w-1 h-1 bg-teal-400 rounded-full"></span>
              <span>All rights reserved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden w-full h-full flex items-center justify-center px-4 relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-xs">
            <span className="text-teal-300">© {currentYear}</span>
            <span className="text-teal-400">•</span>
            <span className="text-teal-300">Developed by</span>
            <span className="text-teal-400 font-semibold">ZAND</span>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent"></div>
    </footer>
  );
};

export default Footer;
