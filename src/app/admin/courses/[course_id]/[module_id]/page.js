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
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Usamos useCallback para memorizar la función 'get'
  const get = useCallback(
    async ({ search = '' } = {}) => {
      setIsLoading(true);
      const response = await services.lessons.index({ params: { limit: 100, search, sort: [{ order: 'asc' }], module_id: params.module_id } });
      if (response?.data) setLessons(response?.data);
      setIsLoading(false);
    },
    [params.module_id], // Dependemos de params.module_id para que se ejecute correctamente cuando cambie
  );

  useEffect(() => {
    get();
  }, [get]); // Ejecutamos 'get' solo cuando cambie

  return (
    <Screen>
      <Grid
        navigate={
          <Breadcrumb>
            {[
              {
                name: 'Cursos',
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
        onCreate={() => drawers.create_lesson({ module_id: params.module_id, onSubmit: get })}
      >
        {lessons.map((lesson) => {
          return (
            <Item
              key={lesson.id} // Usamos 'lesson.id' como clave única
              src={lesson.image}
              title={lesson.name}
              description={lesson.description}
              onPress={() => drawers.edit_lesson({ id: lesson.id, onSubmit: get })}
            />
          );
        })}
      </Grid>
    </Screen>
  );
}
