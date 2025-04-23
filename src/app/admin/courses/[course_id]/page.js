'use client';

import { Grid, Item } from '@/components';
import { useDrawers } from '@/hooks';
import { Book, Clock } from '@/icons';
import { services } from '@/services';
import { Breadcrumb, Screen } from '@/ui';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const drawers = useDrawers();
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const get = useCallback(
    async ({ search = '' } = {}) => {
      setIsLoading(true);
      const response = await services.modules.index({ params: { limit: 100, search, sort: [{ order: 'asc' }], course_id: params.course_id } });
      if (response?.data) setModules(response?.data);
      setIsLoading(false);
    },
    [params.course_id],
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
                  const newPathname = pathname.split('/').slice(0, -1).join('/');
                  router.push(newPathname);
                },
              },
              { name: 'Módulos', is_active: true },
            ]}
          </Breadcrumb>
        }
        isLoading={isLoading}
        onSearch={get}
        onCreate={() => drawers.create_module({ course_id: params.course_id, onSubmit: get })}
      >
        {modules.map((module) => {
          return <Item key={module.id} src={module.image} title={module.name} description={module.description} onPress={() => drawers.edit_module({ id: module.id, onSubmit: get })} />;
        })}
      </Grid>
    </Screen>
  );
}
