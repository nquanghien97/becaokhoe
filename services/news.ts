import { NewsEntity } from "@/entities/news.entity";

export async function getNews({ page, page_size, category_slug }: { page?: number, page_size?: number, category_slug?: string }) {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (page_size) params.append('page_size', page_size.toString());
  if (category_slug) params.append('category_slug', category_slug.toString());
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news?${params.toString()}`, 
{
  cache: 'no-store'
})
  return res.json()
}

export async function getNewsBySlug(slug: string): Promise<NewsEntity> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news/${slug}`, {
    cache: 'no-store'
  })
  return res.json()
}