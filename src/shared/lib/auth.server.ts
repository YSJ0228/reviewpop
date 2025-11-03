/**
 * 서버 사이드 인증 헬퍼
 *
 * Server Component에서 사용하는 인증 유틸리티
 */

import { redirect } from 'next/navigation';
import { getAuthCookie } from './cookies.server';
import { verifyJWT } from './jwt';
import { fromUnix } from './date';
import { ROUTES } from '@shared/config/routes';
import type { User } from '@entities/user/types/user.types';

/**
 * 현재 세션 정보 가져오기
 *
 * @returns 사용자 정보 또는 null
 */
export async function getSession(): Promise<User | null> {
  try {
    // 쿠키에서 토큰 가져오기
    const token = await getAuthCookie();

    if (!token) {
      return null;
    }

    // JWT 검증
    const payload = verifyJWT(token);

    if (!payload) {
      return null;
    }

    // 사용자 정보 구성
    const user: User = {
      id: payload.userId,
      email: payload.email,
      name: payload.name,
      profileImage: null, // JWT에는 프로필 이미지가 없음
      provider: payload.provider,
      createdAt: fromUnix(payload.iat).toISOString(),
    };

    return user;
  } catch (error) {
    return null;
  }
}

/**
 * 인증 필수 - 미인증 시 로그인 페이지로 리다이렉트
 *
 * @param redirectUrl - 로그인 후 돌아올 URL (선택사항)
 * @returns 사용자 정보
 */
export async function requireAuth(redirectUrl?: string): Promise<User> {
  const user = await getSession();

  if (!user) {
    // 리다이렉트 URL 구성
    const loginUrl = redirectUrl ? ROUTES.LOGIN_WITH_REDIRECT(redirectUrl) : ROUTES.LOGIN;

    redirect(loginUrl);
  }

  return user;
}

/**
 * 인증 확인 (리다이렉트 없이)
 *
 * @returns 인증 여부
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getSession();
  return user !== null;
}
