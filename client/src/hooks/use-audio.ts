import { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';
import useSound from 'use-sound';

// Base URL for audio files
const AUDIO_BASE_URL = '/audio';

/**
 * Custom hook for playing audio using Howler.js
 */
export function useAudio(src?: string) {
  const [sound, setSound] = useState<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Initialize the sound object when src changes
  useEffect(() => {
    if (!src) return;

    const fullSrc = src.startsWith('http') ? src : `${AUDIO_BASE_URL}/${src}`;

    try {
      const newSound = new Howl({
        src: [fullSrc],
        html5: true,
        preload: true,
        onload: () => {
          setIsLoaded(true);
          setError(null);
        },
        onplay: () => {
          setIsPlaying(true);
        },
        onend: () => {
          setIsPlaying(false);
        },
        onstop: () => {
          setIsPlaying(false);
        },
        onpause: () => {
          setIsPlaying(false);
        },
        onloaderror: (id, err) => {
          setError(new Error(`Failed to load audio: ${err}`));
        },
        onplayerror: (id, err) => {
          setError(new Error(`Failed to play audio: ${err}`));
        }
      });

      setSound(newSound);

      return () => {
        newSound.unload();
      };
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error loading audio'));
    }
  }, [src]);

  // Play function
  const play = useCallback(() => {
    if (sound && isLoaded) {
      sound.play();
    }
  }, [sound, isLoaded]);

  // Stop function
  const stop = useCallback(() => {
    if (sound) {
      sound.stop();
    }
  }, [sound]);

  // Pause function
  const pause = useCallback(() => {
    if (sound) {
      sound.pause();
    }
  }, [sound]);

  return {
    play,
    stop,
    pause,
    isPlaying,
    isLoaded,
    error
  };
}

/**
 * Simplified hook for playing audio using use-sound
 * (Better for short sound effects)
 */
export function useAudioEffect(src?: string, options = {}) {
  const fullSrc = src ? (src.startsWith('http') ? src : `${AUDIO_BASE_URL}/${src}`) : '';
  const [play, { stop, isPlaying, duration }] = useSound(fullSrc, {
    soundEnabled: true,
    ...options
  });

  return {
    play,
    stop,
    isPlaying,
    duration
  };
}

/**
 * Hook for automatically playing audio when component mounts
 */
export function useAutoPlayAudio(src?: string, autoPlay = true) {
  const audio = useAudio(src);

  useEffect(() => {
    if (autoPlay && audio.isLoaded && !audio.isPlaying && !audio.error) {
      audio.play();
    }
  }, [autoPlay, audio]);

  return audio;
}