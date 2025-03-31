'use client';

import { Drawer } from '@/ui';
import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [footer, setFooter] = useState('');

  const fire = ({ content, footer } = {}) => {
    setIsOpen(true);
    setContent(content);
    setFooter(footer);
  };

  const close = () => {
    setIsOpen(false);
    setContent('');
    setFooter('');
  };

  return (
    <DrawerContext.Provider value={{ fire, close }}>
      {children}
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} children={content} footer={footer} />
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  return useContext(DrawerContext);
};
