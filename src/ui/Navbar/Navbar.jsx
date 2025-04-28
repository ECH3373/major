import { NavbarBrand, NavbarContent, Navbar as NavbarHUI, NavbarItem } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

export const Navbar = ({ items = [], logo, avatar }) => {
  return (
    <NavbarHUI className='h-[50px]'>
      <NavbarBrand>{logo}</NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {items.map((item, index) => (
          <NavbarItem key={index}>
            <Link href={item.link} color="foreground" className="flex flex-col justify-center items-center">
              <div className="text-2xl">{item.icon}</div>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        {avatar}
      </NavbarContent>
    </NavbarHUI>
  );
};
