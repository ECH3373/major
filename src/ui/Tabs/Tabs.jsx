import { Tab, Tabs as TabsHUI } from '@heroui/react';
import React from 'react';

export const Tabs = ({ children = [], headers = [], value, onChange }) => {
  return (
    <TabsHUI className="w-full flex justify-center items-center" selectedKey={value} onSelectionChange={onChange} color="primary">
      {children.map((child, index) => (
        <Tab key={headers[index]} title={headers[index]}>
          {child}
        </Tab>
      ))}
    </TabsHUI>
  );
};
