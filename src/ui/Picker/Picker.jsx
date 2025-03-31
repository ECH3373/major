'use client';

import React, { useEffect, useState } from 'react';

export const Picker = ({ className = '', value, onChange, placeholder = '' }) => {
  //const [image, setImage] = useState(value);
  const [preview, setPreview] = useState(value);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      //setImage(file);
      setPreview(URL.createObjectURL(file));
      if (onChange) onChange(file);
    }
  };

  return (
    <div
      className={`relative flex flex-col justify-center items-center h-[122px] w-[122px] border-2 border-default rounded-lg p-2 hover:border-default-400 flex-shrink-0 overflow-hidden ${className}`}
    >
      <input onChange={handleChange} type="file" accept="image/*" className="absolute h-full w-full top-0 left-0 opacity-0" />
      {!preview && !value && <p className="text-sm text-default-500 text-center pointer-events-none">{placeholder}</p>}
      {(preview || value) && <img src={preview || value} className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none" />}
    </div>
  );
};
