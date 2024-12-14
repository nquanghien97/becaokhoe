// import prisma from "@/lib/db";
import { createSlug } from "@/utils/createSlug";
import prisma from "../../../../lib/prisma"
import { NextResponse } from "next/server";
import { deleteFile, uploadFile } from "@/utils/fileUpload";

export async function PUT(req: Request, { params }: { params: { param: number } }) {
  const { param } = params;
  let filenames: string[] = [];
  try {
    if (!param) {
      return NextResponse.json(
        {
          message: 'news ID is required',
        },
        { status: 400 }
      );
    }
    const oldNews = await prisma.news.findUnique({
      where: { id: +param },
    });

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;

    const data_category = category.split(',').map((value) => value.trim());
    const slug = createSlug(title);
    const category_slug = createSlug(category)
    const files = Array.from(formData.values()).filter((value): value is File => value instanceof File);

    if (files.length === 0) {
      const updatedNews = await prisma.news.update({
        where: { id: +param },
        data: {
          title,
          content,
          categories: {
            // Xóa categories cũ và tạo mới
            deleteMany: {},
            create: data_category.map(cat => ({
              category: {
                connectOrCreate: {
                  where: { name: cat },
                  create: { name: cat, slug: category_slug }
                }
              }
            }))
          },
          slug
        },
      });

      return NextResponse.json(
        { data: updatedNews },
        { status: 200 }
      );
    }

    // Nếu có file upload
    await deleteFile(oldNews?.thumbnail_url || '');
    filenames = await uploadFile(files, "news");

    const updatednews = await prisma.news.update({
      where: { id: +param },
      data: {
        title,
        content,
        categories: {
          // Xóa categories cũ và tạo mới
          deleteMany: {},
          create: data_category.map(cat => ({
            category: {
              connectOrCreate: {
                where: { name: cat },
                create: { name: cat, slug: category_slug }
              }
            }
          }))
        },
        thumbnail_url: `/images/news/${filenames[0]}`,
        slug
      },
    });

    return NextResponse.json(
      { data: updatednews },
      { status: 200 }
    );

  } catch (err) {
    if (filenames.length > 0) {
      await deleteFile(filenames[0]);
    }
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 500 });
    }
  }
}

export async function GET(req: Request, { params }: { params: { param: number | string } }) {
  const { param } = params
  try {
    if (!isNaN(Number(param))) {
      const news = await prisma.news.findUnique({
        where: {
          id: +param
        },
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
      })
      return NextResponse.json(
        {
          data: news,
        },
        { status: 200 }
      )
    } else {
      const news = await prisma.news.findUnique({
        where: {
          slug: param.toString()
        },
        include: {
          categories: {
            select: {
              category_id: true,
              category: {
                select: {
                  name: true,
                }
              }
            }
          }
        },
      })
      return NextResponse.json(
        {
          data: news,
        },
        { status: 200 }
      )
    }

  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 500 });
    }
  }
}

export async function DELETE(req: Request, { params }: { params: { param: number } }) {
  const { param } = params
  try {
    const news = await prisma.news.findUnique({
      where: {
        id: +param
      }
    })
    await prisma.news.delete({
      where: {
        id: +param
      }
    })
    await deleteFile(news?.thumbnail_url || "")
    return NextResponse.json(
      {
        message: 'Xóa Tin tức thành công',
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Có lỗi xảy ra' }, { status: 500 });
    }
  }
}