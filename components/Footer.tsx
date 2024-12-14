import { CategoryEntity } from '@/entities/category.entity'
import { NewsEntity } from '@/entities/news.entity'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Footer({ news_data, category_data }: { news_data: NewsEntity[], category_data: CategoryEntity[] }) {
  return (
    <footer>
      <div className="py-8 bg-[#777777] text-[#f1f1f1]">
        <div className="max-w-7xl m-auto flex">
          <div className="w-1/4 px-4">
            <Image src="/logo-be-cao-khoe.png" alt="logo" width={100} height={100} className="mb-4 m-auto" />
            <h4 className="mb-4">Quy định sử dụng</h4>
            <p className="text-justify">Những thông tin được đăng tải tại becaokhoe.com chỉ mang tính chất tham khảo. Việc chữa bệnh và dùng thuốc phải tuân theo sự hướng dẫn của bác sĩ.</p>
          </div>
          <div className="w-1/4 px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Bài viết mới nhất</h2>
              <ul>
                {news_data.map(item => (
                  <li key={item.id} className="py-2 border-b border-[#ececec80]">
                    <a href={`/tin-tuc/${item.slug}`}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-1/4 px-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Danh mục</h2>
              <ul>
                {category_data.map(item => (
                  <li key={item.id} className={`py-2 border-[#ececec80] border-b`}>
                    <Link href={`/${item.slug}`}>{item.name} ({item.count})</Link>
                  </li>
                ))}
              </ul>
            </div></div>
          <div className="w-1/4 px-4">
            <input placeholder="Tìm kiếm" className="outline-0 border p-2" />
          </div>
        </div>
      </div>
      <div className="bg-[#f34764]">
        <p className="text-center py-4">Copyright © 2014 becaokhoe.com</p>
      </div>
    </footer>
  )
}

export default Footer