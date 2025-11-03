/**
 * 클라이언트 사이드 쿠키 유틸리티
 *
 * Client Component에서 사용 (읽기 전용)
 */

import cookie from 'cookie';
import { CONSTANTS } from '@shared/config/constants';

/**
 * 인증 토큰 쿠키 가져오기
 *
 * @returns 토큰 문자열 또는 null
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const cookies = cookie.parse(document.cookie);
  return cookies[CONSTANTS.COOKIE_KEYS.AUTH_TOKEN] ?? null;
}

/**
 * 모든 쿠키 파싱
 *
 * @returns 쿠키 객체
 */
export function getAllCookies(): Record<string, string> {
  if (typeof window === 'undefined') {
    return {};
  }

  return cookie.parse(document.cookie) as Record<string, string>;
}
