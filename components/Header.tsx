'use client';

import { MenuHeader } from '@/config/MenuHeader'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import AppSidebar from './Sidebar';
import MenuDropdown from './common/MenuDropdown';
import MenuIcon from '@/assets/icons/MenuIcon';

function Header() {
  const pathname = usePathname();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <>
      <div className="border-b py-2 relative">
        <div className="max-w-6xl m-auto flex items-center justify-between">
          <div className="flex-1 w-full flex justify-center">
            <Link href="/">
              <Image src="/logo-be-cao-khoe.png" alt="logo" width={60} height={60} />
            </Link>
          </div>
          <div className="max-lg:hidden">
            <input placeholder="Tìm kiếm" className="outline-0 border p-2" />
          </div>
          <div
            className="lg:hidden absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-[#ebeaea] rounded-full cursor-pointer"
            onClick={() => setIsOpenSidebar(true)}
          >
            <MenuIcon fill='black' width={24} height={24} />
          </div>
        </div>
      </div>
      <div className="flex shadow-md sticky top-0 bg-white max-lg:hidden">
        <div className="max-w-6xl m-auto">
          <ul className="flex w-full">
            {MenuHeader.map(menu => (
              <li key={menu.id} className={`font-bold ${pathname === menu.path ? 'text-[white] bg-slate-900' : ''}`}>
                <Link className="inline-flex p-2" href={menu.path}>{menu.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AppSidebar
        open={isOpenSidebar}
        setOpen={setIsOpenSidebar}
        start="-24rem"
        end="0"
        exit="-24rem"
      >
        <div className="py-7">
          <Link href="/">
            <Image src="/logo-be-cao-khoe.png" alt="logo" width={60} height={60} className="m-auto" />
          </Link>
          <ul className="flex max-lg:flex-col text-black mb-4">
            {MenuHeader.map(item => (
              <li key={item.path} className="px-3 lg:py-1 py-4 max-lg:border-b-2" onClick={() => setIsOpenSidebar(false)}>
                {item.children ? (
                  <MenuDropdown
                    title={item.title}
                    path={item.path}
                  >
                    <ul className="bg-[#0f0f10] flex flex-col min-w-[15rem] border border-[#ffffff12] rounded-md lg:py-2">
                      {item.children.map(childItem => (
                        <li key={childItem.path} className={childItem.path === pathname ? 'text-[#643D14]' : ''}>
                          <Link className={`cursor-pointer hover:text-[#f18017] px-4 py-2 w-full flex items-center`} href={childItem.path}>
                            {childItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </MenuDropdown>
                ) : (
                  <Link href={item.path} className={`hover:text-[#f18017] duration-300 ${pathname === item.path ? 'text-[#f18017]' : ''}`}>
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </AppSidebar>
    </>
  )
}

export default Header