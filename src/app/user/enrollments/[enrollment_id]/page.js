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

    const enrollment = await services.enrollments.show({ id: params.enrollment_id });
    if (enrollment?.data) {
      const course = await services.courses.show({ id: enrollment?.data?.course?.id });

      if (course?.data) {
        const modules = await services.modules.index({ params: { course_id: course.data.id } });
        if (modules?.data) setModules(modules.data);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <Screen>
      <Grid title="Módulos" isLoading={isLoading} onSearch={get} onCreate={() => drawers.create_course({ onSubmit: get })}>
        {modules.map((module, index) => {
          //const lessons = module.lessons.length;
          //const progress = module.lessons?.reduce((count, lesson) => count + (lesson.progress ? 1 : 0), 0) ?? 0;
          //
          //
          let isLocked = false;
          //
          //if (index > 0) {
          //  const prev = modules[index - 1];
          //  const prevLessons = prev.lessons?.length ?? 0;
          //  const prevProgress = prev.lessons?.reduce((c, l) => c + (l.progress ? 1 : 0), 0) ?? 0;
          //  isLocked = prevLessons > 0 && (prevProgress * 100) / prevLessons < 100;
          //}

          return (
            <Item
              key={index}
              src={module?.image}
              title={module?.name}
              description={module?.description}
              //progress={(progress * 100) / lessons}
              isLocked={isLocked}
              onPress={() => router.push(`${pathname}/${module.id}`)}
            />
          );
        })}
      </Grid>
    </Screen>
  );
}
