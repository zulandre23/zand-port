"use client";

import React, { useState, useEffect, useRef } from "react";
import { Home, User, Briefcase, MessageCircle } from "lucide-react";

// Import components
import WelcomePopup from "@/component/WelcomePopup";
import Header from "@/component/Header";
import HomeSection from "@/component/sections/Home";
import AboutSection from "@/component/sections/About";
import PortfolioSection from "@/component/sections/Portfolio";
import ContactSection from "@/component/sections/Contact";
import Footer from "@/component/Footer";
import SectionNavigator from "@/component/Navigator";
import ProgressIndicator from "@/component/ProgressIndicator";

export default function HorizontalPortfolio() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [previewSection, setPreviewSection] = useState<number | null>(null);
  const [previewDirection, setPreviewDirection] = useState<
    "next" | "prev" | null
  >(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAboutScrollActive, setIsAboutScrollActive] = useState(false);
  const [isPortfolioScrollActive, setIsPortfolioScrollActive] = useState(false);
  const isHandlingPortfolioScrollRef = useRef<boolean>(false);
  const [aboutSubSection, setAboutSubSection] = useState(0);
  const totalAboutSubSections = 3; // profile, skills, experience

  const sections = [
    { id: "home", title: "Home", icon: Home },
    { id: "about", title: "About", icon: User },
    { id: "portfolio", title: "Portfolio", icon: Briefcase },
    { id: "contact", title: "Contact", icon: MessageCircle },
  ];

  // Navigate to Contact section handler
  const handleNavigateToContact = () => {
    const contactSectionIndex = sections.findIndex(
      (section) => section.id === "contact"
    );
    if (contactSectionIndex !== -1) {
      scrollToSection(contactSectionIndex);
    }
  };

  // Initialize scroll functionality after component mounts
  useEffect(() => {
    const initializeScroll = () => {
      const container = document.getElementById("main-container");
      if (container) {
        setIsInitialized(true);
        console.log("Scroll initialized");
      } else {
        setTimeout(initializeScroll, 100);
      }
    };

    const timer = setTimeout(initializeScroll, 200);
    return () => clearTimeout(timer);
  }, [showWelcome]);

  // Handle welcome popup completion
  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  // Enhanced mouse wheel scroll handler with About section integration
  useEffect(() => {
    if (!isInitialized || showWelcome) return;

    let scrollTimeout: NodeJS.Timeout;
    let accumulatedDelta = 0;
    const SCROLL_THRESHOLD = 100;
    let isHandlingAboutScroll = false;
    const isHandlingPortfolioScroll = false;

    // const checkAboutScrollExit = (e: WheelEvent) => {
    //   const aboutContainer = document.querySelector(
    //     '[data-scroll-area="about"]'
    //   ) as HTMLElement;
    //   if (!aboutContainer) return;

    //   const direction = e.deltaY > 0 ? 1 : -1;
    //   const canScrollDown =
    //     aboutContainer.scrollTop <
    //     aboutContainer.scrollHeight - aboutContainer.clientHeight - 10;
    //   const canScrollUp = aboutContainer.scrollTop > 10;

    //   let shouldExit = false;
    //   if (direction > 0 && !canScrollDown) shouldExit = true;
    //   else if (direction < 0 && !canScrollUp) shouldExit = true;

    //   if (shouldExit) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     const targetSection = currentSection + direction;
    //     if (targetSection >= 0 && targetSection < sections.length) {
    //       setIsScrolling(true);
    //       scrollToSection(targetSection);
    //       setTimeout(() => setIsScrolling(false), 800);
    //     }
    //   }
    // };

    // const checkPortfolioScrollExit = (e: WheelEvent) => {
    //   const portfolioSection = document.querySelector(
    //     '[data-scroll-area="portfolio"]'
    //   ) as HTMLElement;
    //   if (!portfolioSection) return;

    //   const direction = e.deltaY > 0 ? 1 : -1;
    //   const canScrollDown =
    //     portfolioSection.scrollTop <
    //     portfolioSection.scrollHeight - portfolioSection.clientHeight - 2; // toleransi lebih kecil
    //   const canScrollUp = portfolioSection.scrollTop > 2;

    //   // Debug (sementara untuk cek)
    //   console.log(
    //     "Portfolio scrollTop:",
    //     portfolioSection.scrollTop,
    //     "canScrollDown:",
    //     canScrollDown,
    //     "canScrollUp:",
    //     canScrollUp
    //   );

    //   let shouldExit = false;
    //   if (direction > 0 && !canScrollDown) shouldExit = true;
    //   else if (direction < 0 && !canScrollUp) shouldExit = true;

    //   if (shouldExit) {
    //     e.preventDefault(); // cegah scroll default
    //     e.stopPropagation();
    //     const targetSection = currentSection + direction;
    //     if (targetSection >= 0 && targetSection < sections.length) {
    //       setIsScrolling(true);
    //       scrollToSection(targetSection);
    //       setTimeout(() => setIsScrolling(false), 800);
    //     }
    //   }
    // };

    const handleMainScroll = (e: WheelEvent) => {
      e.preventDefault();
      console.log("Main wheel event detected", { isScrolling, currentSection });

      accumulatedDelta += Math.abs(e.deltaY);
      const direction = e.deltaY > 0 ? 1 : -1;
      const targetSection = currentSection + direction;

      // Show immediate preview
      if (
        targetSection >= 0 &&
        targetSection < sections.length &&
        targetSection !== currentSection
      ) {
        setPreviewSection(targetSection);
        setPreviewDirection(direction > 0 ? "next" : "prev");
        setScrollProgress(Math.min(accumulatedDelta / SCROLL_THRESHOLD, 1));

        // Clear existing timeout
        clearTimeout(scrollTimeout);

        // If we've scrolled enough, trigger the actual section change
        if (accumulatedDelta >= SCROLL_THRESHOLD) {
          setIsScrolling(true);
          accumulatedDelta = 0;

          // Reset preview immediately when scrolling starts
          setPreviewSection(null);
          setPreviewDirection(null);
          setScrollProgress(0);

          scrollToSection(targetSection);

          setTimeout(() => {
            setIsScrolling(false);
          }, 800);
        } else {
          // Reset preview after a short delay if threshold not reached
          scrollTimeout = setTimeout(() => {
            setPreviewSection(null);
            setPreviewDirection(null);
            setScrollProgress(0);
            accumulatedDelta = 0;
          }, 500);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Don't handle if we're already scrolling main sections
      if (
        isScrolling ||
        isHandlingAboutScroll ||
        isHandlingPortfolioScroll ||
        isHandlingPortfolioScrollRef.current
      )
        return;

      const target = e.target as Element;
      const aboutScrollArea = target.closest('[data-scroll-area="about"]');
      const portfolioScrollArea = target.closest(
        '[data-scroll-area="portfolio"]'
      );

      // If we're in About section
      if (aboutScrollArea && currentSection === 1) {
        isHandlingAboutScroll = true;
        setIsAboutScrollActive(true);
        setPreviewSection(null);
        setPreviewDirection(null);
        setScrollProgress(0);

        const direction = e.deltaY > 0 ? 1 : -1;
        // Hanya keluar jika sudah di ujung subsection
        if (
          (direction > 0 && aboutSubSection === totalAboutSubSections - 1) ||
          (direction < 0 && aboutSubSection === 0)
        ) {
          const targetSection = currentSection + direction;
          if (targetSection >= 0 && targetSection < sections.length) {
            setIsScrolling(true);
            scrollToSection(targetSection);
            setTimeout(() => setIsScrolling(false), 800);
          }
        }

        isHandlingAboutScroll = false;
        return;
      }

      // PORTFOLIO SECTION SCROLL HANDLING
      if (portfolioScrollArea && currentSection === 2) {
        setIsPortfolioScrollActive(true);
        setPreviewSection(null);
        setPreviewDirection(null);
        setScrollProgress(0);

        const portfolioSection = document.querySelector(
          '[data-scroll-area="portfolio"]'
        ) as HTMLElement;

        if (portfolioSection) {
          const direction = e.deltaY > 0 ? 1 : -1;
          const targetSection = currentSection + direction;
          let atBottom = false;
          let atTop = false;

          if (window.innerWidth >= 1024) {
            // Desktop → langsung bisa pindah section tanpa cek scroll
            atBottom = true;
            atTop = true;
          } else {
            // Mobile → cek posisi scroll internal
            const tolerance = 2;
            atBottom =
              portfolioSection.scrollHeight -
                portfolioSection.scrollTop -
                portfolioSection.clientHeight <=
              tolerance;
            atTop = portfolioSection.scrollTop <= tolerance;
          }

          if ((direction > 0 && atBottom) || (direction < 0 && atTop)) {
            e.preventDefault();
            e.stopPropagation();
            if (targetSection >= 0 && targetSection < sections.length) {
              setIsScrolling(true);
              scrollToSection(targetSection);
              setTimeout(() => setIsScrolling(false), 800);
            }
          }
        }

        return; // supaya main scroll tidak ikut jalan
      } else {
        setIsPortfolioScrollActive(false);
      }

      // Handle main scroll if not in special sections
      handleMainScroll(e);
    };

    // Add wheel event listener to window to catch all scroll events
    console.log("Adding wheel event listener");
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      console.log("Removing wheel event listener");
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [
    currentSection,
    isScrolling,
    sections.length,
    isInitialized,
    showWelcome,
    aboutSubSection,
  ]);

  // Enhanced touch handler for mobile with About section integration - FIXED VERSION
  useEffect(() => {
    if (!isInitialized || showWelcome) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let isDragging = false;
    let touchMoveX = 0;
    let touchMoveY = 0;
    let lastTouchTime = 0;
    let touchVelocityX = 0;
    let touchVelocityY = 0; // Now properly used!

    const handleTouchStart = (e: TouchEvent) => {
      if (isScrolling) return;

      console.log("Touch start detected");

      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      touchMoveX = touchStartX;
      touchMoveY = touchStartY;
      isDragging = true;
      lastTouchTime = Date.now();
      touchVelocityX = 0;
      touchVelocityY = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || isScrolling) return;

      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;

      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;
      const currentTime = Date.now();
      const timeDelta = currentTime - lastTouchTime;

      if (timeDelta > 0) {
        touchVelocityX = (touchEndX - touchMoveX) / timeDelta;
        touchVelocityY = (touchEndY - touchMoveY) / timeDelta;
      }

      touchMoveX = touchEndX;
      touchMoveY = touchEndY;
      lastTouchTime = currentTime;

      // Check if we're in About section
      const target = e.target as Element;
      const aboutScrollArea = target.closest('[data-scroll-area="about"]');
      const portfolioScrollArea = target.closest(
        '[data-scroll-area="portfolio"]'
      );

      if (aboutScrollArea && currentSection === 1) {
        // In About section - prioritize vertical scrolling
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          // Vertical gesture - let About section handle it
          setIsAboutScrollActive(true);
          return;
        }
      } else {
        setIsAboutScrollActive(false);
      }

      // Check if we're in Portfolio section
      if (portfolioScrollArea && currentSection === 2) {
        // In Portfolio section - prioritize vertical scrolling
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          // Vertical gesture - let Portfolio section handle it
          setIsPortfolioScrollActive(true);
          return;
        }
      } else {
        setIsPortfolioScrollActive(false);
      }

      // Only handle horizontal swipes for main navigation
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
        const direction = deltaX > 0 ? 1 : -1;
        const targetSection = currentSection + direction;

        if (
          targetSection >= 0 &&
          targetSection < sections.length &&
          targetSection !== currentSection
        ) {
          setPreviewSection(targetSection);
          setPreviewDirection(direction > 0 ? "next" : "prev");
          const progress = Math.min(Math.abs(deltaX) / 120, 1);
          setScrollProgress(progress);
        }

        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDragging) return;
      console.log("Touch end detected");

      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;

      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      setPreviewSection(null);
      setPreviewDirection(null);
      setScrollProgress(0);

      // Check if we're in About section and this was a vertical gesture
      const target = e.target as Element;
      const aboutScrollArea = target.closest('[data-scroll-area="about"]');
      const portfolioScrollArea = target.closest(
        '[data-scroll-area="portfolio"]'
      );

      if (aboutScrollArea && currentSection === 1 && absDeltaY > absDeltaX) {
        // Enhanced: Use vertical velocity for better About section navigation
        const hasVerticalVelocity = Math.abs(touchVelocityY) > 0.5;
        const hasVerticalDistance = absDeltaY > 80;

        // If strong vertical gesture, consider exiting About section
        if (hasVerticalVelocity || hasVerticalDistance) {
          // Check scroll position to determine if we should exit
          const aboutContent = aboutScrollArea.querySelector(
            '[data-about-content="true"]'
          );
          if (aboutContent) {
            const scrollTop = aboutContent.scrollTop;
            const scrollHeight = aboutContent.scrollHeight;
            const clientHeight = aboutContent.clientHeight;

            const canScrollDown = scrollTop < scrollHeight - clientHeight - 10;
            const canScrollUp = scrollTop > 10;

            // Strong upward gesture at top of About section
            if (deltaY < 0 && !canScrollUp && hasVerticalVelocity) {
              const newSection = currentSection - 1;
              if (newSection >= 0) {
                setIsAboutScrollActive(false);
                setIsScrolling(true);
                scrollToSection(newSection);

                setTimeout(() => {
                  setIsScrolling(false);
                }, 700);

                isDragging = false;
                return;
              }
            }

            // Strong downward gesture at bottom of About section
            if (deltaY > 0 && !canScrollDown && hasVerticalVelocity) {
              const newSection = currentSection + 1;
              if (newSection < sections.length) {
                setIsAboutScrollActive(false);
                setIsScrolling(true);
                scrollToSection(newSection);

                setTimeout(() => {
                  setIsScrolling(false);
                }, 800);

                isDragging = false;
                return;
              }
            }
          }
        }

        // Otherwise let About section handle vertical gestures normally
        isDragging = false;
        return;
      }

      // Check if we're in Portfolio section and this was a vertical gesture
      if (
        portfolioScrollArea &&
        currentSection === 2 &&
        absDeltaY > absDeltaX
      ) {
        const hasVerticalVelocity = Math.abs(touchVelocityY) > 0.5;
        const hasVerticalDistance = absDeltaY > 80;

        if (hasVerticalVelocity || hasVerticalDistance) {
          const portfolioSection = portfolioScrollArea as HTMLElement;
          const scrollTop = portfolioSection.scrollTop;
          const scrollHeight = portfolioSection.scrollHeight;
          const clientHeight = portfolioSection.clientHeight;

          const canScrollDown = scrollTop < scrollHeight - clientHeight - 10;
          const canScrollUp = scrollTop > 10;

          if (deltaY < 0 && !canScrollUp && hasVerticalVelocity) {
            const newSection = currentSection - 1;
            if (newSection >= 0) {
              setIsPortfolioScrollActive(false);
              setIsScrolling(true);
              scrollToSection(newSection);
              setTimeout(() => setIsScrolling(false), 700);
              isDragging = false;
              return;
            }
          }

          if (deltaY > 0 && !canScrollDown && hasVerticalVelocity) {
            const newSection = currentSection + 1;
            if (newSection < sections.length) {
              setIsPortfolioScrollActive(false);
              setIsScrolling(true);
              scrollToSection(newSection);
              setTimeout(() => setIsScrolling(false), 800);
              isDragging = false;
              return;
            }
          }
        }

        isDragging = false;
        return;
      }

      // Handle horizontal swipes for main navigation
      const isHorizontalSwipe = absDeltaX > absDeltaY && absDeltaX > 50;
      const hasVelocity = Math.abs(touchVelocityX) > 0.3;
      const hasDistance = absDeltaX > 80;

      if (isHorizontalSwipe && (hasDistance || hasVelocity)) {
        const direction = deltaX > 0 ? 1 : -1;
        const newSection = currentSection + direction;

        if (newSection >= 0 && newSection < sections.length) {
          setIsAboutScrollActive(false);
          setIsPortfolioScrollActive(false);
          setIsScrolling(true);
          scrollToSection(newSection);

          setTimeout(() => {
            setIsScrolling(false);
          }, 800);
        }
      }

      isDragging = false;
    };

    const handleTouchCancel = () => {
      isDragging = false;
      setPreviewSection(null);
      setPreviewDirection(null);
      setScrollProgress(0);
    };

    const container = document.getElementById("main-container");
    if (container) {
      console.log("Adding touch event listeners");
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      container.addEventListener("touchend", handleTouchEnd, {
        passive: false,
      });
      container.addEventListener("touchcancel", handleTouchCancel, {
        passive: false,
      });

      return () => {
        console.log("Removing touch event listeners");
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
        container.removeEventListener("touchcancel", handleTouchCancel);
      };
    } else {
      console.error("Container not found when trying to add touch listeners");
    }
  }, [
    currentSection,
    isScrolling,
    sections.length,
    isInitialized,
    showWelcome,
  ]);

  const scrollToSection = (index: number) => {
    const container = document.getElementById("main-container");
    if (container) {
      console.log(`Scrolling to section ${index}`);
      container.scrollTo({
        left: index * window.innerWidth,
        behavior: "smooth",
      });
      setCurrentSection(index);
    } else {
      console.error("Container not found when trying to scroll");
    }
  };

  const handleScroll = () => {
    const container = document.getElementById("main-container");
    if (container && !isScrolling) {
      const scrollLeft = container.scrollLeft;
      const sectionIndex = Math.round(scrollLeft / window.innerWidth);
      if (sectionIndex !== currentSection) {
        setCurrentSection(sectionIndex);

        // Reset About scroll state when leaving About section
        if (sectionIndex !== 1) {
          setIsAboutScrollActive(false);
        }
        // Reset Portfolio scroll state when leaving Portfolio section
        if (sectionIndex !== 2) {
          setIsPortfolioScrollActive(false);
        }
      }
    }
  };

  // Show Welcome Popup
  if (showWelcome) {
    return <WelcomePopup onComplete={handleWelcomeComplete} />;
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-900">
      {/* Header */}
      <Header
        sections={sections}
        currentSection={currentSection}
        scrollToSection={scrollToSection}
      />

      {/* Main Container */}
      <div
        id="main-container"
        className="flex h-full overflow-x-auto overflow-y-hidden scroll-smooth pt-20"
        onScroll={handleScroll}
        style={{
          scrollSnapType:
            (currentSection === 1 && isAboutScrollActive) ||
            (currentSection === 2 && isPortfolioScrollActive)
              ? "none"
              : "x mandatory",
        }}
      >
        {/* Preview overlay - hide when About or Portfolio scroll is active */}
        {previewSection !== null &&
          previewDirection &&
          !isAboutScrollActive &&
          !isPortfolioScrollActive &&
          previewSection !== 1 &&
          previewSection !== 2 && (
            <div className="fixed inset-0 z-30 pointer-events-none">
              {previewDirection === "next" && (
                <div
                  className="absolute right-0 top-0 h-full bg-gradient-to-l from-black/95 via-black/70 to-transparent flex items-center justify-center transition-all duration-200 ease-out"
                  style={{
                    width: `${20 + scrollProgress * 30}%`,
                    transform: `translateX(${(1 - scrollProgress) * 20}px)`,
                    opacity: 0.9 + scrollProgress * 0.1,
                  }}
                >
                  <div
                    className="text-center text-white mr-8 transform transition-all duration-200"
                    style={{
                      transform: `translateX(${
                        (1 - scrollProgress) * -20
                      }px) scale(${0.8 + scrollProgress * 0.2})`,
                      opacity: 0.7 + scrollProgress * 0.3,
                    }}
                  >
                    <div className="w-24 h-24 mx-auto mb-6 bg-teal-400/40 rounded-full flex items-center justify-center border-2 border-teal-400/60 shadow-2xl">
                      {React.createElement(sections[previewSection].icon, {
                        size: 40,
                        className: "text-teal-400",
                      })}
                    </div>
                    <p className="text-3xl font-bold mb-3 text-teal-400">
                      {sections[previewSection].title}
                    </p>
                    <p className="text-sm text-gray-300 opacity-80">
                      Scroll down to continue →
                    </p>
                  </div>
                </div>
              )}

              {previewDirection === "prev" && (
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-black/95 via-black/70 to-transparent flex items-center justify-center transition-all duration-200 ease-out"
                  style={{
                    width: `${20 + scrollProgress * 30}%`,
                    transform: `translateX(${(scrollProgress - 1) * 20}px)`,
                    opacity: 0.9 + scrollProgress * 0.1,
                  }}
                >
                  <div
                    className="text-center text-white ml-8 transform transition-all duration-200"
                    style={{
                      transform: `translateX(${
                        (scrollProgress - 1) * 20
                      }px) scale(${0.8 + scrollProgress * 0.2})`,
                      opacity: 0.7 + scrollProgress * 0.3,
                    }}
                  >
                    <div className="w-24 h-24 mx-auto mb-6 bg-teal-400/40 rounded-full flex items-center justify-center border-2 border-teal-400/60 shadow-2xl">
                      {React.createElement(sections[previewSection].icon, {
                        size: 40,
                        className: "text-teal-400",
                      })}
                    </div>
                    <p className="text-3xl font-bold mb-3 text-teal-400">
                      {sections[previewSection].title}
                    </p>
                    <p className="text-sm text-gray-300 opacity-80">
                      ← Scroll up to go back
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

        {/* Sections */}
        <div
          className="min-w-full h-full transition-all duration-500 ease-out"
          style={{ scrollSnapAlign: "start" }}
        >
          <HomeSection />
        </div>

        <div
          className="min-w-full h-full transition-all duration-500 ease-out"
          style={{
            scrollSnapAlign:
              currentSection === 1 && isAboutScrollActive ? "none" : "start",
          }}
        >
          <AboutSection
            onSubSectionChange={setAboutSubSection}
            onNavigateToContact={handleNavigateToContact}
            onExitAbout={(direction: number) => {
              if (
                (direction > 0 &&
                  aboutSubSection === totalAboutSubSections - 1) ||
                (direction < 0 && aboutSubSection === 0)
              ) {
                setIsAboutScrollActive(false);
                setIsScrolling(true);
                scrollToSection(currentSection + direction);
                setTimeout(() => setIsScrolling(false), 800);
              }
            }}
          />
        </div>

        <div
          className="min-w-full h-full transition-all duration-500 ease-out"
          style={{
            scrollSnapAlign:
              currentSection === 2 && isPortfolioScrollActive
                ? "none"
                : "start",
          }}
        >
          <PortfolioSection />
        </div>

        <div
          className="min-w-full h-full transition-all duration-500 ease-out"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="hidden lg:flex h-full">
            <div className="flex-1">
              <ContactSection />
            </div>
            <div className="w-80 xl:w-96">
              <Footer />
            </div>
          </div>

          <div className="hidden md:flex lg:hidden flex-col h-full">
            <div className="flex-1 min-h-0">
              <ContactSection />
            </div>
            <div className="h-40 flex-shrink-0">
              <Footer />
            </div>
          </div>
          <div className="flex md:hidden flex-col h-full">
            <div className="flex-1 min-h-0">
              <ContactSection />
            </div>
            <div className="h-16 flex-shrink-0">
              <Footer />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Components - hide when About or Portfolio scroll is active */}
      <div
        className={`transition-opacity duration-300 ${
          isAboutScrollActive || isPortfolioScrollActive
            ? "opacity-30 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <SectionNavigator
          sections={sections}
          currentSection={currentSection}
          scrollToSection={scrollToSection}
        />

        <ProgressIndicator
          sections={sections}
          currentSection={currentSection}
        />
      </div>
    </div>
  );
}
