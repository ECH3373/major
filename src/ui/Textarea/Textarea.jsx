import { Textarea as TextareaHUI } from '@heroui/react';
import React from 'react';

export const Textarea = ({ ...props }) => {
  return <TextareaHUI variant="bordered" minRows={4} maxRows={4} {...props} />;
};
