'use client';

import { Form } from '@/components';
import { config } from '@/config';
import { services } from '@/services';
import { Input, Screen } from '@/ui';
import { addToast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    const response = await services.auth.login({ username });

    if (response?.status == 'error') addToast({ title: 'Error', description: response?.error, color: 'danger' });
    if (response?.status == 'success') router.push('/');
  };

  return (
    <Screen className="flex justify-center items-center h-full">
      <Form
        title={`Bienvenido a ${config.app.name}`}
        subtitle="Por favor, inicia sesión"
        onSubmit={handleSubmit}
        submitText="Iniciar"
        src="https://picsum.photos/800/800"
        className="h-[500px] w-[800px]"
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)} label="Número de empleado" placeholder="Escribe tu número de empleado" autoFocus />
      </Form>
    </Screen>
  );
}
