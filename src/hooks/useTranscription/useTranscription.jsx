import React, { useRef, useState } from 'react';

export const useTranscription = () => {
  const [text, setText] = useState('');
  const recognitionRef = useRef(null);

  const start = () => {
    setText('');
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      console.error('Tu navegador no soporta la API de reconocimiento de voz.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'es-ES';

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + ' ';
      }
      setText(transcript.trim());
    };

    recognition.onerror = (event) => {
      console.error('Error en la transcripción: ', event.error);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    return text;
  };

  return {
    start,
    stop,
    text,
  };
};
