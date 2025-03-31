'use client';

import { Grid, Item } from '@/components';
import { useDrawers } from '@/hooks';
import { Book, Clock } from '@/icons';
import { services } from '@/services';
import { Screen } from '@/ui';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const params = useParams();
  const drawers = useDrawers();
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const get = async ({ search = '' } = {}) => {
    setIsLoading(true);
    const response = await services.modules.index({ params: { limit: 100, search, sort: 'order', course_id: params.course_id } });
    if (response?.data) setModules(response?.data);
    setIsLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <Screen>
      <Grid title="Módulos" isLoading={isLoading} onSearch={get} onCreate={() => drawers.create_module({ course_id: params.course_id, onSubmit: get })}>
        {modules.map((module) => {
          return <Item key={module._id} src={module.image} title={module.name} description={module.description} onPress={() => drawers.edit_module({ id: module._id, onSubmit: get })} />;
        })}
      </Grid>
    </Screen>
  );
}
