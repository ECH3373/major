'use client';

import { Grid, Item } from '@/components';
import { useDrawers } from '@/hooks';
import { Book, Clock } from '@/icons';
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

    const response = await services.enrollments.show({ id: params.enrollment_id });
    if (response?.data) {
      const module = response?.data?.course?.modules.find((mod) => mod.id == params.module_id);
      setLessons(module.lessons);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <Screen>
      <Grid title="Lecciones" isLoading={isLoading} onSearch={get} onCreate={() => drawers.create_course({ onSubmit: get })}>
        {lessons.map((lesson, index) => {
          const minutes = lesson.duration_seconds / 60;
          const resources = lesson.resources.length;

          const tags = [
            { icon: <Clock />, text: `${minutes} minutos` },
            { icon: <Book />, text: `${resources} recursos` },
          ];

          let isLocked = false;
          if (index > 0 && !lessons[index - 1].progress) isLocked = true;

          return (
            <Item
              key={lesson.id}
              src={lesson?.image}
              title={lesson?.name}
              description={lesson?.description}
              tags={tags}
              isLocked={isLocked}
              progress={lesson.progress ? 100 : 0}
              onPress={() => router.push(`${pathname}/${lesson.id}`)}
            />
          );
        })}
      </Grid>
    </Screen>
  );
}
