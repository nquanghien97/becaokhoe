import { CategoryEntity } from '@/entities/category.entity'
import { NewsEntity } from '@/entities/news.entity'
import { getCategories } from '@/services/category'
import { getNews, getNewsBySlug } from '@/services/news'
import Link from 'next/link'
import React from 'react'

async function page({ params }: { params: { detail_slug: string } }) {
  const { detail_slug } = params
  const { data } = await getNewsBySlug(detail_slug) as unknown as { data: NewsEntity }
  const { data: news_data } = await getNews({ page: 1, page_size: 5 }) as unknown as { data: NewsEntity[] }
  const { data: category_data } = await getCategories() as unknown as { data: CategoryEntity[] }

  return (
    <main className="max-w-6xl m-auto py-4 flex max-lg:flex-col">
      <div className="w-full lg:w-3/4 px-2 lg:px-7">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.content }} className="content" />
      </div>
      <div className="w-full lg:w-1/4 px-7">
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
              <li key={item.id} className={`py-2 border-b`}>
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