'use client'

import { NavbarContent, Navbar as NavbarHUI, } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Divider } from '..';

export const Navbar = ({ items = [], logo, avatar }) => {
  const pathname = usePathname()

  return (
    <div className='flex h-[50px] bg-foreground-50/80 px-2'>
      <div className='flex justify-center items-center'>{logo}</div>

      <div className="hidden sm:flex gap-4 after:h-[50px] flex-1 justify-center items-center py-4" justify="center">
        <Divider orientation='vertical' />


        {items.map((item, index) => (
          <>
            <span key={index}>
              <Link href={item.link} color="foreground" className="flex flex-col justify-center items-center">
                <div className={`flex justify-center items-center ${pathname == item.link && 'border-b-[2px] border-b-success'}`}>{item.name}</div>
              </Link>
            </span>

            <Divider orientation='vertical' />
          </>
        ))}
      </div>

      <NavbarHUI className='w-[80px] h-[50px] bg-transparent'>
        <NavbarContent as="div" className="items-center" justify="end">
          {avatar}
        </NavbarContent>
      </NavbarHUI>
    </div>
  );
};
