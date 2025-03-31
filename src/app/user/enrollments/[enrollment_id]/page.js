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
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const get = async () => {
    setIsLoading(true);

    const response = await services.enrollments.show({ id: params.enrollment_id });
    if (response?.data) setModules(response?.data?.course?.modules);
    setIsLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <Screen>
      <Grid title="Módulos" isLoading={isLoading} onSearch={get} onCreate={() => drawers.create_course({ onSubmit: get })}>
        {modules.map((module, index) => {
          const lessons = module.lessons.length;
          const minutes = module.lessons?.reduce((sum, lesson) => sum + (lesson.duration_seconds ?? 0), 0) / 60;
          const resources = module.lessons?.reduce((sum, lesson) => sum + (lesson.resources?.length ?? 0), 0) || 0;
          const progress = module.lessons?.reduce((count, lesson) => count + (lesson.progress ? 1 : 0), 0) ?? 0;

          const tags = [
            { icon: <Book />, text: `${lessons} lecciones` },
            { icon: <Clock />, text: `${minutes} minutes` },
            { icon: <Book />, text: `${resources} recursos` },
          ];

          let isLocked = false;

          if (index > 0) {
            const prev = modules[index - 1];
            const prevLessons = prev.lessons?.length ?? 0;
            const prevProgress = prev.lessons?.reduce((c, l) => c + (l.progress ? 1 : 0), 0) ?? 0;
            isLocked = prevLessons > 0 && (prevProgress * 100) / prevLessons < 100;
          }

          return (
            <Item
              key={module.id}
              src={module?.image}
              title={module?.name}
              description={module?.description}
              tags={tags}
              progress={(progress * 100) / lessons}
              isLocked={isLocked}
              onPress={() => router.push(`${pathname}/${module.id}`)}
            />
          );
        })}
      </Grid>
    </Screen>
  );
}
