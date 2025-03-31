import { Form } from '@/components';
import { services } from '@/services';
import { Input, InputNumber, Picker, Textarea } from '@/ui';
import { addToast } from '@heroui/react';
import React, { useState } from 'react';

export const CreateResource = ({ lesson_id, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const create = async () => {
    const response = await services.resources.store({ name, description, image, lesson_id, quantity });
    if (response?.status == 'error') addToast({ title: 'Error', description: response?.message, color: 'danger' });

    if (response?.status == 'success') {
      if (onSubmit) onSubmit(response);
      addToast({ title: 'Success', description: response?.message, color: 'success' });
    }
  };

  return (
    <Form title="Crear recurso" subtitle="Crea un nuevo recurso" submitText="Crear" onSubmit={create}>
      <Input value={name} onChange={(e) => setName(e.target.value)} label="Nombre" placeholder="Agrega un nombre para el recurso" />

      <Form.Row>
        <Picker onChange={setImage} label="Imagen" placeholder="Imagen de recurso" />
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} label="Descripción" placeholder="Agrega una descripción para el recurso" />
      </Form.Row>

      <InputNumber value={quantity} onChange={setQuantity} minValue={1} label="Cantidad" placeholder="Cantidad necesaria" />
    </Form>
  );
};
