import React from 'react';

export const Screen = ({ children, className = '', style = {} }) => {
  return (
    <div className={`p-2 ${className}`} style={style}>
      {children}
    </div>
  );
};
