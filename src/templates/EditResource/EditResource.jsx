import { Form } from '@/components';
import { services } from '@/services';
import { Input, InputNumber, Picker, Textarea } from '@/ui';
import { addToast } from '@heroui/react';
import React, { useEffect, useState } from 'react';

export const EditResource = ({ id, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const get = async () => {
    const response = await services.resources.show({ id });
    if (response?.status == 'error') {
      addToast({ title: 'Error', description: response?.message, color: 'danger' });
      return;
    }

    if (response?.status == 'success') {
      setName(response?.data?.name);
      setDescription(response?.data?.description);
      setImage(response?.data?.image);
      setQuantity(response?.data?.quantity);
    }
  };

  const save = async () => {
    const response = await services.resources.update({ id, name, description, image, quantity });

    if (response?.status == 'error') addToast({ title: 'Error', description: response?.message, color: 'danger' });
    if (response?.status == 'success') {
      if (onSubmit) onSubmit(response);
      addToast({ title: 'Success', description: response?.message, color: 'success' });
    }
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <Form title="Editar recurso" subtitle="Editar recurso existente" submitText="Guardar cambios" onSubmit={save}>
      <Input value={name} onChange={(e) => setName(e.target.value)} label="Nombre" placeholder="Agrega un nombre para el recurso" />

      <Form.Row>
        <Picker onChange={setImage} label="Imagen" placeholder="Imagen de recurso" />
        <Textarea value={description || ''} onChange={(e) => setDescription(e.target.value)} label="Descripción" placeholder="Agrega una descripción para el recurso" />
      </Form.Row>

      <InputNumber value={quantity} onChange={setQuantity} minValue={1} label="Cantidad" placeholder="Cantidad necesaria" />
    </Form>
  );
};
