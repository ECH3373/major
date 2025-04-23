'use client';

import { Grid, Item } from '@/components';
import { useDrawers } from '@/hooks';
import { services } from '@/services';
import { Screen } from '@/ui';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Page() {
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
  }, [get]);

  return (
    <Screen>
      <Grid title="Lecciones" isLoading={isLoading} onSearch={get} onCreate={() => drawers.create_lesson({ module_id: params.module_id, onSubmit: get })}>
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
