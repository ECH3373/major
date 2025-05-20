'use client';

import { Form } from '@/components';
import { services } from '@/services';
import { Autocomplete } from '@/ui';
import { addToast } from '@heroui/react';
import React, { useEffect, useState } from 'react';

export const CreateEnrollment = ({ onSubmit, event_id }) => {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState('');

  const get_employees = async ({ search = '' } = {}) => {
    const response = await services.employees.index({ params: { limit: 10, search } });
    if (response?.data) setEmployees(response?.data);
  };

  const create = async () => {
    const response = await services.enrollments.store({ employee_id: employee, event_id });
    if (response?.status == 'error') addToast({ title: 'Error', description: response?.error, color: 'danger' });

    if (response?.status == 'success') {
      if (onSubmit) onSubmit(response);
      await services.auth.register({ employee_id: employee })
      addToast({ title: 'Success', description: response?.message, color: 'success' });
    }
  };

  useEffect(() => {
    get_employees();
  }, []);

  return (
    <Form title="Inscribir" subtitle="Inscribe a un usuario a un curso" submitText="Inscribir" onSubmit={create}>
      <Form.Row>
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
