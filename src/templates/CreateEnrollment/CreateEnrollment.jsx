'use client';

import { Form } from '@/components';
import { services } from '@/services';
import { Autocomplete } from '@/ui';
import { addToast } from '@heroui/react';
import React, { useEffect, useState } from 'react';

export const CreateEnrollment = ({ onSubmit }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState('');
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState('');

  const get_courses = async ({ search = '' } = {}) => {
    const response = await services.courses.index({ limit: 10, search });
    if (response?.data) setCourses(response?.data);
  };

  const get_employees = async ({ search = '' } = {}) => {
    const response = await services.employees.index({ limit: 10, search });
    if (response?.data) setEmployees(response?.data);
  };

  const create = async () => {
    const response = await services.enrollments.store({ employee_id: employee, course_id: course });
    if (response?.status == 'error') addToast({ title: 'Error', description: response?.error, color: 'danger' });

    if (response?.status == 'success') {
      if (onSubmit) onSubmit(response);
      addToast({ title: 'Success', description: response?.message, color: 'success' });
    }
  };

  useEffect(() => {
    get_courses();
    get_employees();
  }, []);

  return (
    <Form title="Inscribir" subtitle="Inscribe a un usuario a un curso" submitText="Inscribir" onSubmit={create}>
      <Form.Row>
        <Autocomplete label="Curso" placeholder="Selecciona un curso" onSearch={(search) => get_courses({ search })} onChange={setCourse}>
          {courses.map((course) => {
            const value = course.id;
            const name = course.name;
            return { value, name };
          })}
        </Autocomplete>

        <Autocomplete label="Empleado" placeholder="Selecciona un empleado" onSearch={(search) => get_employees({ search })} onChange={setEmployee}>
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
