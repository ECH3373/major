'use client';

import { Grid, Item } from '@/components';
import { useDrawers } from '@/hooks';
import { services } from '@/services';
import { Breadcrumb, Screen } from '@/ui';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const drawers = useDrawers();
  const [module, setModule] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const get = useCallback(async () => {
    setIsLoading(true);
    const md = await services.modules.show({ id: params.module_id });
    const lessons = await services.lessons.index({ params: { module_id: params.module_id, sort: [{ order: 'asc' }] } });
    if (lessons?.data) setLessons(lessons?.data);
    if (md?.data) setModule(md?.data);
    setIsLoading(false);
  }, [params.module_id]);

  useEffect(() => {
    get();
  }, [get]);

  return (
    <Screen
      className="screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${module?.background})`,
      }}
    >
      <Grid
        navigate={
          <Breadcrumb>
            {[
              {
                name: 'Eventos',
                press: () => {
                  const newPathname = pathname.split('/').slice(0, -2).join('/');
                  router.push(newPathname);
                },
              },
              {
                name: 'Módulos',

                press: () => {
                  const newPathname = pathname.split('/').slice(0, -1).join('/');
                  router.push(newPathname);
                },
              },
              { name: 'Lecciones', is_active: true },
            ]}
          </Breadcrumb>
        }
        isLoading={isLoading}
        onSearch={get}
        onCreate={() => drawers.create_course({ onSubmit: get })}
      >
        {lessons.map((lesson, index) => {
          let isLocked = false;

          return <Item key={index} src={lesson?.image} title={lesson?.name} description={lesson?.description} isLocked={isLocked} onPress={() => router.push(`${pathname}/${lesson.id}`)} />;
        })}
      </Grid>
    </Screen>
  );
}
