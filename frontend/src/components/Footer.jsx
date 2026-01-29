import React from 'react';
import { Heart, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { profileData, navLinks } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-black border-t border-cyan-500/20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Brand section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{profileData.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {profileData.title}
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/DevJay067"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110"
                aria-label="Github"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/jay-magar-5ba92b369/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="p-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect section */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${profileData.email}`}
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm block"
                >
                  {profileData.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profileData.phone}`}
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm block"
                >
                  {profileData.phone}
                </a>
              </li>
              <li className="text-gray-400 text-sm">
                {profileData.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cyan-500/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Made with <Heart className="text-red-500 fill-red-500" size={16} /> by {profileData.name}
            </p>
            <p className="text-gray-400 text-sm">
              © {currentYear} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;