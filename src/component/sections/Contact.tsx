import React from "react";
import {
  MessageCircle,
  Mail,
  Phone,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";

const ContactSection = () => {
  return (
    <section
      className="min-w-full h-full flex items-center justify-center bg-black px-4 sm:px-6 lg:px-8"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Mobile Content - Scrollable */}
      <div className="contact-content-scrollable lg:max-h-none w-full max-w-4xl text-white text-center">
        {/* Header */}
        <div className="flex items-center justify-center mb-8 lg:mb-12">
          <MessageCircle
            size={32}
            className="text-yellow-400 mr-3 sm:mr-4 sm:size-12"
          />
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
            Contact
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-12 text-gray-200 px-4">
          Let&apos;s work together to bring your ideas to life!
        </p>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 lg:space-y-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-yellow-400">
              Get In Touch
            </h3>

            {/* Email - MOBILE: No transitions, DESKTOP: Smooth */}
            <div className="flex items-center justify-center lg:justify-start text-sm sm:text-base lg:text-lg group">
              <Mail
                className="text-yellow-400 mr-3 sm:mr-4 flex-shrink-0 md:group-hover:scale-110 md:transition-transform md:duration-200 transition-none"
                size={20}
              />
              <span className="break-all">zand@example.com</span>
            </div>

            {/* Phone - MOBILE: No transitions, DESKTOP: Smooth */}
            <div className="flex items-center justify-center lg:justify-start text-sm sm:text-base lg:text-lg group">
              <Phone
                className="text-yellow-400 mr-3 sm:mr-4 flex-shrink-0 md:group-hover:scale-110 md:transition-transform md:duration-200 transition-none"
                size={20}
              />
              <span>+62 123 456 7890</span>
            </div>

            {/* Mobile CTA Button - MOBILE: No transitions, DESKTOP: Smooth */}
            <div className="lg:hidden mt-8">
              <button className="w-full bg-yellow-400 text-black px-6 py-4 rounded-full font-semibold text-base active:bg-yellow-600 md:hover:bg-yellow-500 md:transition-all md:duration-300 md:shadow-lg md:transform md:hover:scale-105 md:active:scale-95 transition-none mobile-touch-feedback">
                Start a Project
              </button>
            </div>
          </div>

          {/* Social & CTA */}
          <div className="space-y-6 lg:space-y-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-yellow-400">
              Follow Me
            </h3>

            {/* Social Icons - MOBILE: No transitions, DESKTOP: Smooth */}
            <div className="flex justify-center space-x-4 sm:space-x-6">
              <a
                href="#"
                className="p-2 rounded-full md:hover:bg-gray-800 md:transition-all md:duration-300 group transition-none mobile-touch-feedback"
              >
                <Github
                  className="text-white md:group-hover:text-yellow-400 md:transition-colors md:duration-300 md:transform md:group-hover:scale-110 transition-none"
                  size={28}
                />
              </a>
              <a
                href="#"
                className="p-2 rounded-full md:hover:bg-gray-800 md:transition-all md:duration-300 group transition-none mobile-touch-feedback"
              >
                <Linkedin
                  className="text-white md:group-hover:text-yellow-400 md:transition-colors md:duration-300 md:transform md:group-hover:scale-110 transition-none"
                  size={28}
                />
              </a>
              <a
                href="#"
                className="p-2 rounded-full md:hover:bg-gray-800 md:transition-all md:duration-300 group transition-none mobile-touch-feedback"
              >
                <Instagram
                  className="text-white md:group-hover:text-yellow-400 md:transition-colors md:duration-300 md:transform md:group-hover:scale-110 transition-none"
                  size={28}
                />
              </a>
            </div>

            {/* Desktop CTA Button - MOBILE: No transitions, DESKTOP: Smooth */}
            <div className="hidden lg:block">
              <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold text-base lg:text-lg hover:bg-yellow-500 active:bg-yellow-600 transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95 mt-8">
                Start a Project
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Padding */}
        <div className="h-8 lg:hidden"></div>
      </div>
    </section>
  );
};

export default ContactSection;
