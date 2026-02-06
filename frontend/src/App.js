import React from 'react';
import './App.css';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import ParticleBackground from './components/ParticleBackground';
import GlassNavbar from './components/GlassNavbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <ParallaxProvider>
      <ThemeProvider>
        <SoundProvider>
          <div className="App">
            <ParticleBackground />
            <GlassNavbar />
            <HeroSection />
            <StatsSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
            <Footer />
          </div>
        </SoundProvider>
      </ThemeProvider>
    </ParallaxProvider>
  );
}

export default App;
