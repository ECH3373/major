'use client';

import { Grid } from '@/components';
import { services } from '@/services';
import { Event, Screen } from '@/ui';
import { useEffect, useState } from 'react';

export default function Page() {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const me = await services.auth.me();

    if (me?.data?.employee?.id) {
      const response = await services.events.index();
      const data = response.data;

      for (const event of data) {
        const enrollments = await services.enrollments.index({
          params: { event_id: event.id },
        });

        const trainer = await services.employees.show({ id: event.trainer_id })
        event.enrollments = enrollments.data;
        event.trainer = trainer.data
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
          <Event key={event.id} data={event} />
        ))}
      </Grid>
    </Screen>
  );
}
