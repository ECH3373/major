'use client';

import { Button, Card } from '@/ui';
import React, { useState } from 'react';
import { Row } from './children/Row';

export const Form = ({ children, className = '', onSubmit, title = '', subtitle = '', src = '', submitText = '' }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (onSubmit) await onSubmit();
    } catch (error) { }

    setIsLoading(false);
  };

  return (
    <Card className={`flex flex-row w-full container ${className}`}>
      {src && (
        <div className="flex w-[70%]">
          <img src={src} className="h-full w-full object-cover opacity-90 fade-right" />
        </div>
      )}

      <div className="flex flex-1 justify-center items-center p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {(title || subtitle) && (
            <header>
              <h2 className="font-bold text-center text-2xl">{title}</h2>
              <h5 className="text-center text">{subtitle}</h5>
            </header>
          )}

          <main className="flex flex-col gap-2">{children}</main>

          {(onSubmit || submitText) && (
            <footer>
              <Button content={submitText} isLoading={isLoading} type="submit" className="w-full" />
            </footer>
          )}
        </form>
      </div>
    </Card>
  );
};

Form.Row = Row;
