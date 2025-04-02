'use client';

import { Grid, Item } from '@/components';
import { useDrawers } from '@/hooks';
import { Book, Clock } from '@/icons';
import { services } from '@/services';
import { Screen } from '@/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const drawers = useDrawers();
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const get = async ({ search = '' } = {}) => {
    setIsLoading(true);

    const me = await services.auth.me();

    if (me?.data?.employee?.id) {
      const response = await services.enrollments.index({ params: { limit: 100, search, employee_id: me?.data?.employee?.id } });
      if (response?.data) setEnrollments(response?.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <Screen>
      <Grid title="Cursos" isLoading={isLoading} onSearch={get} onCreate={() => drawers.create_course({ onSubmit: get })}>
        {enrollments.map((enrollment) => {
          return (
            <Item
              key={index}
              src={enrollment?.course?.image}
              title={enrollment?.course?.name}
              description={enrollment?.course?.description}
              //progress={(progress * 100) / lessons}
              onPress={() => router.push(`${pathname}/${enrollment.id}`)}
            />
          );
        })}
      </Grid>
    </Screen>
  );
}
