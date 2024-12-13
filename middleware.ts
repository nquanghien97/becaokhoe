import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

// Danh sách các route không yêu cầu xác thực
const PUBLIC_ROUTES = [
  '/api/auth/login', 
];

// Các route được miễn xác thực
const EXCLUDED_ROUTES = [
  '/api/news'
];

export async function middleware(req: NextRequest) {
  // Xử lý CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };

  // Xử lý OPTIONS request
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // Kiểm tra route miễn xác thực
  const isPublicRoute = PUBLIC_ROUTES.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );
  
  const isExcludedRoute = EXCLUDED_ROUTES.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );
  
  const isAllowedMethod = [
    '/api/images' === req.nextUrl.pathname && req.method === 'GET',
    '/api/news' === req.nextUrl.pathname && req.method === 'GET',
  ].some(Boolean);
  
  // Nếu là route công khai hoặc được miễn, cho phép qua
  if (isPublicRoute || isExcludedRoute || isAllowedMethod) {
    return NextResponse.next({
      headers: corsHeaders
    });
  }

  // Lấy token từ header hoặc cookie
  const token = 
    req.cookies.get('token')?.value ||
    req.headers.get('authorization')?.split(' ')[1]
  // Kiểm tra token
  if (!token || token === 'undefined') {
    // redirect('/')
    return new NextResponse(
      JSON.stringify({ 
        success: false, 
        message: 'Access token not found!!' 
      }),
      { 
        status: 401, 
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );
  }

  try {
    // Xác thực token
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET);
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256']
    });

    // Tạo response mới với thông tin user
    const response = NextResponse.next({
      headers: {
        ...corsHeaders,
        'x-user-id': payload.user_id as string
      }
    });

    return response;

  } catch (error) {
    console.error('Token verification error:', error);
    return new NextResponse(
      JSON.stringify({ 
        success: false, 
        message: 'Invalid or expired token' 
      }),
      { 
        status: 401, 
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );
  }
}

export const config = {
  matcher: '/api/:path*',
};