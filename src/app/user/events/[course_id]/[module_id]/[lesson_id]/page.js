'use client';

import { services } from '@/services';
import { Screen } from '@/ui';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const params = useParams();
  const [lesson, setLesson] = useState();

  // Definimos la función 'get' dentro de useEffect
  const get = async () => {
    const response = await services.lessons.show({ id: params.module_id });
    if (response?.data) {
      setLesson(response?.data);
      // Llamamos a 'wait' pasando los segundos después de cargar la lección
      wait(response?.data?.duration_seconds);
    }
  };

  const wait = (seconds) => {
    // Usamos un retraso con promesas y async/await para manejar el retraso sin setTimeout
    setTimeout(async () => {
      const me = await services.auth.me();
      if (me?.data?.employee?.id) {
        await services.progress.store({
          employee_id: me?.data?.employee?.id,
          lesson_id: params.lesson_id,
        });
      }
    }, seconds * 1000);
  };

  useEffect(() => {
    get(); // Llamamos a la función 'get' cuando el componente se monta
  }, [get, params.module_id]); // Dependemos de 'params.module_id' para ejecutar 'get' correctamente

  return <Screen className="screen">{lesson && <iframe src={lesson?.file} className="h-full w-full" />}</Screen>;
}
