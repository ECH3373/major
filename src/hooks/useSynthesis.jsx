import { useRef } from 'react';

export const useSynthesis = () => {
  const audioRef = useRef(null);

  const play = async (audioUrl) => {
    return new Promise((resolve) => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.play();
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
    });
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return {
    play,
    stop,
  };
};
