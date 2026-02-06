import React, { useEffect, useRef, useState } from 'react';
import { Mail, Award } from 'lucide-react';
import { Parallax } from 'react-scroll-parallax';
import { profileData, aboutHighlights } from '../data/mock';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Multi-layer parallax backgrounds */}
      <Parallax speed={-30} className="absolute inset-0">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-red-500/10 rounded-full filter blur-3xl" />
      </Parallax>
      
      <Parallax speed={-20} translateX={[50, -50]} className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-amber-500/8 rounded-full filter blur-2xl" />
      </Parallax>
      
      <Parallax speed={-10} translateX={[-30, 30]} className="absolute inset-0">
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-orange-400/10 rounded-full filter blur-xl" />
      </Parallax>

      {/* Floating decorative elements */}
      <Parallax speed={15} rotate={[0, 45]} className="absolute top-1/4 left-10">
        <div className="w-16 h-16 border-2 border-orange-500/20 rounded-lg" />
      </Parallax>
      <Parallax speed={-15} rotate={[45, 0]} className="absolute bottom-1/4 right-10">
        <div className="w-20 h-20 border-2 border-red-500/20 rounded-full" />
      </Parallax>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header with parallax */}
        <Parallax speed={8} scale={[0.95, 1]}>
          <div
            className={`text-center mb-16 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-400">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full" />
          </div>
        </Parallax>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left column - About text */}
          <Parallax speed={-10} translateX={[-20, 0]}>
            <div
              className={`space-y-6 transform transition-all duration-700 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-8">
                <Parallax speed={3}>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Passionate About Technology & Innovation
                  </h3>
                </Parallax>
                <Parallax speed={2}>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {profileData.description}
                  </p>
                </Parallax>
                <Parallax speed={1}>
                  <p className="text-gray-300 leading-relaxed">
                    Currently pursuing B-Tech in Computer Engineering at NMIET, I'm dedicated to mastering modern web technologies and AI/ML systems. My journey in software development is driven by curiosity, creativity, and a commitment to building solutions that matter.
                  </p>
                </Parallax>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors duration-300 group">
                    <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors duration-300">
                      <Mail size={20} className="text-orange-400" />
                    </div>
                    <a href={`mailto:${profileData.email}`}>
                      {profileData.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Parallax>

          {/* Right column - Achievements */}
          <Parallax speed={10} translateX={[20, 0]}>
            <div
              className={`space-y-4 transform transition-all duration-700 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="text-orange-400" size={28} />
                Key Achievements
              </h3>
              
              {aboutHighlights.map((highlight, index) => (
                <Parallax key={index} speed={5 - index * 2} translateY={[10, -10]}>
                  <div
                    className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105"
                    style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                  >
                    <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                      {highlight.year}
                    </div>

                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                      {highlight.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {highlight.description}
                    </p>

                    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-orange-500/20 group-hover:border-orange-500/50 transition-colors duration-300" />
                  </div>
                </Parallax>
              ))}
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
