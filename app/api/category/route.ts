import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Đường dẫn thay đổi tùy theo dự án của bạn

export async function GET() {
  try {
    // Truy vấn tất cả category và đếm số lượng news liên kết
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: {
            news: true
          }
        }
      },
    });

    // Định dạng dữ liệu trả về
    const result = categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      count: category._count.news,
    }));

    return NextResponse.json(
      { data: result },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Có lỗi xảy ra" }, { status: 500 });
    }
  }
}
