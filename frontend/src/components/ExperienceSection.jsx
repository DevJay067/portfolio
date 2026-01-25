import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { experience, education } from '../data/mock';

const ExperienceSection = () => {
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
      id="experience"
      ref={sectionRef}
      className="relative py-24 bg-black overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`text-center mb-16 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Education</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Experience column */}
          <div
            className={`space-y-8 transform transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-cyan-500/10 rounded-xl">
                <Briefcase className="text-cyan-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">Experience</h3>
            </div>

            {experience.map((item, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Timeline line */}
                {index !== experience.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent" />
                )}

                {/* Card */}
                <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-x-2">
                  {/* Timeline dot */}
                  <div className="absolute -left-3 top-6 w-6 h-6 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full border-4 border-black shadow-lg shadow-cyan-500/50" />

                  {/* Period badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium mb-3">
                    <Calendar size={12} />
                    {item.period}
                  </div>

                  <h4 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-cyan-400 font-medium mb-3">{item.organization}</p>
                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>

                  {item.points && (
                    <ul className="space-y-2">
                      {item.points.map((point, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Education column */}
          <div
            className={`space-y-8 transform transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-cyan-500/10 rounded-xl">
                <GraduationCap className="text-cyan-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </div>

            {education.map((item, index) => (
              <div
                key={index}
                className="group relative"
              >
                {/* Timeline line */}
                {index !== education.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent" />
                )}

                {/* Card */}
                <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:translate-x-2">
                  {/* Timeline dot */}
                  <div className="absolute -left-3 top-6 w-6 h-6 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full border-4 border-black shadow-lg shadow-cyan-500/50" />

                  {/* Status badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium mb-3">
                    <Calendar size={12} />
                    {item.status}
                  </div>

                  <h4 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                    {item.degree}
                  </h4>
                  <p className="text-cyan-400 font-medium mb-2">{item.institution}</p>
                  <p className="text-gray-500 text-sm">{item.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;