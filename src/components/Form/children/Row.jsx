import React from 'react';

export const Row = ({ className = '', children }) => {
  return <div className={`${className} flex gap-2`}>{children}</div>;
};
