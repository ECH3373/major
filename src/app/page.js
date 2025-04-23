'use client';

import { config } from '@/config';
import { services } from '@/services';
import { Screen, Spinner } from '@/ui';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function Page() {
  const router = useRouter();

  const me = useCallback(async () => {
    const response = await services.auth.me();

    if (response?.data?.role?.id == config.role.admin) router.push('/admin');
    else if (response?.data?.role.id == config.role.trainer) router.push('/trainer');
    else if (response?.data?.role.id == config.role.user) router.push('/user');
    else router.push('/login');
  }, [router]);

  useEffect(() => {
    me();
  }, [me]);

  return (
    <Screen className="flex justify-center items-center h-full">
      <Spinner label="Validando..." size="lg" />
    </Screen>
  );
}
