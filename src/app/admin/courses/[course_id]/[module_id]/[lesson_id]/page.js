'use client';

import { Grid, Item } from '@/components';
import { useDrawers } from '@/hooks';
import { services } from '@/services';
import { Screen } from '@/ui';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const params = useParams();
  const drawers = useDrawers();
  const [resources, serResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const get = async ({ search = '' } = {}) => {
    setIsLoading(true);
    const response = await services.resources.index({ params: { limit: 100, search, lesson_id: params.lesson_id } });

    console.log(response);

    if (response?.data) serResources(response?.data);
    setIsLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <Screen>
      <Grid title="Recursos" isLoading={isLoading} onSearch={get} onCreate={() => drawers.create_resource({ lesson_id: params.lesson_id, onSubmit: get })}>
        {resources.map((resource) => (
          <Item
            key={resource._id}
            src={resource.image}
            title={`${resource.name} (${resource.quantity})`}
            description={resource.description}
            onPress={() => drawers.edit_resource({ id: resource._id, onSubmit: get })}
          />
        ))}
      </Grid>
    </Screen>
  );
}
