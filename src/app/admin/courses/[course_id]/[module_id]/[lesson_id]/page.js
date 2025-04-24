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
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Usamos useCallback para memorizar la función 'get'
  const get = useCallback(
    async ({ search = '' } = {}) => {
      setIsLoading(true);
      const response = await services.resources.index({ params: { limit: 100, search, lesson_id: params.lesson_id } });
      if (response?.data) setResources(response?.data);
      setIsLoading(false);
    },
    [params.lesson_id], // Dependemos de params.lesson_id para que se ejecute correctamente cuando cambie
  );

  useEffect(() => {
    get();
  }, [get]);

  return (
    <Screen>
      <Grid
        navigate={
          <Breadcrumb>
            {[
              {
                name: 'Cursos',
                press: () => {
                  const newPathname = pathname.split('/').slice(0, -3).join('/');
                  router.push(newPathname);
                },
              },
              {
                name: 'Módulos',

                press: () => {
                  const newPathname = pathname.split('/').slice(0, -2).join('/');
                  router.push(newPathname);
                },
              },
              {
                name: 'Lecciones',

                press: () => {
                  const newPathname = pathname.split('/').slice(0, -1).join('/');
                  router.push(newPathname);
                },
              },

              { name: 'Recursos', is_active: true },
            ]}
          </Breadcrumb>
        }
        isLoading={isLoading}
        onSearch={get}
        onCreate={() => drawers.create_resource({ lesson_id: params.lesson_id, onSubmit: get })}
      >
        {resources.map((resource) => {
          return (
            <Item
              key={resource.id} // Usamos 'resource.id' como clave única
              src={resource.image}
              title={resource.name}
              description={resource.description}
              onPress={() => drawers.edit_resource({ id: resource.id, onSubmit: get })}
            />
          );
        })}
      </Grid>
    </Screen>
  );
}
