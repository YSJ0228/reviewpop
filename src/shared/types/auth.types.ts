/**
 * 인증 관련 타입 정의
 */

/**
 * OAuth Provider 타입
 */
export type OAuthProvider = 'kakao' | 'naver';

/**
 * JWT Payload 구조
 */
export interface JWTPayload {
  /** 사용자 ID (provider-userId 형식) */
  userId: string;
  /** 이메일 */
  email: string;
  /** 이름 */
  name: string;
  /** OAuth Provider */
  provider: OAuthProvider;
  /** 발급 시간 (timestamp) */
  iat: number;
  /** 만료 시간 (timestamp) */
  exp: number;
}

/**
 * 카카오 토큰 응답
 */
export interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

/**
 * 카카오 사용자 정보 응답
 */
export interface KakaoUserInfo {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url?: string;
      profile_image_url?: string;
      is_default_image?: boolean;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
  };
}

/**
 * 네이버 토큰 응답
 */
export interface NaverTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * 네이버 사용자 정보 응답
 */
export interface NaverUserInfo {
  resultcode: string;
  message: string;
  response: {
    id: string;
    nickname: string;
    name: string;
    email: string;
    gender?: string;
    age?: string;
    birthday?: string;
    profile_image?: string;
    birthyear?: string;
    mobile?: string;
  };
}

/**
 * 통합 인증 사용자 정보
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  profileImage: string | null;
  provider: OAuthProvider;
  createdAt: string;
}

/**
 * 백엔드 인증 응답 (성공)
 */
export interface AuthResponse {
  success: true;
  data: {
    token: string;
    user: AuthUser;
  };
}

/**
 * 인증 에러 코드
 */
export type AuthErrorCode =
  | 'INVALID_TOKEN'
  | 'KAKAO_API_ERROR'
  | 'NAVER_API_ERROR'
  | 'INTERNAL_ERROR'
  | 'UNAUTHORIZED'
  | 'INVALID_STATE';

/**
 * 백엔드 인증 응답 (실패)
 */
export interface AuthErrorResponse {
  success: false;
  error: {
    code: AuthErrorCode;
    message: string;
  };
}

/**
 * OAuth State (CSRF 방지용)
 */
export interface OAuthState {
  state: string;
  redirectUrl?: string;
  timestamp: number;
}
