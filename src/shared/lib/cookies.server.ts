/**
 * 서버 사이드 쿠키 유틸리티
 *
 * Next.js Server Component, API Route에서 사용
 */

import { cookies } from 'next/headers';
import { CONSTANTS } from '@shared/config/constants';

/**
 * 인증 토큰 쿠키 설정 옵션
 */
const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7일
};

/**
 * 인증 토큰 쿠키 가져오기
 *
 * @returns 토큰 문자열 또는 null
 */
export async function getAuthCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(CONSTANTS.COOKIE_KEYS.AUTH_TOKEN);
  return authToken?.value ?? null;
}

/**
 * 인증 토큰 쿠키 설정
 *
 * @param token - JWT 토큰 문자열
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CONSTANTS.COOKIE_KEYS.AUTH_TOKEN, token, AUTH_COOKIE_OPTIONS);
}

/**
 * 인증 토큰 쿠키 삭제
 */
export async function deleteAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CONSTANTS.COOKIE_KEYS.AUTH_TOKEN);
}

/**
 * OAuth State 쿠키 설정 (CSRF 방지)
 *
 * @param state - 랜덤 state 문자열
 * @param redirectUrl - 로그인 후 리다이렉트할 URL
 */
export async function setOAuthStateCookie(state: string, redirectUrl?: string): Promise<void> {
  const cookieStore = await cookies();
  const stateData = JSON.stringify({
    state,
    redirectUrl,
    timestamp: Date.now(),
  });

  cookieStore.set(CONSTANTS.STORAGE_KEYS.OAUTH_STATE, stateData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10, // 10분 (OAuth 플로우 완료까지)
  });
}

/**
 * OAuth State 쿠키 가져오기 및 검증
 *
 * @param state - 검증할 state 문자열
 * @returns redirectUrl 또는 null (검증 실패 시)
 */
export async function verifyOAuthStateCookie(state: string): Promise<string | null> {
  const cookieStore = await cookies();
  const stateCookie = cookieStore.get(CONSTANTS.STORAGE_KEYS.OAUTH_STATE);

  if (!stateCookie) {
    return null;
  }

  try {
    const stateData = JSON.parse(stateCookie.value);

    // State 일치 확인
    if (stateData.state !== state) {
      return null;
    }

    // 타임스탬프 확인 (10분 이내)
    const now = Date.now();
    const elapsed = now - stateData.timestamp;
    if (elapsed > 10 * 60 * 1000) {
      return null;
    }

    // State 쿠키 삭제 (일회용)
    cookieStore.delete(CONSTANTS.STORAGE_KEYS.OAUTH_STATE);

    return stateData.redirectUrl || '/';
  } catch (error) {
    return null;
  }
}
