/**
 * 로그아웃 API Route
 */

import { NextResponse } from 'next/server';
import { deleteAuthCookie } from '@shared/lib/cookies.server';
import { CONSTANTS } from '@shared/config/constants';

/**
 * POST /api/auth/logout
 *
 * 쿠키를 삭제하여 로그아웃 처리하고 홈페이지로 리다이렉트
 */
export async function POST(request: Request) {
  try {
    // 쿠키 삭제
    await deleteAuthCookie();

    // 홈페이지로 리다이렉트
    const url = new URL('/', request.url);
    const response = NextResponse.redirect(url);

    // NextResponse에서도 쿠키 삭제
    response.cookies.delete(CONSTANTS.COOKIE_KEYS.AUTH_TOKEN);

    return response;
  } catch (error) {
    // 에러 발생 시에도 홈페이지로 리다이렉트 (쿠키는 삭제됨)
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }
}
