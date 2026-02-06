import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Code2, Sparkles } from 'lucide-react';
import { Parallax } from 'react-scroll-parallax';
import { profileData } from '../data/mock';
import { useSoundContext } from '../context/SoundContext';

const HeroSection = () => {
  const floatingRef = useRef(null);
  const imageRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Building innovative solutions with code';
  const { playClick, playHover, playSuccess } = useSoundContext();

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
    playClick();
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    playClick();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
    >
      {/* Multi-layered parallax background */}
      <div className="absolute inset-0">
        <Parallax speed={-30} className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-orange-600/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-red-600/15 rounded-full filter blur-3xl" />
        </Parallax>
        
        <Parallax speed={-20} className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-500/15 rounded-full filter blur-2xl" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-orange-500/20 rounded-full filter blur-2xl" />
        </Parallax>
        
        <Parallax speed={-10} className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-red-500/10 rounded-full filter blur-xl" />
          <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-amber-400/15 rounded-full filter blur-xl" />
        </Parallax>
      </div>

      {/* Floating 3D shapes with enhanced parallax */}
      <div
        ref={floatingRef}
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out"
      >
        <Parallax speed={15} rotate={[-20, 20]} className="absolute top-1/4 right-1/4">
          <div className="w-32 h-32 border-2 border-orange-400/40 rounded-lg transform rotate-45 animate-spin-slow" />
        </Parallax>
        
        <Parallax speed={-25} translateX={[-20, 20]} className="absolute bottom-1/3 left-1/4">
          <div className="w-24 h-24 border-2 border-red-400/40 rounded-full animate-bounce-slow" />
        </Parallax>
        
        <Parallax speed={20} scale={[0.8, 1.2]} className="absolute top-1/2 right-1/3">
          <div className="w-16 h-16 border-2 border-orange-400/30 rounded-lg transform -rotate-12" />
        </Parallax>
        
        <Parallax speed={-15} rotate={[0, 180]} className="absolute bottom-1/4 right-1/2">
          <div className="w-20 h-20 border border-amber-400/30 rounded-full" />
        </Parallax>
        
        <Parallax speed={25} translateY={[-30, 30]} className="absolute top-1/3 left-1/6">
          <div className="w-12 h-12 border-2 border-red-500/25 rounded-lg rotate-12" />
        </Parallax>
        
        <Parallax speed={-20} translateX={[30, -30]} className="absolute bottom-1/3 right-1/6">
          <div className="w-14 h-14 border border-orange-500/35 rounded-full" />
        </Parallax>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content with parallax */}
        <Parallax speed={-8} translateX={[-10, 0]}>
          <div className="space-y-6 animate-fade-in-up">
            <Parallax speed={5} opacity={[0.5, 1]}>
              <div className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium backdrop-blur-sm">
                {profileData.title}
              </div>
            </Parallax>
            
            <Parallax speed={-5}>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-white">Hello, I'm </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-400 mt-2">
                  {profileData.name}
                </span>
              </h1>
            </Parallax>

            <Parallax speed={-3}>
              <div className="flex items-center gap-2 text-xl text-orange-400 font-medium">
                <Code2 size={24} className="animate-pulse" />
                <span className="min-h-[30px]">{typedText}</span>
                <span className="inline-block w-0.5 h-6 bg-orange-400 animate-pulse" />
              </div>
            </Parallax>

            <Parallax speed={-2}>
              <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                {profileData.description}
              </p>
            </Parallax>

            <Parallax speed={-1}>
              <div className="flex flex-wrap gap-3">
                {['React', 'Python', 'AI/ML', 'Full-Stack'].map((tech, index) => (
                  <div
                    key={tech}
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    className="px-4 py-2 bg-gray-800/50 border border-orange-500/30 rounded-lg text-orange-400 text-sm font-medium hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 hover:scale-105 cursor-pointer active:scale-95"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Sparkles size={14} className="inline mr-2" />
                    {tech}
                  </div>
                ))}
              </div>
            </Parallax>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToContact}
                onMouseEnter={() => playHover()}
                className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-medium hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                Get In Touch
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </button>
              
              <button
                onClick={scrollToProjects}
                onMouseEnter={() => playHover()}
                className="px-8 py-4 border-2 border-orange-500/50 text-orange-400 rounded-full font-medium hover:bg-orange-500/10 hover:border-orange-500 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                View Projects
              </button>
            </div>
          </div>
        </Parallax>

        {/* 3D Profile Card with enhanced parallax */}
        <Parallax speed={10} scale={[0.9, 1.05]} rotate={[-2, 2]}>
          <div className="relative animate-fade-in-up max-w-md mx-auto" style={{ animationDelay: '0.2s' }}>
            <div className="relative group perspective-1000">
              {/* Animated rings with parallax */}
              <Parallax speed={-15} scale={[0.8, 1.2]} className="absolute inset-0 -z-10">
                <div className="absolute inset-0 rounded-full border-2 border-orange-500/20 animate-ping" style={{ animationDuration: '3s' }} />
              </Parallax>
              <Parallax speed={-20} scale={[0.9, 1.1]} className="absolute inset-8 -z-10">
                <div className="absolute inset-0 rounded-full border-2 border-red-500/20 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
              </Parallax>

              {/* Glowing effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700 animate-pulse" />
              
              {/* Card */}
              <div 
                ref={imageRef}
                onMouseEnter={() => playHover()}
                className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-2xl border-2 border-orange-500/30 rounded-3xl p-2 transition-all duration-300 ease-out w-fit mx-auto"
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
              >
                {/* Decorative corners */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-orange-400 rounded-tl-xl" />
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-red-400 rounded-tr-xl" />
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-red-400 rounded-bl-xl" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-orange-400 rounded-br-xl" />

                <div className="relative rounded-2xl overflow-hidden border-4 border-orange-500/40 shadow-2xl shadow-orange-500/30">
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/10 to-transparent animate-scan" />
                  </div>

                  <img
                    src={profileData.profileImage}
                    alt={profileData.name}
                    className="w-full h-full object-cover object-center block"
                    style={{ 
                      width: '400px',
                      height: '400px',
                      mixBlendMode: 'normal',
                      backgroundColor: 'transparent'
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-gray-900/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 via-transparent to-gray-900/40" />
                </div>
              </div>
            </div>
          </div>
        </Parallax>
      </div>

      {/* Scroll indicator with parallax */}
      <Parallax speed={20} opacity={[1, 0]} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-orange-400/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-orange-400 rounded-full animate-scroll" />
          </div>
        </div>
      </Parallax>
    </section>
  );
};

export default HeroSection;
