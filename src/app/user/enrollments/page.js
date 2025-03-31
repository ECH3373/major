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
      const response = await services.enrollments.index({ limit: 100, search, filters: [['employee_id', [me?.data?.employee?.id]]] });
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
          const modules = enrollment.course.modules.length;
          const lessons = enrollment.course.modules.reduce((acc, mod) => acc + (mod.lessons ? mod.lessons.length : 0), 0);
          const minutes = enrollment.course.modules.reduce((acc, mod) => acc + (mod.lessons?.reduce((sum, lesson) => sum + (lesson.duration_seconds ?? 0), 0) ?? 0), 0) / 60;
          const resources = enrollment.course.modules.reduce((acc, mod) => acc + (mod.lessons?.reduce((sum, lesson) => sum + (lesson.resources?.length ?? 0), 0) ?? 0), 0);
          const progress = enrollment.course.modules.reduce((acc, mod) => acc + (mod.lessons?.reduce((count, lesson) => count + (lesson.progress ? 1 : 0), 0) ?? 0), 0);

          const tags = [
            { icon: <Book />, text: `${modules} módulos` },
            { icon: <Book />, text: `${lessons} lecciones` },
            { icon: <Clock />, text: `${minutes} minutes` },
            { icon: <Book />, text: `${resources} recursos` },
          ];

          return (
            <Item
              key={enrollment.id}
              src={enrollment?.course?.image}
              title={enrollment?.course?.name}
              description={enrollment?.course?.description}
              tags={tags}
              progress={(progress * 100) / lessons}
              onPress={() => router.push(`${pathname}/${enrollment.id}`)}
            />
          );
        })}
      </Grid>
    </Screen>
  );
}
