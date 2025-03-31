import { User as UserHUI } from '@heroui/react';
import React from 'react';

export const User = ({ src, ...props }) => {
  return <UserHUI avatarProps={{ src }} {...props} />;
};
