'use client';

import { Modal } from '@/ui';
import React, { createContext, useContext, useState } from 'react';

const SwalContext = createContext();

export const SwalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [onConfirm, setOnConfirm] = useState(null);
  const [onCancel, setOnCancel] = useState(null);
  const [confirmText, setConfirmText] = useState(null);
  const [cancelText, setCancelText] = useState(null);
  const [showConfirmButton, setShowConfirmButton] = useState(true);
  const [showCancelButton, setShowCancelButton] = useState(false);

  const fire = ({ title = '', content = '', onConfirm, onCancel, confirmText = 'Aceptar', cancelText = 'Cancelar', showConfirmButton = true, showCancelButton = false } = {}) => {
    setIsOpen(true);
    setTitle(title);
    setContent(content);
    setOnConfirm(onConfirm);
    setOnCancel(onCancel);
    setConfirmText(confirmText);
    setCancelText(cancelText);
    setShowConfirmButton(showConfirmButton);
    setShowCancelButton(showCancelButton);
  };

  const close = () => {
    setIsOpen(false);
    setTitle('');
    setContent('');
    setOnConfirm(null);
    setOnCancel(null);
    setConfirmText('');
    setCancelText('');
    setShowConfirmButton(true);
    setShowCancelButton(false);
  };

  return (
    <SwalContext.Provider value={{ fire, close }}>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        content={content}
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmText={confirmText}
        cancelText={cancelText}
        //showConfirmButton={showConfirmButton}
        showCancelButton={showCancelButton}
      />
    </SwalContext.Provider>
  );
};

export const useSwal = () => {
  return useContext(SwalContext);
};
