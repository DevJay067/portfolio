import { useCallback, useRef } from 'react';

// Sound frequencies for different interactions
const SOUND_CONFIG = {
  click: {
    frequency: 800,
    duration: 0.08,
    type: 'sine',
    volume: 0.15
  },
  hover: {
    frequency: 600,
    duration: 0.05,
    type: 'sine',
    volume: 0.08
  },
  success: {
    frequency: 1200,
    duration: 0.15,
    type: 'sine',
    volume: 0.12
  },
  pop: {
    frequency: 400,
    duration: 0.06,
    type: 'triangle',
    volume: 0.1
  },
  swoosh: {
    frequency: 300,
    duration: 0.12,
    type: 'sawtooth',
    volume: 0.06
  },
  tap: {
    frequency: 1000,
    duration: 0.04,
    type: 'square',
    volume: 0.08
  }
};

const useSound = () => {
  const audioContextRef = useRef(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((type = 'click') => {
    try {
      const config = SOUND_CONFIG[type] || SOUND_CONFIG.click;
      const audioContext = getAudioContext();
      
      // Create oscillator
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = config.type;
      oscillator.frequency.setValueAtTime(config.frequency, audioContext.currentTime);
      
      // Add frequency sweep for more interesting sound
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
      }
      
      // Volume envelope
      gainNode.gain.setValueAtTime(config.volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + config.duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + config.duration);
    } catch (error) {
      // Silently fail if audio is not supported
      console.log('Audio not supported');
    }
  }, [getAudioContext]);

  const playClick = useCallback(() => playSound('click'), [playSound]);
  const playHover = useCallback(() => playSound('hover'), [playSound]);
  const playSuccess = useCallback(() => playSound('success'), [playSound]);
  const playPop = useCallback(() => playSound('pop'), [playSound]);
  const playSwoosh = useCallback(() => playSound('swoosh'), [playSound]);
  const playTap = useCallback(() => playSound('tap'), [playSound]);

  return {
    playSound,
    playClick,
    playHover,
    playSuccess,
    playPop,
    playSwoosh,
    playTap
  };
};

export default useSound;
