'use client';

import { DatePicker } from '@heroui/react';
import { parseDate } from '@internationalized/date';
import React, { useEffect } from 'react';

export const InputDate = ({ value, onChange, ...props }) => {
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (date) => {
    const formattedDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
    if (onChange) onChange(formattedDate);
  };

  useEffect(() => {
    if (!value && onChange) onChange(new Date().toISOString().split('T')[0]);
  }, []);

  return <DatePicker value={parseDate(value || today)} onChange={handleChange} variant="bordered" {...props} />;
};
