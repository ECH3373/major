'use client';

import { Form } from '@/components';
import { services } from '@/services';
import { Input, InputNumber, Picker, Select, Textarea } from '@/ui';
import { addToast } from '@heroui/react';
import React, { useEffect, useState } from 'react';

export const EditLesson = ({ id, onSubmit }) => {
  const [lessons, setLessons] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(1);
  const [referencePosition, setReferencePosition] = useState('');
  const [addReferencePosition, setAddReferencePosition] = useState('+1');

  const get = async () => {
    const response = await services.lessons.show({ id });
    if (response?.status == 'error') {
      addToast({ title: 'Error', description: response?.message, color: 'danger' });
      return;
    }

    if (response?.status == 'success') {
      await get_lessons(response?.data?.module_id);
      setName(response?.data?.name);
      setDescription(response?.data?.description);
      setImage(response?.data?.image);
      setFile(response?.data?.file);
      setDurationMinutes(response?.data?.duration_seconds / 60);
      setReferencePosition((response?.data?.order - 1).toString());
    }
  };

  const get_lessons = async (module_id) => {
    const response = await services.lessons.index({ limit: 100, filters: [['module_id', [module_id]]], order: [['order', 'asc']] });
    if (response?.data) setLessons(response?.data);
  };

  const save = async () => {
    const order = Number(referencePosition) + (addReferencePosition === '-1' ? 0 : 1);
    const response = await services.lessons.update({ id, name, description, image, file, duration_seconds: durationMinutes * 60, order });
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
    <Form title="Editar lección" subtitle="Editar lección existente" submitText="Guardar cambios" onSubmit={save}>
      <Input value={name} onChange={(e) => setName(e.target.value)} label="Nombre" placeholder="Agrega un nombre para la lección" />

      <Form.Row>
        <Picker value={image} onChange={setImage} label="Imagen" placeholder="Imagen de lección" />
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} label="Descripción" placeholder="Agrega una descripción para la lección" />
      </Form.Row>

      <Form.Row>
        <Input value={file} onChange={(e) => setFile(e.target.value)} label="Link" placeholder="Link de la lección" />
        <InputNumber value={durationMinutes} onChange={setDurationMinutes} minValue={1} label="Minutos" placeholder="Duración de la lección" />
      </Form.Row>

      {lessons.length > 0 && (
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
            {lessons.map((module) => {
              const value = module.order;
              const name = module.name;
              return { value, name };
            })}
          </Select>
        </Form.Row>
      )}
    </Form>
  );
};
