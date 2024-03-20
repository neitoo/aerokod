import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/novosti')) {
    return NextResponse.redirect(new URL('/news', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/proekty/motivy/o-proekte/')) {
    return NextResponse.redirect(new URL('/projects/motivy', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/aktsii/')) {
    return NextResponse.redirect(new URL('/news', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/o-kompanii/')) {
    return NextResponse.redirect(new URL('/about', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/kvartiry/dvuhkomnakomnatniye/')) {
    return NextResponse.redirect(new URL('/kvartiry', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/proekty/divny-kvartal-u-ozera/khod-stroitelstva/')) {
    return NextResponse.redirect(new URL('/projects/divnyi-kvartal-u-ozera', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/vacancii/')) {
    return NextResponse.redirect(new URL('/about', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/sposoby-pokupki/ipoteka/')) {
    return NextResponse.redirect(new URL('/purchases/ipoteka', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/kvartiry/studii/')) {
    return NextResponse.redirect(new URL('/kvartiry', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/sposoby-pokupki/rassrochka/')) {
    return NextResponse.redirect(new URL('/purchases/raasrocka', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/sposoby-pokupki/materinskiy-kapital/')) {
    return NextResponse.redirect(new URL('/purchases/materinskii-kapital', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/partneram/')) {
    return NextResponse.redirect(new URL('/about', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/proekty/motivy/khod-stroitelstva/')) {
    return NextResponse.redirect(new URL('/projects/motivy', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/kommertsiya/')) {
    return NextResponse.redirect(new URL('/purchases', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/kvartiry/odnokomnatniye/')) {
    return NextResponse.redirect(new URL('/kvartiry', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/politika-konfidentsialnosti/')) {
    return NextResponse.redirect(new URL('/about', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/proekty/divny-kvartal-u-ozera/o-proekte/')) {
    return NextResponse.redirect(new URL('/projects/divnyi-kvartal-u-ozera', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/proekty/')) {
    return NextResponse.redirect(new URL('/projects', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/kvartiry/favourite/')) {
    return NextResponse.redirect(new URL('/kvartiry', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/kvartiry/trehkomnakomnatniye/')) {
    return NextResponse.redirect(new URL('/kvartiry', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/proekty/divny-kvartal-u-ozera/kontakty/')) {
    return NextResponse.redirect(new URL('/projects/divnyi-kvartal-u-ozera', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/kvartiry/studii/')) {
    return NextResponse.redirect(new URL('/kvartiry', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/kvartiry/favourite/')) {
    return NextResponse.redirect(new URL('/kvartiry', request.url));
  }
  return undefined;
}
