import React from 'react';

export const Screen = ({ children, className = '' }) => {
  return <div className={`p-2 ${className}`}>{children}</div>;
};
