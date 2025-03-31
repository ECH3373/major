import { NumberInput } from '@heroui/react';
import React from 'react';

export const InputNumber = ({ ...props }) => {
  return <NumberInput variant="bordered" {...props} />;
};
