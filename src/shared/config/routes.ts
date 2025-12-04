/**
 * 라우트 경로 상수
 *
 * 앱의 모든 라우트를 중앙에서 관리합니다.
 * 문자열을 직접 사용하는 대신 이 파일의 상수를 사용하세요.
 *
 * @example
 * ```tsx
 * import { ROUTES } from '@shared/config/routes';
 * import { useRouter } from 'next/navigation';
 *
 * const router = useRouter();
 * router.push(ROUTES.REVIEW_DETAIL(123)); // "/reviews/123"
 * ```
 */

export const ROUTES = {
  /** 홈 페이지 */
  HOME: '/',

  /** 리뷰 목록 페이지 */
  REVIEWS: '/reviews',

  /** 리뷰 상세 페이지 */
  REVIEW_DETAIL: (id: number | string) => `/reviews/${id}`,

  /** 리뷰 작성 페이지 */
  REVIEW_CREATE: '/reviews/create',

  /** 체험 상세 페이지 */
  CAMPAIGN_DETAIL: (id: number | string) => `/campaign/${id}`,

  /** 제품 목록 페이지 */
  PRODUCTS: '/products',

  /** 제품 상세 페이지 */
  PRODUCT_DETAIL: (id: number | string) => `/products/${id}`,

  /** 마이페이지 */
  MY_PAGE: '/my-page',

  /** 프로필 페이지 */
  PROFILE: '/profile',

  /** 로그인 페이지 */
  LOGIN: '/login',

  /** 로그인 페이지 (리다이렉트 포함) */
  LOGIN_WITH_REDIRECT: (redirectUrl: string) =>
    `/login?redirect=${encodeURIComponent(redirectUrl)}`,

  /** 회원가입 페이지 */
  SIGNUP: '/signup',

  /** 개인정보 페이지 */
  SETTING_USER: '/settings/user',

  /** 미선정 체험 내역 페이지 */
  MY_REJECTED: '/my/rejected',

  /** OAuth 콜백 */
  AUTH_CALLBACK: {
    /** 카카오 콜백 */
    KAKAO: '/api/auth/callback/kakao',
    /** 네이버 콜백 */
    NAVER: '/api/auth/callback/naver',
  },

  /** 인증 API */
  API: {
    /** 로그아웃 */
    LOGOUT: '/api/auth/logout',
    /** 현재 사용자 정보 */
    ME: '/api/auth/me',
    /** 소셜 로그인 (백엔드) */
    SOCIAL_LOGIN: {
      KAKAO: '/api/auth/social/kakao',
      NAVER: '/api/auth/social/naver',
    },
    PROFILE: '/api/auth/profile',
  },
} as const;
