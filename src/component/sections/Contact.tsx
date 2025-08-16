import React from "react";
import {
  MessageCircle,
  Mail,
  Phone,
  Github,
  Linkedin,
  Instagram,
  MapPin,
  MessageSquare,
} from "lucide-react";

const ContactSection = () => {
  return (
    <section
      className="w-full bg-black py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Background Effects - Subtle for mobile */}
      <div className="absolute inset-0 opacity-10 sm:opacity-20">
        <div className="absolute top-10 left-5 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-teal-400 rounded-full filter blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-5 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-cyan-400 rounded-full filter blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Container with proper spacing */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="relative mr-3">
              <div className="absolute inset-0 bg-teal-400 rounded-full blur-sm opacity-50"></div>
              <MessageCircle className="text-teal-400 relative z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              Contact Me
            </h2>
          </div>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            Ready to bring your ideas to life? Let&apos;s connect and create
            something amazing together.
          </p>
        </div>

        {/* Single Contact Card */}
        <div className="bg-gray-900/70 backdrop-blur-sm border border-teal-400/20 rounded-2xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Let&apos;s Connect
          </h3>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Email */}
            <a
              href="mailto:zand@example.com"
              className="flex items-center p-4 rounded-xl hover:bg-teal-400/10 transition-all duration-200 group cursor-pointer border border-gray-800 hover:border-teal-400/30"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-teal-400/30 transition-colors">
                <Mail className="text-teal-400 w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <p className="text-base text-white font-medium truncate group-hover:text-teal-300 transition-colors">
                  zand@example.com
                </p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/6212345678990"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 rounded-xl hover:bg-green-400/10 transition-all duration-200 group cursor-pointer border border-gray-800 hover:border-green-400/30"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-400/30 transition-colors">
                <MessageSquare className="text-green-400 w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-400 mb-1">WhatsApp</p>
                <p className="text-base text-white font-medium group-hover:text-green-300 transition-colors">
                  Chat on WhatsApp
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+6212345678990"
              className="flex items-center p-4 rounded-xl hover:bg-teal-400/10 transition-all duration-200 group cursor-pointer border border-gray-800 hover:border-teal-400/30"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-teal-400/30 transition-colors">
                <Phone className="text-teal-400 w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-400 mb-1">Phone</p>
                <p className="text-base text-white font-medium group-hover:text-teal-300 transition-colors">
                  +62 123 456 7890
                </p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center p-4 rounded-xl hover:bg-teal-400/10 transition-all duration-200 group cursor-pointer border border-gray-800">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-400/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-teal-400/30 transition-colors">
                <MapPin className="text-teal-400 w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-400 mb-1">Location</p>
                <p className="text-base text-white font-medium">
                  Padang, West Sumatra
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="border-t border-gray-800 pt-6">
            <p className="text-sm text-gray-400 text-center mb-6">
              Follow me on social media:
            </p>

            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-gray-800/50 hover:bg-teal-400/20 border border-gray-700/50 hover:border-teal-400/50 rounded-xl transition-all duration-200 hover:scale-105"
                title="GitHub"
              >
                <Github className="w-6 h-6 text-gray-300 group-hover:text-teal-400 transition-colors" />
              </a>

              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-gray-800/50 hover:bg-teal-400/20 border border-gray-700/50 hover:border-teal-400/50 rounded-xl transition-all duration-200 hover:scale-105"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-gray-300 group-hover:text-teal-400 transition-colors" />
              </a>

              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-gray-800/50 hover:bg-teal-400/20 border border-gray-700/50 hover:border-teal-400/50 rounded-xl transition-all duration-200 hover:scale-105"
                title="Instagram"
              >
                <Instagram className="w-6 h-6 text-gray-300 group-hover:text-teal-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Response Time Indicator */}
          <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center px-4 py-2 bg-teal-400/10 border border-teal-400/20 rounded-full">
              <div className="w-2 h-2 bg-teal-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm text-teal-300 font-medium">
                Usually responds in 24h
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="flex justify-center mt-8 sm:mt-12">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-teal-400/50 to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
