import { Pagination, TableBody, TableCell, TableColumn, TableHeader, TableRow, Table as TableUI } from '@heroui/react';
import React from 'react';
import { Button, Search } from '..';
import { Create } from '@/icons';

export const Table = ({ className = '', headers = [], children, pages = 1, page = 1, onChange, title = '', onSearch, onCreate }) => {
  const top = (
    <div className="flex justify-between">
      <div className="flex justify-center items-center">
        <h1 className="text-center font-bold text-2xl">{title}</h1>
      </div>

      <div className="flex gap-2">
        {onSearch && <Search onSubmit={onSearch} />}
        {onCreate && <Button startContent={<Create />} isIconOnly onPress={onCreate} />}
      </div>
    </div>
  );

  const bottom = (
    <div className="flex justify-center items-center">
      <Pagination isCompact showControls={true} showShadow={true} total={pages} page={page} onChange={(page) => onChange(page)} />
    </div>
  );

  return (
    <TableUI className={className} topContent={top} bottomContent={pages ? bottom : null}>
      <TableHeader>
        {headers.map((header, index) => (
          <TableColumn className="font-bold text-xl" key={index}>
            {header}
          </TableColumn>
        ))}
      </TableHeader>

      <TableBody>
        {children &&
          children.map((row, index) => (
            <TableRow key={index}>
              {row.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </TableUI>
  );
};
