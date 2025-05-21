import { Form } from '@/components';
import { services } from '@/services';
import { Picker } from '@/ui';
import { addToast } from '@heroui/react';
import React, { useState } from 'react'

export const CreateImageLogin = ({ onSubmit }) => {
  const [image, setImage] = useState('')

  const save = async () => {
    const response = await services.login.store({ image })

    if (response?.status == 'error') addToast({ title: 'Error', description: response?.message, color: 'danger' });

    if (response?.status == 'success') {
      if (onSubmit) onSubmit(response);
      addToast({ title: 'Success', description: response?.message, color: 'success' });
    }
  }

  return (
    <Form title="Crear imagen" subtitle="Crer nueva imagen" submitText="Crear" onSubmit={save} className='flex justify-center items-center'>
      <Picker value={image} onChange={setImage} placeholder='Agregar nueva imagen' />
    </Form>)
}
