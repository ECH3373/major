'use client'

import { services } from '@/services';
import { Book } from '@/ui';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Layout({ children }) {
  const params = useParams();
  const [course, setCourse] = useState([])

  const get = useCallback(async () => {
    const cour = await services.courses.show({ id: params.course_id });
    if (cour?.data) setCourse(cour?.data);
  }, [params.module_id]);

  useEffect(() => {
    get();
  }, [get]);


  return (
    <>
      {children}
      <Book src={course.book} className='fixed bottom-4 right-4' />
    </>
  )
}
