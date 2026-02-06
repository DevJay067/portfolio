import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Calendar, CheckCircle2 } from 'lucide-react';
import { Parallax } from 'react-scroll-parallax';
import { projects } from '../data/mock';
import { useSoundContext } from '../context/SoundContext';

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);
  const { playClick, playHover, playPop } = useSoundContext();

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
      id="projects"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Multi-layer parallax backgrounds */}
      <Parallax speed={-35} className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-orange-500/8 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-500/8 rounded-full filter blur-3xl" />
      </Parallax>
      
      <Parallax speed={-25} translateX={[-80, 80]} className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-amber-500/10 rounded-full filter blur-2xl" />
      </Parallax>
      
      <Parallax speed={-15} translateX={[60, -60]} className="absolute inset-0">
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-orange-400/12 rounded-full filter blur-xl" />
      </Parallax>

      {/* Floating decorative elements */}
      <Parallax speed={25} rotate={[0, 180]} className="absolute top-32 left-16">
        <div className="w-14 h-14 border-2 border-orange-500/20 rounded-lg" />
      </Parallax>
      <Parallax speed={-25} rotate={[180, 0]} className="absolute bottom-32 right-16">
        <div className="w-18 h-18 border-2 border-red-500/20 rounded-full" />
      </Parallax>
      <Parallax speed={20} translateY={[-30, 30]} className="absolute top-1/2 left-8">
        <div className="w-10 h-10 border border-amber-500/25 rounded-lg rotate-45" />
      </Parallax>
      <Parallax speed={-20} translateY={[30, -30]} className="absolute top-1/3 right-8">
        <div className="w-12 h-12 border border-orange-400/30 rounded-full" />
      </Parallax>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <Parallax speed={12} scale={[0.9, 1.05]}>
          <div
            className={`text-center mb-16 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-400">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mb-4" />
            <p className="text-gray-400 max-w-2xl mx-auto">
              Showcasing my journey through academic and personal projects
            </p>
          </div>
        </Parallax>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Parallax 
              key={project.id} 
              speed={index % 2 === 0 ? 10 : -10}
              translateX={index % 2 === 0 ? [-15, 15] : [15, -15]}
              rotate={index % 2 === 0 ? [-1, 1] : [1, -1]}
              scale={[0.97, 1.03]}
            >
              <div
                className={`group relative transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => {
                  setHoveredProject(project.id);
                  playHover();
                }}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative perspective-1000">
                  <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-orange-500/20 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2">
                    <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-gradient-to-r from-orange-500/90 to-red-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                      {project.status === 'Completed' ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <Calendar size={12} />
                      )}
                      {project.status}
                    </div>

                    <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-gray-900/50 backdrop-blur-sm text-orange-400 text-xs font-bold rounded-full border border-orange-500/30">
                      {project.year}
                    </div>

                    <div className="relative h-64 overflow-hidden">
                      <Parallax speed={-5} className="h-full">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          style={{ minHeight: '120%' }}
                        />
                      </Parallax>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-medium rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-white">Key Highlights:</h4>
                        <ul className="space-y-1">
                          {project.highlights.map((highlight, i) => (
                            <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                              <span className="text-orange-400 mt-1">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <a
                          href={project.liveDemo}
                          onClick={() => playClick()}
                          onMouseEnter={() => playHover()}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                        <a
                          href={project.github}
                          onClick={() => playClick()}
                          onMouseEnter={() => playHover()}
                          className="flex items-center justify-center gap-2 px-4 py-2 border border-orange-500/50 text-orange-400 rounded-lg font-medium hover:bg-orange-500/10 hover:border-orange-500 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                          <Github size={16} />
                        </a>
                      </div>
                    </div>

                    {hoveredProject === project.id && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Parallax>
          ))}
        </div>

        {/* View all projects button */}
        <Parallax speed={-10} scale={[0.95, 1.05]}>
          <div
            className={`text-center mt-12 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <button 
              onClick={() => playClick()}
              onMouseEnter={() => playHover()}
              className="group px-8 py-4 border-2 border-orange-500/50 text-orange-400 rounded-full font-medium hover:bg-orange-500/10 hover:border-orange-500 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
            >
              View All Projects
              <ExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" size={20} />
            </button>
          </div>
        </Parallax>
      </div>
    </section>
  );
};

export default ProjectsSection;
