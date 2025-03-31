import { Input as InputHUI } from '@heroui/react';
import React from 'react';

export const Input = ({ ...props }) => {
  return <InputHUI variant="bordered" {...props} />;
};
