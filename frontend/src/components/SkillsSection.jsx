import React, { useEffect, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Parallax } from 'react-scroll-parallax';
import { skills, languages } from '../data/mock';

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
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

  const categories = ['All', ...new Set(skills.map(skill => skill.category))];
  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 bg-black overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 87, 34, 0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Parallax background orbs */}
      <Parallax speed={-20} className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-red-500/5 rounded-full filter blur-3xl" />
      </Parallax>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <Parallax speed={5}>
          <div
            className={`text-center mb-12 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-400">Expertise</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full" />
          </div>
        </Parallax>

        {/* Category filter */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50'
                  : 'bg-gray-800/50 text-gray-400 border border-orange-500/20 hover:border-orange-500/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredSkills.map((skill, index) => {
            const IconComponent = LucideIcons[skill.icon] || LucideIcons.Code;
            
            return (
              <Parallax key={index} speed={index % 3 === 0 ? 3 : index % 3 === 1 ? -3 : 0}>
                <div
                  className={`group relative transform transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 50}ms` }}
                >
                  {/* 3D Card */}
                  <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 rounded-xl transition-all duration-500" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors duration-300">
                            <IconComponent className="text-orange-400" size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                              {skill.name}
                            </h3>
                            <p className="text-xs text-gray-500">{skill.category}</p>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${(index + 2) * 50}ms`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Parallax>
            );
          })}
        </div>

        {/* Languages section */}
        <Parallax speed={-5}>
          <div
            className={`transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Languages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {languages.map((language, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                      {language.name}
                    </h4>
                    <p className="text-gray-400">{language.level}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
};

export default SkillsSection;
