import { createSlug } from "@/utils/createSlug";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { deleteFile, uploadFile } from "@/utils/fileUpload";

export async function POST(req: Request) {
  let filenames: string[] = [];
  const author_id = req.headers.get('x-user-id');
  if (!author_id) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const files = Array.from(formData.values()).filter((value): value is File => value instanceof File);
    const slug = createSlug(title);

    const data_category = category.split(',').map((value) => ({
      category: {
        connect: {
          name: value,
        }
      }
    }))

    if (files.length === 0) {
      return NextResponse.json({ message: "Không file nào được chọn" }, { status: 400 });
    }
    filenames = await uploadFile(files, "news");
    const newNews = await prisma.news.create({
      data: {
        title,
        content,
        slug,
        author_id: +author_id,
        categories: {
          create: data_category
        },
        thumbnail_url: `/images/news/${filenames[0]}`
      }
    })
    return NextResponse.json({ data: newNews }, { status: 200 })
  } catch (err) {
    if (filenames.length > 0) {
      await Promise.all(filenames.map((filename) => deleteFile(filename)));
    }
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 })
    } else {
      return NextResponse.json({ message: "Có lỗi xảy ra" }, { status: 500 })
    }
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const pageParam = url.searchParams.get('page');
  const page_sizeParam = url.searchParams.get('page_size')
  const title = url.searchParams.get('title') || '';
  const category = url.searchParams.get('category') || '';
  const category_slug = url.searchParams.get('category_slug') || '';

  const page = pageParam ? parseInt(pageParam, 10) : null;
  const page_size = page_sizeParam ? parseInt(page_sizeParam, 10) : null;

  let skip: number | undefined;
  let take: number | undefined;

  if (page !== null && page_size !== null) {
    skip = (page - 1) * page_size;
    take = page_size;
  }
  const whereCondition = {
    ...(title && { title: { contains: title } }),
    ...(category && { 
      categories: { 
        some: { 
          category: { 
            name: { 
              in: category.split(',').map(cat => cat.trim())
            } 
          } 
        } 
      }
    }),
    ...(category_slug && { 
      categories: { 
        some: { 
          category: { 
            slug: { 
              in: category_slug.split(',').map(cat => cat.trim())
            } 
          } 
        } 
      }
    })
  };
  try {
    const news = await prisma.news.findMany({
      skip,
      take,
      include: {
        categories: {
          select: {
            category_id: true,
            category: {
              select: {
                name: true,
                slug: true
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      },
      where: whereCondition
    })
    const total = await prisma.news.count()
    return NextResponse.json(
      {
        data: news,
        paging: {
          page,
          page_size,
          total
        }
      },
      { status: 200 }
    )
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 })
    } else {
      return NextResponse.json({ message: "Có lỗi xảy ra" }, { status: 500 })
    }
  }
}