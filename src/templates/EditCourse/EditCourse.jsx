'use client';

import { Form } from '@/components';
import { services } from '@/services';
import { Input, Picker, Textarea } from '@/ui';
import { addToast } from '@heroui/react';
import React, { useEffect, useState } from 'react';

export const EditCourse = ({ id, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [background, setBackground] = useState('');
  const [book, setBook] = useState('');

  const get = async () => {
    const response = await services.courses.show({ id });
    if (response?.status == 'error') {
      addToast({ title: 'Error', description: response?.message, color: 'danger' });
      return;
    }

    if (response?.status == 'success') {
      setName(response?.data.name);
      setDescription(response?.data.description);
      setImage(response?.data?.image);
      setBackground(response?.data?.background);
      setBook(response?.data?.book);
    }
  };

  const edit = async () => {
    const response = await services.courses.update({ id, name, description, image, background, book });

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
    <Form title="Editar curso" subtitle="Editar curso existente" submitText="Guardar cambios" onSubmit={edit}>
      <Input value={name} onChange={(e) => setName(e.target.value)} label="Nombre" placeholder="Agrega un nombre para el curso" />
      <Input value={book} onChange={(e) => setBook(e.target.value)} label="Manual" placeholder="Agrega un manual para el curso" />
      <Textarea value={description || ''} onChange={(e) => setDescription(e.target.value)} label="Descripción" placeholder="Agrega una descripción para el curso" />

      <Form.Row>
        <Picker className="flex-1" value={image} onChange={setImage} label="Imagen" placeholder="Imagen de curso" />
        <Picker className="flex-1" value={background} onChange={setBackground} label="Fondo" placeholder="Fondo de curso" />
      </Form.Row>
    </Form>
  );
};
