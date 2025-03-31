'use client';

import { Select as SelectHUI, SelectItem } from '@heroui/react';
import React from 'react';

export const Select = ({ label = '', placeholder = '', value, onChange, children = [] }) => {
  return (
    <SelectHUI label={label} placeholder={placeholder} selectedKeys={[value]} onChange={onChange} variant="bordered">
      {children.map((option) => (
        <SelectItem key={option.value}>{option.name}</SelectItem>
      ))}
    </SelectHUI>
  );
};
