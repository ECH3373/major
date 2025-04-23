'use client';

import { useDrawers } from '@/hooks';
import { services } from '@/services';
import { Screen, Table, User } from '@/ui';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Page() {
  const params = useParams();

  const drawers = useDrawers();
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const get = useCallback(async () => {
    setIsLoading(true);
    const response = await services.enrollments.index({ params: { event_id: params.id } });
    if (response?.data) setEnrollments(response?.data);
    if (response?.meta?.pagination) setPagination(response?.meta?.pagination);
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    get();
  }, [get]);

  return (
    <Screen>
      <Table
        title="Inscripciones"
        headers={['Usuario']}
        page={pagination?.page}
        pages={pagination?.pages}
        isLoading={isLoading}
        onSearch={(search) => get({ search })}
        onChange={(page) => get({ page })}
        onCreate={() => drawers.create_enrollment({ event_id: params.id, onSubmit: get })}
      >
        {enrollments.map((enrollment, index) => {
          return [<User key={index} src={enrollment?.employee?.avatar} name={enrollment?.employee?.name} description={enrollment?.employee?.department?.name} />];
        })}
      </Table>
    </Screen>
  );
}
