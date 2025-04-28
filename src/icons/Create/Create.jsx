import React from 'react';
import { TiPlus } from 'react-icons/ti';

export const Create = ({ className = '', onPress }) => {
  return (
    <div className={className} onClick={onPress}>
      <TiPlus />
    </div>
  );
};
