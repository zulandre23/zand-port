import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-responsive h-full bg-gray-900 border-l border-gray-700 lg:border-l lg:border-t-0 md:border-t md:border-l-0 border-t-0 flex flex-col justify-center items-center">
      {/* Desktop & Tablet Footer */}
      <div className="hidden md:block text-center space-y-6 lg:space-y-8 w-full px-4 lg:px-6">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-2 lg:space-y-3">
          <span className="text-white font-bold text-lg lg:text-xl">ZAND</span>
          <span className="text-white font-bold text-lg lg:text-xl">
            [Z]ONE
          </span>
        </div>

        {/* Tech Stack */}
        <div className="space-y-3 lg:space-y-4">
          <h3 className="text-yellow-400 font-semibold text-xs lg:text-sm">
            Built With
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {["Next.js", "React", "TypeScript", "Tailwind"].map((tech) => (
              <div
                key={tech}
                className="px-2 py-1 lg:px-3 bg-gray-700 text-gray-300 rounded text-xs text-center hover:bg-gray-600 transition-colors duration-200"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 pt-4 lg:pt-6 space-y-2 lg:space-y-3">
          <p className="text-gray-400 text-xs">© {currentYear}</p>
          <p className="text-gray-400 text-xs">Developed by</p>
          <p className="text-yellow-400 font-semibold text-xs lg:text-sm">
            ZAND
          </p>
        </div>
      </div>

      {/* Mobile Footer - Adjusted positioning */}
      <div className="md:hidden flex items-center justify-center h-full w-full px-4 bg-gray-900/98 backdrop-blur-md border-t border-gray-700/50">
        <div className="flex items-center justify-center space-x-2 text-center pb-2">
          <span className="text-gray-400 text-xs">© {currentYear}</span>
          <span className="text-gray-500 text-xs">•</span>
          <span className="text-gray-400 text-xs">Made with ❤️</span>
          <span className="text-yellow-400 font-bold text-sm">ZAND</span>
          <span className="text-gray-500 text-xs">•</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
