import { Card, DrawerContent, Drawer as DrawerHUI } from '@heroui/react';
import React from 'react';

export const Drawer = ({ children, isOpen = false, onClose, header, footer }) => {
  return (
    <DrawerHUI isOpen={isOpen} onClose={onClose} placement="left" className="bg-transparent">
      <DrawerContent className="flex justify-center items-center">
        <Card isBlurred className="flex justify-center items-center h-full w-full p-2">
          <header>{header}</header>

          <main className="flex justify-center items-center flex-1 w-full">{children}</main>

          <footer className="flex justify-end gap-2 w-full">{footer}</footer>
        </Card>
      </DrawerContent>
    </DrawerHUI>
  );
};
