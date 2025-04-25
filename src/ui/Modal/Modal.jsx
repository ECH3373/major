import React from 'react';
import { Modal as ModalHUI, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/react';
import { Card, Button } from '..';

export const Modal = ({
  isOpen = false,
  onClose,
  title = '',
  content = '',
  showConfirmButton = true,
  onConfirm,
  confirmText = 'Aceptar',
  showCancelButton = false,
  onCancel,
  cancelText = 'Cancelar',
}) => {
  const handleConfirm = async () => {
    if (onConfirm) await onConfirm();
    if (onClose) onClose();
  };

  const handleCancel = async () => {
    if (onCancel) await onCancel();
    if (onClose) onClose();
  };

  return (
    <ModalHUI isOpen={isOpen}>
      <ModalContent className="bg-transparent">
        <Card>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{content}</ModalBody>
          <ModalFooter>
            {showConfirmButton && <Button onPress={handleConfirm} content={confirmText}></Button>}
            {showCancelButton && <Button onPress={handleCancel} content={cancelText} color="danger" />}
          </ModalFooter>
        </Card>
      </ModalContent>
    </ModalHUI>
  );
};
