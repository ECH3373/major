'use client';

import { Dropdown as DropdownHUI, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import React from 'react';

export const Dropdown = ({ children, trigger }) => {
  return (
    <DropdownHUI placement="bottom-end">
      <DropdownTrigger>
        <div as="button" className="cursor-pointer">
          {trigger}
        </div>
      </DropdownTrigger>

      <DropdownMenu aria-label="Dynamic Actions" variant="flat">
        {children.map((item, index) => (
          <DropdownItem key={index} textValue={`${index}`}>
            {item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownHUI>
  );
};
