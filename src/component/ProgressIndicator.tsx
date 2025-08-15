import React from "react";

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface ProgressIndicatorProps {
  sections: Section[];
  currentSection: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  sections,
  currentSection,
}) => {
  return (
    <>
      {/* Desktop/Tablet Progress Indicator */}
      <div className="hidden md:block fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex space-x-2">
          {sections.map((_, dotIndex) => (
            <div
              key={dotIndex}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === dotIndex
                  ? "bg-teal-400 shadow-lg shadow-teal-400/50"
                  : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Progress Indicator - Repositioned */}
      <div className="md:hidden fixed bottom-16 right-4 z-20">
        <div className="bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-700/50">
          <div className="flex items-center space-x-1">
            <span className="text-teal-400 text-xs font-semibold">
              {currentSection + 1}
            </span>
            <span className="text-gray-400 text-xs">/</span>
            <span className="text-gray-400 text-xs">{sections.length}</span>
            <div className="ml-2 flex space-x-1">
              {sections.map((_, dotIndex) => (
                <div
                  key={dotIndex}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    currentSection === dotIndex ? "bg-teal-400" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressIndicator;
