'use client';

import { Form } from '@/components';
import { services } from '@/services';
import { Input, Picker, Textarea } from '@/ui';
import { addToast } from '@heroui/react';
import React, { useState } from 'react';

export const CreateCourse = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [background, setBackground] = useState('');
  const [book, setBook] = useState('');

  const create = async () => {
    const response = await services.courses.store({ name, description, image, background, book });
    if (response?.status == 'error') addToast({ title: 'Error', description: response?.message, color: 'danger' });

    if (response?.status == 'success') {
      if (onSubmit) onSubmit(response);
      addToast({ title: 'Success', description: response?.message, color: 'success' });
    }
  };

  return (
    <Form title="Crear curso" subtitle="Crea un nuevo curso" submitText="Crear" onSubmit={create}>
      <Input value={name} onChange={(e) => setName(e.target.value)} label="Nombre" placeholder="Agrega un nombre para el curso" />
      <Input value={book} onChange={(e) => setBook(e.target.value)} label="Manual" placeholder="Agrega una url para el manual del curso" />

      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} label="Descripción" placeholder="Agrega una descripción para el curso" />

      <Form.Row>
        <Picker className="flex-1" onChange={setImage} label="Imagen" placeholder="Imagen de curso" />
        <Picker className="flex-1" onChange={setBackground} label="Fondo" placeholder="Fondo de curso" />
      </Form.Row>
    </Form>
  );
};
