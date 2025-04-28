import React from 'react';

export const Screen = ({ children, className = '', style = {} }) => {
  return (
    <div className={`p-2 screen ${className}`} style={style}>
      {children}
    </div>
  );
};
