export interface NewsEntity {
  id: number;
  title: string;
  slug: string;
  content: string;
  categories: {
    category_id: number,
    category: {
      name: string,
      slug: string
    }
  }[];
  thumbnail_url: string;
  author_id: number;
  created_at: Date;
}