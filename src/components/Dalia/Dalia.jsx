'use client'

import { config } from '@/config';
import { useTranscription } from '@/hooks';
import { services } from '@/services';
import { Button, Siri } from '@/ui';
import React, { useEffect, useState } from 'react';

export const Dalia = ({ className }) => {
  const transcription = useTranscription()
  const [isListening, setIsListening] = useState(false)
  const [history, setHistory] = useState([])

  const reply = async (content) => {
    const response = await services.gpt.chat({
      prompt: 'tu nombre es D.A.L.I.A, eres un asistente virtual',
      history,
      role: 'user',
      content
    })

    if (response?.data?.history) setHistory(response?.data?.history)
    console.log(response.data)
  }

  const listen_start = async () => {
    setIsListening(true)
    transcription.start()
  }

  const listen_stop = async () => {
    setIsListening(false)
    const text = transcription.stop();
    if (text.trim() === '') return;
    console.log(transcription.text)
    await reply(transcription.text);
  }

  useEffect(() => {
    console.log(transcription.text)
  }, [transcription.text])


  return (
    <>
      {isListening && <Siri className={'fixed left-[50%] bottom-[20px]'} />}

      <Button
        onMouseDown={listen_start}
        onTouchStart={listen_start}
        onMouseUp={listen_stop}
        onTouchEnd={listen_stop}
        isIconOnly className={`${className} h-[60px] w-[60px] bg-primary rounded-full flex justify-center items-center`}>
        <img src={config.image.dalia} />
      </Button>

    </>
  );
};



