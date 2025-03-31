import { Button as ButtonHUI } from '@heroui/react';
import React from 'react';

export const Button = ({ content, ...props }) => {
  return <ButtonHUI children={content} color="secondary" {...props} />;
};
