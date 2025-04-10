'use client';

import { Form } from '@/components';
import { services } from '@/services';
import { Input, InputNumber, Picker, Textarea } from '@/ui';
import React, { useState } from 'react';

export const CreateProduct = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [sku, setSku] = useState('');
  const [set, setSet] = useState(1);

  const create = async () => {
    const response = await services.products.store({ sku, name, description, set, image });

    if (response?.status == 'error') addToast({ title: 'Error', description: response?.message, color: 'danger' });

    if (response?.status == 'success') {
      if (onSubmit) onSubmit(response);
      addToast({ title: 'Success', description: response?.message, color: 'success' });
    }
  };

  return (
    <Form title="Crear producto" subtitle="Crea un nuevo producto" submitText="Crear" onSubmit={create}>
      <Input value={name} onChange={(e) => setName(e.target.value)} label="Nombre" placeholder="Agrega un nombre para el producto" />

      <Form.Row>
        <Input value={sku} onChange={(e) => setSku(e.target.value)} label="Sku" placeholder="Agrega un codigo único para el producto" />
        <InputNumber value={set} onChange={setSet} minValue={1} label="Set" placeholder="Agrega la cantidad de unidades que contiene el set" />
      </Form.Row>

      <Form.Row>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} label="Descripción" placeholder="Agrega una descripción para el producto" />
        <Picker onChange={setImage} label="Imagen" placeholder="Imagen de producto" />
      </Form.Row>
    </Form>
  );
};
