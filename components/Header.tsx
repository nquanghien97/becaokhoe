import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <header>
      <div className="border-b py-2">
        <div className="max-w-6xl m-auto flex items-center justify-between">
          <div className="flex-1 w-full flex justify-center">
            <Image src="/logo-be-cao-khoe.png" alt="logo" width={60} height={60} />
          </div>
          <div>
            <input placeholder="Tìm kiếm" className="outline-0 border p-2" />
          </div>
        </div>
      </div>
      <div className="flex shadow-md py-4">
        <ul className="flex gap-4 m-auto">
          <li>Menu 1</li>
          <li>Menu 2</li>
          <li>Menu 3</li>
          <li>Menu 4</li>
        </ul>
      </div>
    </header>
  )
}

export default Header