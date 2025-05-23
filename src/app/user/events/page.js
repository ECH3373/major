'use client';

import { Grid, Item } from '@/components';
import { useDrawers } from '@/hooks';
import { services } from '@/services';
import { Breadcrumb, Screen } from '@/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const drawers = useDrawers();
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const get = useCallback(async ({ search = '' } = {}) => {
    setIsLoading(true);

    const me = await services.auth.me();

    if (me?.data?.employee?.id) {
      const response = await services.enrollments.index({ params: { limit: 100, search, employee_id: me?.data?.employee?.id } });

      if (response?.data) {
        const events = await Promise.all(
          response.data.map(async (event) => {

            try {
              const cour = await services.courses.show({ id: event.event.course_id });
              return {
                ...event,
                course: cour?.data ?? null,
              };
            } catch {
              return { ...event, course: null };
            }
          }),
        );

        setEnrollments(events);
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    get();
  }, [get]);

  return (
    <Screen>
      <Grid navigate={<Breadcrumb>{[{ name: 'Eventos', is_active: true }]}</Breadcrumb>} isLoading={isLoading} onSearch={get}>
        {enrollments.map((enrollment, index) => {
          return (
            <Item
              key={index}
              title={enrollment?.event?.name}
              src={enrollment.course.image}
              description={`${enrollment?.event?.start_date} - ${enrollment?.event?.end_date}`}
              onPress={() => router.push(`${pathname}/${enrollment?.event?.course_id}`)}
            />
          );
        })}
      </Grid>
    </Screen>
  );
}
