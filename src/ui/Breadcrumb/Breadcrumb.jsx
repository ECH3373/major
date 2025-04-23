import { BreadcrumbItem, Breadcrumbs } from '@heroui/react';
import React from 'react';

export const Breadcrumb = ({ children }) => {
  return (
    <Breadcrumbs>
      {children.map((item) => (
        <BreadcrumbItem key={item.name} isCurrent={item?.is_active} onPress={item.press}>
          {item.name}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};
