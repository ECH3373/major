import { Card as CardHUI } from '@heroui/react';
import React from 'react';

export const Card = ({ ...props }) => {
  return <CardHUI isBlurred shadow="sm" {...props} />;
};
