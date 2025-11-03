/**
 * 앱 전체 상수
 *
 * 프로젝트에서 사용하는 모든 상수를 중앙에서 관리합니다.
 * 매직 넘버나 문자열 대신 이 파일의 상수를 사용하세요.
 */

export const CONSTANTS = {
  /** 페이지네이션 관련 */
  PAGINATION: {
    /** 기본 페이지 크기 */
    DEFAULT_PAGE_SIZE: 10,
    /** 최대 페이지 크기 */
    MAX_PAGE_SIZE: 100,
  },

  /** 유효성 검증 관련 */
  VALIDATION: {
    /** 최소 비밀번호 길이 */
    MIN_PASSWORD_LENGTH: 8,
    /** 최대 제목 길이 */
    MAX_TITLE_LENGTH: 100,
    /** 최대 내용 길이 */
    MAX_CONTENT_LENGTH: 1000,
  },

  /** 이미지 관련 */
  IMAGE: {
    /** 최대 파일 크기 (5MB) */
    MAX_SIZE: 5 * 1024 * 1024,
    /** 허용되는 파일 타입 */
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'] as const,
  },

  /** 로컬 스토리지 키 */
  STORAGE_KEYS: {
    /** 인증 토큰 (deprecated - 쿠키 사용) */
    AUTH_TOKEN: 'auth_token',
    /** 사용자 정보 (deprecated - 서버 세션 사용) */
    USER: 'user',
    /** OAuth State */
    OAUTH_STATE: 'oauth_state',
  },

  /** 쿠키 키 */
  COOKIE_KEYS: {
    /** 인증 토큰 */
    AUTH_TOKEN: 'auth_token',
  },

  /** JWT 설정 */
  JWT: {
    /** 만료 시간 */
    EXPIRES_IN: '7d',
    /** 알고리즘 */
    ALGORITHM: 'HS256' as const,
  },

  /** OAuth 설정 */
  OAUTH: {
    /** 카카오 */
    KAKAO: {
      /** 인증 URL */
      AUTHORIZE_URL: 'https://kauth.kakao.com/oauth/authorize',
      /** 토큰 URL */
      TOKEN_URL: 'https://kauth.kakao.com/oauth/token',
      /** 사용자 정보 URL */
      USER_INFO_URL: 'https://kapi.kakao.com/v2/user/me',
    },
    /** 네이버 */
    NAVER: {
      /** 인증 URL */
      AUTHORIZE_URL: 'https://nid.naver.com/oauth2.0/authorize',
      /** 토큰 URL */
      TOKEN_URL: 'https://nid.naver.com/oauth2.0/token',
      /** 사용자 정보 URL */
      USER_INFO_URL: 'https://openapi.naver.com/v1/nid/me',
    },
  },
} as const;
