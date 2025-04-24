import { Create } from '@/icons';
import { Button, Card, Search, Spinner } from '@/ui';
import React from 'react';

export const Grid = ({ children, title = '', navigate, onSearch, onCreate, isLoading = false }) => {
  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-row justify-between items-center p-4">
        <div>
          <h3 className="text-4xl font-bold">{title}</h3>
          {navigate}
        </div>

        <div className="flex items-center gap-2">
          <Search onSubmit={(search) => onSearch({ search })} />
          {onCreate && <Button onPress={onCreate} startContent={<Create />} isIconOnly />}
        </div>
      </Card>

      {!isLoading && children.length > 0 && <main className={`w-full grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-4`}>{children}</main>}

      {!isLoading && children.length <= 0 && (
        <main>
          <p className="text-2xl font-bold text-center">No se encontraron resultados :(</p>
        </main>
      )}

      {isLoading && (
        <main className="flex justify-center items-center">
          <Spinner size="lg" label="Buscando recursos" />
        </main>
      )}
    </div>
  );
};
