import { Form } from '@/components';
import { services } from '@/services';
import { Autocomplete, Input, InputDate } from '@/ui';
import React, { useState } from 'react';

export const CreateEvent = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState('');
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState('');

  const get_courses = async ({ search = '' } = {}) => {
    const response = await services.courses.index({ params: { limit: 10, search } });
    if (response?.data) setCourses(response?.data);
  };

  const get_employees = async ({ search = '' } = {}) => {
    const response = await services.employees.index({ params: { limit: 10, search } });
    if (response?.data) setEmployees(response?.data);
  };

  const create = async () => {
    const response = await services.events.store({ name, start_date: startDate, end_date: endDate, trainer_id: employee, course_id: course });
    if (response?.status == 'error') addToast({ title: 'Error', description: response?.message, color: 'danger' });

    if (response?.status == 'success') {
      if (onSubmit) onSubmit(response);
      addToast({ title: 'Success', description: response?.message, color: 'success' });
    }
  };

  return (
    <Form title="Crear evento" subtitle="Crea un nuevo evento" submitText="Crear" onSubmit={create}>
      <Input value={name} onChange={(e) => setName(e.target.value)} label="Nombre" placeholder="Agrega un nombre para el evento" />

      <Form.Row>
        <InputDate value={startDate} onChange={setStartDate} label="Fecha de inicio" />
        <InputDate value={endDate} onChange={setEndDate} label="Fecha de fin" />
      </Form.Row>

      <Form.Row>
        <Autocomplete label="Curso" placeholder="Selecciona un curso" onSearch={(search) => get_courses({ search })} onChange={setCourse}>
          {courses.map((course) => {
            const value = course.id;
            const name = course.name;
            return { value, name };
          })}
        </Autocomplete>

        <Autocomplete label="Entrenador" placeholder="Selecciona un entrenador" onSearch={(search) => get_employees({ search })} onChange={setEmployee}>
          {employees.map((employee) => {
            const value = employee.id;
            const name = employee.name;
            return { value, name };
          })}
        </Autocomplete>
      </Form.Row>
    </Form>
  );
};
