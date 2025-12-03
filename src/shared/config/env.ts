/**
 * 환경 변수 설정
 *
 * 환경 변수를 타입 안전하게 사용하기 위한 파일입니다.
 * process.env를 직접 사용하는 대신 이 파일을 통해 접근합니다.
 *
 * Next.js에서는 NEXT_PUBLIC_ 접두사가 있는 환경 변수만 브라우저에서 사용 가능합니다.
 */

export const env = {
  /** API 기본 URL */
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',

  /** 현재 환경 */
  nodeEnv: process.env.NODE_ENV,

  /** 개발 환경 여부 */
  isDev: process.env.NODE_ENV === 'development',

  /** 프로덕션 환경 여부 */
  isProd: process.env.NODE_ENV === 'production',

  /** Mock API 사용 여부 (개발 환경에서 기본적으로 true) */
  useMock: process.env.NEXT_PUBLIC_USE_MOCK === 'true' || process.env.NODE_ENV === 'development',

  /** 네이버 지도 API 클라이언트 ID */
  naverMapClientId: process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID || '',
} as const;
