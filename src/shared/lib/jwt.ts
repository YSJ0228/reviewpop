/**
 * JWT 유틸리티
 *
 * JWT 토큰 생성 및 검증을 담당합니다.
 */

import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { CONSTANTS } from '@shared/config/constants';
import { env } from '@shared/config/env';
import type { JWTPayload, OAuthProvider } from '@shared/types/auth.types';

/**
 * JWT Secret 키 가져오기
 *
 * 프로덕션: 환경변수 필수
 * 개발: 자동 생성 (세션마다 새로 생성되므로 서버 재시작 시 토큰 무효화됨)
 */
function getJWTSecret(): string {
  // 프로덕션 환경 (Mock 아닐 때만)
  if (process.env.NODE_ENV === 'production' && !env.useMock) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET 환경변수가 설정되지 않았습니다.');
    }
    return secret;
  }

  // 개발 환경 - 자동 생성
  // 주의: 서버 재시작 시 모든 토큰이 무효화됩니다
  if (!global.__JWT_SECRET__) {
    global.__JWT_SECRET__ = crypto.randomBytes(32).toString('hex');
  }
  return global.__JWT_SECRET__;
}

/**
 * JWT 토큰 생성
 *
 * @param payload - 토큰에 포함할 사용자 정보
 * @returns JWT 토큰 문자열
 */
export function generateJWT(payload: {
  userId: string;
  email: string;
  name: string;
  provider: OAuthProvider;
}): string {
  const secret = getJWTSecret();

  const token = jwt.sign(payload, secret, {
    expiresIn: CONSTANTS.JWT.EXPIRES_IN,
    algorithm: CONSTANTS.JWT.ALGORITHM,
  });

  return token;
}

/**
 * JWT 토큰 검증
 *
 * @param token - 검증할 JWT 토큰
 * @returns 디코딩된 페이로드 또는 null (검증 실패 시)
 */
export function verifyJWT(token: string): JWTPayload | null {
  try {
    const secret = getJWTSecret();

    const decoded = jwt.verify(token, secret, {
      algorithms: [CONSTANTS.JWT.ALGORITHM],
    }) as JWTPayload;

    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * JWT 토큰 디코딩 (검증 없이)
 *
 * 주의: 검증하지 않으므로 신뢰할 수 없는 데이터입니다.
 * 디버깅 용도로만 사용하세요.
 *
 * @param token - 디코딩할 JWT 토큰
 * @returns 디코딩된 페이로드 또는 null
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

// Global 타입 확장 (개발 환경 Secret 저장용)
declare global {
  var __JWT_SECRET__: string | undefined;
}
