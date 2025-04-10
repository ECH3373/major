'use client';

import { Grid, Item } from '@/components';
import { useDrawers } from '@/hooks';
import { services } from '@/services';
import { Screen } from '@/ui';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const drawers = useDrawers();
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const get = async () => {
    setIsLoading(true);

    const lessons = await services.lessons.index({ params: { module_id: params.module_id, sort: [{ order: 'asc' }] } });
    if (lessons?.data) setLessons(lessons?.data);

    setIsLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <Screen>
      <Grid title="Lecciones" isLoading={isLoading} onSearch={get} onCreate={() => drawers.create_course({ onSubmit: get })}>
        {lessons.map((lesson, index) => {
          let isLocked = false;

          return <Item key={index} src={lesson?.image} title={lesson?.name} description={lesson?.description} isLocked={isLocked} onPress={() => router.push(`${pathname}/${lesson.id}`)} />;
        })}
      </Grid>
    </Screen>
  );
}
