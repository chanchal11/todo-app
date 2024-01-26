import { NextRequest ,NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || '';
    const isPublicPath = path.startsWith('/login') || path.startsWith('/register');
    
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/todo', request.nextUrl))
      }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [ '/todo', '/login', '/register' ]
}