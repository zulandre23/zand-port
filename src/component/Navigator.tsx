import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface SectionNavigatorProps {
  sections: Section[];
  currentSection: number;
  scrollToSection: (index: number) => void;
}

const SectionNavigator: React.FC<SectionNavigatorProps> = ({
  sections,
  currentSection,
  scrollToSection,
}) => {
  return (
    <div className="fixed bottom-20 right-6 z-40 bg-black bg-opacity-80 backdrop-blur-sm p-4 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="flex space-x-2">
          <button
            onClick={() => scrollToSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Previous section"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() =>
              scrollToSection(Math.min(sections.length - 1, currentSection + 1))
            }
            disabled={currentSection === sections.length - 1}
            className="p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Next section"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="text-white text-sm font-medium">
          {currentSection + 1} / {sections.length}
        </div>
      </div>
    </div>
  );
};

export default SectionNavigator;
