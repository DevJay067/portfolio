import React, { createContext, useContext, useCallback, useRef, useState } from 'react';

const SoundContext = createContext(null);

const SOUND_CONFIG = {
  click: { frequency: 800, duration: 0.08, type: 'sine', volume: 0.15 },
  hover: { frequency: 600, duration: 0.05, type: 'sine', volume: 0.08 },
  success: { frequency: 1200, duration: 0.15, type: 'sine', volume: 0.12 },
  pop: { frequency: 400, duration: 0.06, type: 'triangle', volume: 0.1 },
  swoosh: { frequency: 300, duration: 0.12, type: 'sawtooth', volume: 0.06 },
  tap: { frequency: 1000, duration: 0.04, type: 'square', volume: 0.08 },
  toggle: { frequency: 500, duration: 0.1, type: 'sine', volume: 0.1 }
};

export const SoundProvider = ({ children }) => {
  const audioContextRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume context if suspended (browser autoplay policy)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((type = 'click') => {
    if (!soundEnabled) return;
    
    try {
      const config = SOUND_CONFIG[type] || SOUND_CONFIG.click;
      const audioContext = getAudioContext();
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = config.type;
      oscillator.frequency.setValueAtTime(config.frequency, audioContext.currentTime);
      
      if (type === 'click' || type === 'tap') {
        oscillator.frequency.exponentialRampToValueAtTime(
          config.frequency * 0.5,
          audioContext.currentTime + config.duration
        );
      } else if (type === 'swoosh') {
        oscillator.frequency.exponentialRampToValueAtTime(
          config.frequency * 2,
          audioContext.currentTime + config.duration
        );
      } else if (type === 'success') {
        oscillator.frequency.exponentialRampToValueAtTime(
          config.frequency * 1.5,
          audioContext.currentTime + config.duration * 0.5
        );
        oscillator.frequency.exponentialRampToValueAtTime(
          config.frequency * 2,
          audioContext.currentTime + config.duration
        );
      }
      
      gainNode.gain.setValueAtTime(config.volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + config.duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + config.duration);
    } catch (error) {
      console.log('Audio not supported');
    }
  }, [getAudioContext, soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  const value = {
    playSound,
    playClick: () => playSound('click'),
    playHover: () => playSound('hover'),
    playSuccess: () => playSound('success'),
    playPop: () => playSound('pop'),
    playSwoosh: () => playSound('swoosh'),
    playTap: () => playSound('tap'),
    playToggle: () => playSound('toggle'),
    soundEnabled,
    toggleSound
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
};

export default SoundContext;
