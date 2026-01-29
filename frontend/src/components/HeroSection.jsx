import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Code2, Sparkles, Download } from 'lucide-react';
import { profileData } from '../data/mock';

const HeroSection = () => {
  const floatingRef = useRef(null);
  const imageRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Building innovative solutions with code';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (floatingRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * 20;
        floatingRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      // 3D tilt effect on image
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      }
    };

    const handleMouseLeave = () => {
      if (imageRef.current) {
        imageRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (imageRef.current) {
      imageRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (imageRef.current) {
        imageRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Floating 3D shapes */}
      <div
        ref={floatingRef}
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
      >
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-cyan-400/30 rounded-lg transform rotate-45 animate-spin-slow" />
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border-2 border-teal-400/30 rounded-full animate-bounce-slow" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 border-2 border-cyan-400/20 rounded-lg transform -rotate-12" style={{ animation: 'spin-slow 15s linear infinite reverse' }} />
        <div className="absolute bottom-1/4 right-1/2 w-20 h-20 border border-teal-400/20 rounded-full" style={{ animation: 'bounce-slow 4s ease-in-out infinite' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-6 animate-fade-in-up">
          <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium backdrop-blur-sm">
            {profileData.title}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-white">Hello, I'm </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 mt-2">
              {profileData.name}
            </span>
          </h1>

          {/* Typing animation */}
          <div className="flex items-center gap-2 text-xl text-cyan-400 font-medium">
            <Code2 size={24} className="animate-pulse" />
            <span className="min-h-[30px]">{typedText}</span>
            <span className="inline-block w-0.5 h-6 bg-cyan-400 animate-pulse" />
          </div>

          <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
            {profileData.description}
          </p>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-3">
            {['React', 'Python', 'AI/ML', 'Full-Stack'].map((tech, index) => (
              <div
                key={tech}
                className="px-4 py-2 bg-black/50 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm font-medium hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Sparkles size={14} className="inline mr-2" />
                {tech}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={scrollToContact}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full font-medium hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Get In Touch
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </button>
            
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border-2 border-cyan-500/50 text-cyan-400 rounded-full font-medium hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300 hover:scale-105"
            >
              View Projects
            </a>

            <button
              onClick={() => alert('Resume download feature - Add your resume link here!')}
              className="group px-8 py-4 bg-black/50 border-2 border-teal-500/50 text-teal-400 rounded-full font-medium hover:bg-teal-500/10 hover:border-teal-500 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Download size={20} className="group-hover:animate-bounce" />
              Resume
            </button>
          </div>
        </div>

        {/* 3D Profile Card */}
        <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative group perspective-1000">
            {/* Animated rings */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-8 rounded-full border-2 border-teal-500/20 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
            </div>

            {/* Glowing effect */}
            <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700 animate-pulse" />
            
            {/* Card */}
            <div 
              ref={imageRef}
              className="relative bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-2xl border-2 border-cyan-500/30 rounded-3xl p-4 transition-all duration-300 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform'
              }}
            >
              {/* Decorative corners */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-teal-400 rounded-tr-xl" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-teal-400 rounded-bl-xl" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-xl" />

              <div className="relative rounded-2xl overflow-hidden border-4 border-cyan-500/40 shadow-2xl shadow-cyan-500/30">
                {/* Scan line effect */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan" />
                </div>

                <img
                  src={profileData.profileImage}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                  style={{ 
                    maxWidth: '400px',
                    aspectRatio: '1/1',
                    objectPosition: 'center 20%'
                  }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating status indicator */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full font-semibold text-sm shadow-lg shadow-cyan-500/50 flex items-center gap-2 animate-bounce-slow">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Open to Collaborate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-cyan-400 rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;