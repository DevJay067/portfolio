import React, { useEffect, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Parallax } from 'react-scroll-parallax';
import { skills, languages } from '../data/mock';
import { useSoundContext } from '../context/SoundContext';

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
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

  // Animated background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let waves = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create floating particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.hue = Math.random() * 30 + 15; // Orange-red range
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        const pulseSize = this.size + Math.sin(this.pulse) * 1;
        const pulseOpacity = this.opacity + Math.sin(this.pulse) * 0.1;
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, pulseSize * 3
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 60%, ${pulseOpacity})`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, 50%, ${pulseOpacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 40%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${pulseOpacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create wave lines
    class Wave {
      constructor(y, amplitude, frequency, speed, opacity) {
        this.y = y;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed;
        this.opacity = opacity;
        this.offset = Math.random() * Math.PI * 2;
      }

      update() {
        this.offset += this.speed;
      }

      draw() {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 87, 34, ${this.opacity})`;
        ctx.lineWidth = 1;

        for (let x = 0; x < canvas.width; x += 5) {
          const y = this.y + Math.sin((x * this.frequency) + this.offset) * this.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
    }

    // Initialize
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
      }
    };

    const initWaves = () => {
      waves = [];
      for (let i = 0; i < 5; i++) {
        waves.push(new Wave(
          canvas.height * (0.2 + i * 0.15),
          20 + i * 10,
          0.005 + i * 0.002,
          0.02 + i * 0.005,
          0.05 + i * 0.02
        ));
      }
    };

    initParticles();
    initWaves();

    // Draw flowing gradient mesh
    const drawGradientMesh = () => {
      const time = Date.now() * 0.001;
      
      // Animated gradient orbs
      const orbs = [
        { x: canvas.width * 0.2 + Math.sin(time * 0.5) * 100, y: canvas.height * 0.3 + Math.cos(time * 0.3) * 50, r: 200, color: 'rgba(255, 87, 34, 0.1)' },
        { x: canvas.width * 0.8 + Math.cos(time * 0.4) * 80, y: canvas.height * 0.7 + Math.sin(time * 0.6) * 60, r: 250, color: 'rgba(244, 67, 54, 0.08)' },
        { x: canvas.width * 0.5 + Math.sin(time * 0.7) * 120, y: canvas.height * 0.5 + Math.cos(time * 0.5) * 80, r: 180, color: 'rgba(255, 152, 0, 0.06)' },
      ];

      orbs.forEach(orb => {
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
    };

    // Draw connecting lines between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.15;
            ctx.strokeStyle = `rgba(255, 87, 34, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient mesh
      drawGradientMesh();

      // Draw waves
      waves.forEach(wave => {
        wave.update();
        wave.draw();
      });

      // Draw connections
      drawConnections();

      // Draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const categories = ['All', ...new Set(skills.map(skill => skill.category))];
  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const handleCategoryClick = (category) => {
    playClick();
    setActiveCategory(category);
  };

  const handleSkillHover = (index) => {
    if (hoveredSkill !== index) {
      playHover();
      setHoveredSkill(index);
    }
  };

  const handleLanguageHover = () => {
    playPop();
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 bg-black overflow-hidden"
    >
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.8 }}
      />

      {/* Multi-layer parallax background */}
      <Parallax speed={-30} className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 87, 34, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </Parallax>

      {/* Flowing gradient overlays */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-amber-500/5 via-transparent to-orange-500/5 animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>

      <Parallax speed={-25} translateX={[-100, 100]} className="absolute inset-0">
        <div className="absolute top-10 left-0 w-96 h-96 bg-orange-500/15 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </Parallax>
      
      <Parallax speed={-15} translateX={[50, -50]} className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-amber-500/12 rounded-full filter blur-2xl animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-orange-400/10 rounded-full filter blur-2xl animate-pulse" style={{ animationDuration: '7s' }} />
      </Parallax>

      {/* Floating shapes */}
      <Parallax speed={20} rotate={[0, 90]} className="absolute top-20 left-20">
        <div className="w-16 h-16 border-2 border-orange-500/30 rounded-lg animate-spin-slow" />
      </Parallax>
      <Parallax speed={-20} rotate={[90, 0]} className="absolute bottom-20 right-20">
        <div className="w-20 h-20 border-2 border-red-500/30 rounded-full animate-bounce-slow" />
      </Parallax>
      <Parallax speed={15} translateY={[-20, 20]} className="absolute top-1/2 right-10">
        <div className="w-12 h-12 border border-amber-500/35 rounded-lg rotate-45 animate-pulse" />
      </Parallax>
      <Parallax speed={-15} translateY={[20, -20]} className="absolute top-1/4 left-10">
        <div className="w-14 h-14 border border-orange-400/30 rounded-full" style={{ animation: 'float 4s ease-in-out infinite' }} />
      </Parallax>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <Parallax speed={10} scale={[0.9, 1.05]}>
          <div
            className={`text-center mb-12 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-400 animate-pulse" style={{ animationDuration: '3s' }}>Expertise</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full" />
          </div>
        </Parallax>

        {/* Category filter */}
        <Parallax speed={5}>
          <div
            className={`flex flex-wrap justify-center gap-3 mb-12 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                onMouseEnter={() => playHover()}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50'
                    : 'bg-gray-800/50 text-gray-400 border border-orange-500/20 hover:border-orange-500/50 hover:text-white hover:bg-orange-500/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Parallax>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredSkills.map((skill, index) => {
            const IconComponent = LucideIcons[skill.icon] || LucideIcons.Code;
            const parallaxSpeed = ((index % 3) - 1) * 8;
            const translateDirection = index % 2 === 0 ? [-15, 15] : [15, -15];
            
            return (
              <Parallax 
                key={index} 
                speed={parallaxSpeed}
                translateY={translateDirection}
                scale={[0.95, 1.02]}
              >
                <div
                  className={`group relative transform transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 50}ms` }}
                  onMouseEnter={() => handleSkillHover(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className={`relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border rounded-xl p-6 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2 ${
                    hoveredSkill === index 
                      ? 'border-orange-500/70 shadow-lg shadow-orange-500/30' 
                      : 'border-orange-500/20 hover:border-orange-500/50'
                  }`}>
                    {/* Animated glow on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-orange-500/0 to-red-500/0 rounded-xl transition-all duration-500 ${
                      hoveredSkill === index ? 'from-orange-500/15 to-red-500/15' : 'group-hover:from-orange-500/10 group-hover:to-red-500/10'
                    }`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg transition-all duration-300 ${
                            hoveredSkill === index 
                              ? 'bg-orange-500/30 scale-110' 
                              : 'bg-orange-500/10 group-hover:bg-orange-500/20'
                          }`}>
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

                      {/* Animated progress bar */}
                      <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${(index + 2) * 50}ms`
                          }}
                        />
                        {/* Shimmer effect */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          style={{
                            transform: 'translateX(-100%)',
                            animation: isVisible ? 'shimmer 2s ease-in-out infinite' : 'none',
                            animationDelay: `${index * 200}ms`
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
        <Parallax speed={-8} translateY={[20, -20]}>
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
                <Parallax key={index} speed={(index - 1) * 5} translateX={[(index - 1) * -10, (index - 1) * 10]}>
                  <div
                    className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                    onMouseEnter={handleLanguageHover}
                    onClick={() => playClick()}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 rounded-xl transition-all duration-500" />
                    <div className="relative text-center">
                      <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                        {language.name}
                      </h4>
                      <p className="text-gray-400">{language.level}</p>
                    </div>
                  </div>
                </Parallax>
              ))}
            </div>
          </div>
        </Parallax>
      </div>

      {/* Add shimmer keyframe */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
