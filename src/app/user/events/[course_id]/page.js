'use client';

import { Grid, Item } from '@/components';
import { useDrawers } from '@/hooks';
import { services } from '@/services';
import { Screen } from '@/ui';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const drawers = useDrawers();
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const get = useCallback(async () => {
    setIsLoading(true);
    const course = await services.courses.show({ id: params.course_id });

    if (course?.data) {
      const modules = await services.modules.index({ params: { course_id: course.data.id, sort: [{ order: 'asc' }] } });
      if (modules?.data) setModules(modules.data);
    }

    setIsLoading(false);
  }, [params.course_id]);

  useEffect(() => {
    get();
  }, [get]);

  return (
    <Screen>
      <Grid title="Módulos" isLoading={isLoading} onSearch={get} onCreate={() => drawers.create_course({ onSubmit: get })}>
        {modules.map((module, index) => {
          let isLocked = false;
          return <Item key={index} src={module?.image} title={module?.name} description={module?.description} isLocked={isLocked} onPress={() => router.push(`${pathname}/${module.id}`)} />;
        })}
      </Grid>
    </Screen>
  );
}
