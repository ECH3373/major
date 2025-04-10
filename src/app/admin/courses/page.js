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
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const get = async ({ search = '' } = {}) => {
    setIsLoading(true);
    const response = await services.courses.index({ params: { limit: 100, search, sort: [{ name: 'asc' }] } });
    if (response?.data) setCourses(response?.data);
    setIsLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <Screen>
      <Grid title="Cursos" isLoading={isLoading} onSearch={get} onCreate={() => drawers.create_course({ onSubmit: get })}>
        {courses.map((course) => {
          return <Item key={course.id} src={course.image} title={course.name} description={course.description} onPress={() => drawers.edit_course({ id: course.id, onSubmit: get })} />;
        })}
      </Grid>
    </Screen>
  );
}
