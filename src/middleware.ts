import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { CONSTANTS } from '@shared/config/constants';
import { ROUTES } from '@shared/config/routes';

export function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;

  // // 인증 토큰 확인
  // const authToken = request.cookies.get(CONSTANTS.COOKIE_KEYS.AUTH_TOKEN);

  // // 보호된 경로에 접근하면서 인증 토큰이 없는 경우
  // if (!authToken) {
  //   // 로그인 페이지로 리다이렉트 (redirect 파라미터 포함)
  //   // ROUTES.LOGIN_WITH_REDIRECT는 encodeURIComponent를 이미 포함하므로
  //   // base URL을 합쳐서 절대 경로로 만들어야 할 수도 있지만,
  //   // Next.js redirect는 상대 경로도 지원함.
  //   // 하지만 request.url(현재 전체 URL)을 redirect 파라미터로 넘겨주는 것이 좋음.

  //   // 현재 접근하려던 전체 URL (쿼리 스트링 포함)
  //   const currentUrl = request.nextUrl.pathname + request.nextUrl.search;

  //   // 로그인 URL 생성
  //   const loginUrl = new URL(ROUTES.LOGIN, request.url);
  //   loginUrl.searchParams.set('redirect', currentUrl);

  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    /*
     * 보호된 경로 패턴:
     * 1. /my/:path* (나의 체험 및 하위 경로)
     * 2. /reviews/create (후기 작성)
     * 3. /settings/:path* (설정 및 하위 경로)
     * 4. /campaign/:id/reserve (체험 예약)
     * 5. /notifications (알림)
     * 6. /profile (마이 페이지)
     */
    '/my/:path*',
    '/campaign/:path*/review/write/:path*',
    '/settings/:path*',
    '/campaign/:path*/reserve/:path*',
    '/notifications',
    '/profile',
  ],
};
