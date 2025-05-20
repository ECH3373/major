'use client';

import { Grid, Item } from '@/components';
import { services } from '@/services';
import { Event, Screen } from '@/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const me = await services.auth.me();

    if (me?.data?.employee?.id) {
      const response = await services.events.index({ params: { trainer_id: me?.data?.employee?.id } });
      const data = response.data;

      for (const event of data) {
        const enrollments = await services.enrollments.index({
          params: { event_id: event.id },
        });

        event.enrollments = enrollments.data;
      }

      setEvents(data);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Screen>
      <Grid title="Eventos en curso">
        {events.map((event) => (
          <Item key={event.id} title={event.name} src={event?.image} onPress={() => router.push(`${pathname}/${event.id}`)} />
        ))}
      </Grid>
    </Screen>
  );
}
