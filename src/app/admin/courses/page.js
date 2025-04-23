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
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Usamos useCallback para memorizar la función 'get'
  const get = useCallback(
    async ({ search = '' } = {}) => {
      setIsLoading(true);
      const response = await services.courses.index({
        params: { limit: 100, search, sort: [{ name: 'asc' }] },
      });
      if (response?.data) setCourses(response?.data);
      setIsLoading(false);
    },
    [], // Dependencias vacías ya que no depende de nada más en este caso
  );

  useEffect(() => {
    get(); // Llamamos a 'get' cuando el componente se monta
  }, [get]); // Dependemos de 'get' para que se ejecute si cambia

  return (
    <Screen>
      <Grid title="Cursos" isLoading={isLoading} onSearch={get} onCreate={() => drawers.create_course({ onSubmit: get })}>
        {courses.map((course) => (
          <Item
            key={course.id} // Asegúrate de que 'course.id' sea único
            src={course.image}
            title={course.name}
            description={course.description}
            onPress={() => drawers.edit_course({ id: course.id, onSubmit: get })}
          />
        ))}
      </Grid>
    </Screen>
  );
}
