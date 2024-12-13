import prisma from "@/lib/prisma";
import { createToken } from "@/lib/token";
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { user_name, password } = await req.json();

  if (!user_name || !password) {
    return NextResponse.json({
      success: false,
      message: "Vui lòng nhập đầy đủ số điện thoại hoặc mật khẩu"
    }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        user_name
      }
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Thông tin đăng nhập không chính xác"
      }, { status: 400 });
    }

    const passwordValidated = await bcrypt.compare(password, user.password);
    if (!passwordValidated) {
      return NextResponse.json({
        success: false,
        message: "Tài khoản hoặc mật khẩu không chính xác"
      }, { status: 400 });
    }

    const accessToken = await createToken(user.id);

    const cookieStore = cookies();
    cookieStore.set('token', accessToken, {
      path: '/',
      expires: new Date(Date.now() + 3600 * 1000 * 7), // 7 days
      httpOnly: true,
    });

    return NextResponse.json({
      success: true,
      message: "Đăng nhập thành công",
      accessToken
    }, { status: 200 });

  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 })
    } else {
      return NextResponse.json({ message: "Có lỗi xảy ra" }, { status: 500 })
    }
  }
}