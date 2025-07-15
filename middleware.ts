import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { NextResponse, NextRequest } from 'next/server';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies(); 
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  if (isPublicRoute) {
    if (accessToken) {
      return NextResponse.redirect(new URL('/', request.url)); 
    }
    return NextResponse.next();
  }


  if (isPrivateRoute) {
    if (!accessToken) {
      if (refreshToken) {
        const response = await checkServerSession(); 

        const setCookie = response.headers['set-cookie'];
        if (setCookie) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];

          const responseToNext = NextResponse.next();

        
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path || '/',
              maxAge: parsed['Max-Age']
                ? Number(parsed['Max-Age'])
                : undefined,
              httpOnly: true,
              secure: true,
            };
            if (parsed.accessToken) {
              responseToNext.cookies.set('accessToken', parsed.accessToken, options);
            }
            if (parsed.refreshToken) {
              responseToNext.cookies.set('refreshToken', parsed.refreshToken, options);
            }
          }

          return responseToNext; 
        }
      }

  
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next(); 
  }

  
  return NextResponse.next();
}


export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
