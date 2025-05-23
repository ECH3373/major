'use client';

import { config } from '@/config';
import { services } from '@/services';
import { Avatar, Dropdown, Navbar } from '@/ui';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const Navigation = ({ items = [] }) => {
  const router = useRouter();
  const [employee, setEmployee] = useState('');
  const [role, setRole] = useState('');

  const me = async () => {
    const response = await services.auth.me();
    setEmployee(response?.data?.employee);
    setRole(response?.data?.role)
  };

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    router.push('/login');
  };

  useEffect(() => {
    me();
  }, []);

  const logo = (
    <div onClick={() => router.push('/')} className="flex justify-center items-center gap-1 cursor-pointer">
      <img src={config.image.logo} className="h-10" />
      <p className="font-bold text-sm">MAESTRO JOYERO ORFEBRE</p>
    </div>
  );

  const avatar = (
    <Dropdown trigger={<Avatar src={employee?.avatar} isBordered size='sm' />}>
      <div><p className='capitalize'>Hola, {employee?.name?.split(' ').slice(-1)[0]}</p></div>

      {
        role.id == config.role.admin && <div onClick={() => router.push('/admin/settings')}>
          Imagenes de login
        </div>
      }

      <p onClick={logout} className="text-danger">
        Cerrar sesión
      </p>
    </Dropdown>
  );

  return <Navbar items={items} logo={logo} avatar={avatar} />;
};