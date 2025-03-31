import { Autocomplete as AutocompleteHUI, AutocompleteItem } from '@heroui/react';
import React from 'react';

export const Autocomplete = ({ children = [], onSearch, onChange, ...props }) => {
  return (
    <AutocompleteHUI onInputChange={onSearch} onSelectionChange={onChange} {...props}>
      {children.map((option) => (
        <AutocompleteItem key={option.value}>{option.name}</AutocompleteItem>
      ))}
    </AutocompleteHUI>
  );
};
