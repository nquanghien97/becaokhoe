'use client';

import { MenuHeader } from '@/config/MenuHeader'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

function Header() {
  const pathname = usePathname();
  return (
    <>
      <div className="border-b py-2">
        <div className="max-w-7xl m-auto flex items-center justify-between">
          <div className="flex-1 w-full flex justify-center">
            <Link href="/">
              <Image src="/logo-be-cao-khoe.png" alt="logo" width={60} height={60} />
            </Link>
          </div>
          <div>
            <input placeholder="Tìm kiếm" className="outline-0 border p-2" />
          </div>
        </div>
      </div>
      <div className="flex shadow-md sticky top-0 bg-white">
        <div className="max-w-7xl m-auto">
          <ul className="flex w-full">
            {MenuHeader.map(menu => (
              <li key={menu.id} className={`font-bold ${pathname === menu.path ? 'text-[white] bg-slate-900' : ''}`}>
                <Link className="inline-flex p-2" href={menu.path}>{menu.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header