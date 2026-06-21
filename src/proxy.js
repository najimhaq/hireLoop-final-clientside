import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from './app/lib/auth';


export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.role === 'seeker' && session?.user?.plan === 'free') {
    return NextResponse.redirect(new URL('/pricing', request.url));
  }
  if (session?.user?.role === 'recruiter' && session?.user?.plan === 'free') {
    return NextResponse.redirect(new URL('/pricing', request.url));
  }

  if (!session) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: ['/my-profile', '/dashboard/:path*'],
};
