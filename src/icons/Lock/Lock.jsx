import React from 'react';
import { FaLock } from 'react-icons/fa';

export const Lock = ({ className = '' }) => {
  return (
    <div className={`${className}`}>
      <FaLock />
    </div>
  );
};
