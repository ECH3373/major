'use client';

import { services } from '@/services';
import { Screen } from '@/ui';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const params = useParams();
  const [lesson, setLesson] = useState();

  const get = async () => {
    const response = await services.enrollments.show({ id: params.enrollment_id });
    if (response?.data) {
      const module = response?.data?.course?.modules.find((mod) => mod.id == params.module_id);
      const lesson = module.lessons.find((les) => les.id == params.lesson_id);
      setLesson(lesson);
      wait((lesson.duration_seconds * 80) / 100);
    }
  };

  const wait = (seconds) => {
    setTimeout(async () => {
      const me = await services.auth.me();
      if (me?.data?.employee?.id) await services.progress.store({ employee_id: me?.data?.employee?.id, lesson_id: params.lesson_id });
    }, seconds * 1000);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <Screen className="screen">
      <iframe src={lesson?.file} className="h-full w-full" />
    </Screen>
  );
}
