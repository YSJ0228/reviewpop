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

  /** 제품 목록 페이지 */
  PRODUCTS: '/products',

  /** 제품 상세 페이지 */
  PRODUCT_DETAIL: (id: number | string) => `/products/${id}`,

  /** 마이페이지 */
  MY_PAGE: '/my-page',

  /** 로그인 페이지 */
  LOGIN: '/login',

  /** 회원가입 페이지 */
  SIGNUP: '/signup',
} as const;
