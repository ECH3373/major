import { Avatar as AvatarHUI } from '@heroui/react';
import React from 'react';

export const Avatar = ({ ...props }) => {
  return <AvatarHUI color="primary" {...props} />;
};
