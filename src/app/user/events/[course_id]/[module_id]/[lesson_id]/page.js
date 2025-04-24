'use client';

import { services } from '@/services';
import { Button, Screen } from '@/ui';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [lesson, setLesson] = useState();

  // Definimos la función 'get' dentro de useEffect
  const get = useCallback(async () => {
    const response = await services.lessons.show({ id: params.lesson_id });

    if (response?.data) {
      setLesson(response?.data);
      // Llamamos a 'wait' pasando los segundos después de cargar la lección
      wait(response?.data?.duration_seconds);
    }
  }, [params.module_id]);

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

  return (
    <Screen className="screen relative">
      <Button
        onPress={() => {
          const newPathname = pathname.split('/').slice(0, -1).join('/');
          router.push(newPathname);
        }}
        size="sm"
        color="default"
        isIconOnly
        className="absolute top-4 right-9 rounded-full bg-foreground-50"
      >
        X
      </Button>

      {lesson && <iframe src={lesson?.file} className="h-full w-full" />}
    </Screen>
  );
}
