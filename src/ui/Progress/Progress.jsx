import { Progress as ProgressHUI } from '@heroui/react';
import React from 'react';

export const Progress = ({ ...props }) => {
  return (
    <ProgressHUI
      classNames={{
        track: 'drop-shadow-md bg-transparent',
        indicator: 'bg-gradient-to-r from-primary to-secondary',
        label: 'tracking-wider font-medium text-default-600',
        value: 'text-foreground/60',
      }}
      size="sm"
      {...props}
    />
  );
};
