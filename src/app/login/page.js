'use client';

import { Form } from '@/components';
import { config } from '@/config';
import { services } from '@/services';
import { Input, Screen } from '@/ui';
import { addToast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('')

  const handleSubmit = async () => {
    const response = await services.auth.login({ username });

    if (response?.status == 'error') addToast({ title: 'Error', description: response?.error, color: 'danger' });
    if (response?.status == 'success') router.push('/');
  };

  const getImages = async () => {
    const response = await services.login.index({ limit: 100 })
    const items = response.data;
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomItem = items[randomIndex];
    setImage(randomItem)
  }

  useEffect(() => {
    getImages()
  }, [])

  return (
    <Screen className="flex justify-center items-center h-full">
      <Form
        title={`Bienvenido`}
        onSubmit={handleSubmit}
        submitText="Iniciar"
        src={image?.url}
        className="h-[500px] w-[980px]"
      >
        <img src={config.image.logo_animated} className='h-[60px] absolute bottom-2 right-2' />
        <Input value={username} onChange={(e) => setUsername(e.target.value)} label="Por favor, inicia sesión" placeholder="Número de empleado" autoFocus />
      </Form>


    </Screen>
  );
}
