'use client';

import { useDrawers } from '@/hooks';
import { Folder } from '@/icons';
import { services } from '@/services';
import { Button, Screen, Table, User } from '@/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const drawers = useDrawers();
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [isLoading, setIsLoading] = useState(false);

  const get = useCallback(async ({ search = '', page = 1 } = {}) => {
    setIsLoading(true);
    const response = await services.events.index({ params: { limit: 10, search, page } });

    if (response?.data) setEvents(response?.data);
    if (response?.meta?.pagination) setPagination(response?.meta?.pagination);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    get();
  }, [get]);

  return (
    <Screen>
      <Table
        title="Eventos"
        headers={['Evento', 'Curso', 'Entrenador', 'Inicio', 'Fin', 'Acciones']}
        page={pagination?.page}
        pages={pagination?.pages}
        isLoading={isLoading}
        onSearch={(search) => get({ search })}
        onChange={(page) => get({ page })}
        onCreate={() => drawers.create_event({ onSubmit: get })}
      >
        {events.map((event, index) => {
          return [
            <div key={'name'}>{event?.name}</div>,

            <div key={'course'}>{event?.course?.name}</div>,

            <div key={'start'}>{event?.start_date}</div>,

            <div key={'end'}>{event?.end_date}</div>,

            <User key={'trainer'} src={event?.trainer?.avatar} name={event?.trainer?.name} />,

            <div key={'action'}>
              <Button onPress={() => router.push(`${pathname}/${event.id}`)} startContent={<Folder />} isIconOnly />
            </div>,
          ];
        })}
      </Table>
    </Screen>
  );
}
