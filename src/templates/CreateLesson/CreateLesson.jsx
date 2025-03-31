import { Form } from '@/components';
import { services } from '@/services';
import { Input, InputNumber, Picker, Select, Textarea } from '@/ui';
import { addToast } from '@heroui/react';
import React, { useEffect, useState } from 'react';

export const CreateLesson = ({ module_id, onSubmit }) => {
  const [lessons, setLessons] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(1);
  const [referencePosition, setReferencePosition] = useState('');
  const [addReferencePosition, setAddReferencePosition] = useState('+1');

  const get = async () => {
    const response = await services.lessons.index({ limit: 100, filters: [['module_id', [module_id]]], order: [['order', 'asc']] });
    if (response?.data) setLessons(response?.data);
    if (response?.data?.length > 0) setReferencePosition(String(response?.data[response?.data?.length - 1].order));
  };

  const create = async () => {
    const order = Number(referencePosition) + (addReferencePosition === '-1' ? 0 : 1);
    const response = await services.lessons.store({ module_id, name, description, image, order, file, duration_seconds: durationMinutes * 60 });
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
    <Form title="Crear lección" subtitle="Crea una nueva leccion" submitText="Crear" onSubmit={create}>
      <Input value={name} onChange={(e) => setName(e.target.value)} label="Nombre" placeholder="Agrega un nombre para la leccion" />

      <Form.Row>
        <Picker onChange={setImage} label="Imagen" placeholder="Imagen de leccion" />
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} label="Descripción" placeholder="Agrega una descripción para la leccion" />
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
