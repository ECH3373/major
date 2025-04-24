'use client';

import { Form } from '@/components';
import { services } from '@/services';
import { Input, Picker, Select, Textarea } from '@/ui';
import { addToast } from '@heroui/react';
import React, { useEffect, useState } from 'react';

export const EditModule = ({ id, onSubmit }) => {
  const [modules, setModules] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [background, setBackground] = useState('');
  const [referencePosition, setReferencePosition] = useState('');
  const [addReferencePosition, setAddReferencePosition] = useState('+1');

  const get = async () => {
    const response = await services.modules.show({ id });
    if (response?.status == 'error') {
      addToast({ title: 'Error', description: response?.message, color: 'danger' });
      return;
    }

    if (response?.status == 'success') {
      await get_modules(response?.data?.course_id);
      setName(response?.data?.name);
      setDescription(response?.data?.description);
      setImage(response?.data?.image);
      setBackground(response?.data?.background);
      setReferencePosition((response?.data?.order - 1).toString());
    }
  };

  const get_modules = async (course_id) => {
    const response = await services.modules.index({ params: { limit: 100, course_id, sort: [{ order: 'asc' }] } });
    if (response?.data) setModules(response?.data);
  };

  const save = async () => {
    const order = Number(referencePosition) + (addReferencePosition === '-1' ? 0 : 1);
    const response = await services.modules.update({ id, name, description, image, background, order });
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
    <Form title="Editar módulo" subtitle="Editar módulo existente" submitText="Guardar cambios" onSubmit={save}>
      <Input value={name} onChange={(e) => setName(e.target.value)} label="Nombre" placeholder="Agrega un nombre para el módulo" />

      {modules.length > 0 && (
        <Form.Row>
          <Select label="Posicionar" value={addReferencePosition} onChange={(e) => setAddReferencePosition(e.target.value)}>
            {[
              { value: '+1', name: 'Después de' },
              { value: '-1', name: 'Antes de' },
            ].map((position) => {
              return position;
            })}
          </Select>

          <Select label="Módulo" value={referencePosition} onChange={(e) => setReferencePosition(e.target.value)}>
            {modules.map((module) => {
              const value = module.order;
              const name = module.name;
              return { value, name };
            })}
          </Select>
        </Form.Row>
      )}

      <Textarea value={description || ''} onChange={(e) => setDescription(e.target.value)} label="Descripción" placeholder="Agrega una descripción para el curso" />

      <Form.Row>
        <Picker className="flex-1" value={image} onChange={setImage} label="Imagen" placeholder="Imagen de módulo" />
        <Picker className="flex-1" value={background} onChange={setBackground} label="Fondo" placeholder="Fondo de módulo" />
      </Form.Row>
    </Form>
  );
};
