'use client';

import { useDrawers } from '@/hooks';
import { services } from '@/services';
import { Screen, Table, User } from '@/ui';
import { useEffect, useState } from 'react';

export default function Page() {
  const drawers = useDrawers();
  const [enrollments, setEnrollments] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [isLoading, setIsLoading] = useState(false);

  const get = async ({ search = '', page = 1 } = {}) => {
    setIsLoading(true);
    const response = await services.enrollments.index({ limit: 10, search, page });
    if (response?.data) setEnrollments(response?.data);
    if (response?.meta?.pagination) setPagination(response?.meta?.pagination);
    setIsLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <Screen>
      <Table
        title="Inscripciones"
        headers={['Empleado', 'Curso']}
        page={pagination?.page}
        pages={pagination?.pages}
        isLoading={isLoading}
        onSearch={(search) => get({ search })}
        onChange={(page) => get({ page })}
        onCreate={() => drawers.create_enrollment({ onSubmit: get })}
      >
        {enrollments.map((enrollment) => {
          return [
            <User src={enrollment?.employee?.avatar} name={enrollment?.employee?.name} description={enrollment?.employee?.id} />,
            <User src={enrollment?.course?.image} name={enrollment?.course?.name} />,
          ];
        })}
      </Table>
    </Screen>
  );
}
