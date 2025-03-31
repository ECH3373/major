'use client';

import { Search as Icon } from '@/icons';
import { Button, Input } from '@heroui/react';
import React, { useState } from 'react';

export const Search = ({ onSubmit, placeholder = 'Buscar' }) => {
  const [value, setvalue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  return (
    <div className="h-10">
      <form onSubmit={handleSubmit}>
        <Input value={value} onChange={(e) => setvalue(e.target.value)} placeholder={placeholder} endContent={<Icon />} />
      </form>
    </div>
  );
};
