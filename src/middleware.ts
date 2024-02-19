import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || '';
    const isPublicPath = path.startsWith('/login') || path.startsWith('/signup') || path.startsWith('/api/checkLogin');

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && !isPublicPath) {
        const userData = await verifyJwtToken(token);
        if (userData) {
            return NextResponse.next({request});
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    if(isPublicPath) {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/todo', '/login', '/signup', '/api/checkLogin']
}



// This function will be called within the middleware to verify the token
export async function verifyJwtToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET!));
        return payload;
    }
    catch (error) {
        return null;
    }
}