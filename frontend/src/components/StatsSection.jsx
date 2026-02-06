import React, { useEffect, useRef, useState } from 'react';
import { Parallax } from 'react-scroll-parallax';
import { stats } from '../data/mock';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
      ref={sectionRef}
      className="relative py-20 bg-gray-900 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255, 87, 34, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 87, 34, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Parallax background elements */}
      <Parallax speed={-10} className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500/10 rounded-full filter blur-2xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-red-500/10 rounded-full filter blur-2xl" />
      </Parallax>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Parallax key={index} speed={index % 2 === 0 ? 5 : -5}>
              <div
                className={`group relative transform transition-all duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Card background with 3D effect */}
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                  {/* Glowing effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 rounded-2xl transition-all duration-500" />
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-orange-500/30 rounded-tr-lg" />
                  <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-orange-500/30 rounded-bl-lg" />
                </div>
              </div>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
