import { NewsEntity } from '@/entities/news.entity'
import { getNews } from '@/services/news'
import React from 'react'
import Image from 'next/image'
import { truncateText } from '@/utils/truncateText'
import Link from 'next/link'
import { getCategories } from '@/services/category'
import { CategoryEntity } from '@/entities/category.entity'

export const dynamic = 'force-dynamic';

async function page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { data } = await getNews({ category_slug: slug }) as unknown as { data: NewsEntity[] }
  const { data: news_data } = await getNews({ page: 1, page_size: 5 }) as unknown as { data: NewsEntity[] }
  const { data: category_data } = await getCategories() as unknown as { data: CategoryEntity[] }
  return (
    <main className="max-w-7xl m-auto flex max-md:flex-col py-4">
      <div className="w-3/4">
        {data.map(item => (
          <Link href={`/${slug}/${item.slug}`} key={item.id}>
            <div className="flex items-center gap-4">
              <div>
                <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.thumbnail_url}`} alt={item.title} width={336} height={188} />
              </div>
              <div>
                <h5 className="font-bold">{item.title}</h5>
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: truncateText(item.content) }} />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-1/4 px-7">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Bài viết mới nhất</h2>
          <ul>
            {news_data.map(item => (
              <li key={item.id} className="py-2 border-b">
                <a href={`/tin-tuc/${item.slug}`}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Danh mục</h2>
          <ul>
            {category_data.map(item => (
              <li key={item.id} className={`py-2 border-b  ${slug === item.slug ? 'font-bold' : ''}`}>
                <Link href={`/${item.slug}`}>{item.name} ({item.count})</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}

export default page