/**
 * 카카오 OAuth 콜백 API Route
 *
 * 카카오 인증 후 리다이렉트되는 엔드포인트
 */

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { CONSTANTS } from '@shared/config/constants';
import { env } from '@shared/config/env';
import { ROUTES } from '@shared/config/routes';
import { setAuthCookie, verifyOAuthStateCookie } from '@shared/lib/cookies.server';
import type { KakaoTokenResponse, AuthResponse } from '@shared/types/auth.types';

/**
 * GET /api/auth/callback/kakao
 *
 * @param request - Next.js Request
 * @returns 리다이렉트 응답
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // 에러 처리 (사용자가 권한 거부 등)
    if (error) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN + '?error=oauth_failed', request.url));
    }

    // code 확인
    if (!code) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN + '?error=invalid_code', request.url));
    }

    // State 검증 (CSRF 방지)
    const redirectUrl = state ? await verifyOAuthStateCookie(state) : null;
    if (state && !redirectUrl) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN + '?error=invalid_state', request.url));
    }

    // 1. 카카오 토큰 서버에 Access Token 요청
    let access_token: string;

    if (env.useMock || process.env.NODE_ENV === 'development') {
      // Mock 모드 또는 개발 환경: Mock Access Token 사용
      // (서버에서는 MSW가 작동하지 않으므로)
      access_token = `mock-kakao-access-token-${Date.now()}`;
    } else {
      // 프로덕션: 실제 카카오 토큰 서버 호출
      const tokenResponse = await axios.post<KakaoTokenResponse>(
        CONSTANTS.OAUTH.KAKAO.TOKEN_URL,
        new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_CLIENT_ID || '',
          redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}${ROUTES.AUTH_CALLBACK.KAKAO}`,
          code,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      access_token = tokenResponse.data.access_token;
    }

    // 2. 백엔드 API에 Access Token 전달 (검증 및 JWT 발급)
    let token: string;
    let userEmail: string;

    if (env.useMock || process.env.NODE_ENV === 'development') {
      // Mock 모드 또는 개발 환경: 서버에서 직접 JWT 생성
      // 개발 환경: 서버에서 직접 JWT 생성
      // (MSW는 브라우저에서만 작동하므로)
      const { generateJWT } = await import('@shared/lib/jwt');

      // Mock 카카오 사용자 정보
      const mockKakaoUser = {
        id: 123456789,
        email: 'test@kakao.com',
        name: '테스트유저',
      };

      token = generateJWT({
        userId: `kakao-${mockKakaoUser.id}`,
        email: mockKakaoUser.email,
        name: mockKakaoUser.name,
        provider: 'kakao',
      });

      userEmail = mockKakaoUser.email;
    } else {
      // 프로덕션: 실제 백엔드 API 호출
      const backendResponse = await axios.post<AuthResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}${ROUTES.API.SOCIAL_LOGIN.KAKAO}`,
        {
          access_token,
        },
      );

      if (!backendResponse.data.success) {
        return NextResponse.redirect(new URL(ROUTES.LOGIN + '?error=auth_failed', request.url));
      }

      const { token: jwtToken, user } = backendResponse.data.data;
      token = jwtToken;
      userEmail = user.email;
    }

    // 3. 쿠키에 JWT 저장
    await setAuthCookie(token);

    // 4. 원래 페이지 또는 홈으로 리다이렉트
    const finalRedirectUrl = redirectUrl || ROUTES.HOME;
    const response = NextResponse.redirect(new URL(finalRedirectUrl, request.url));

    // 쿠키 설정 (NextResponse에서)
    response.cookies.set(CONSTANTS.COOKIE_KEYS.AUTH_TOKEN, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return response;
  } catch (error) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN + '?error=server_error', request.url));
  }
}
