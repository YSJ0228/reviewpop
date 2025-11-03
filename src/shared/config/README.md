# Shared Config (공유 설정)

## 📌 이 폴더는 무엇인가요?

앱 전체에서 사용하는 **환경 변수**, **상수**, **설정값**을 관리하는 폴더입니다.

## 📁 폴더 구조

```
config/
├── constants.ts     # 앱 전체 상수
├── env.ts          # 환경 변수 (타입 안전)
└── routes.ts       # 라우트 경로 상수
```

## 🎯 포함되는 것들

- API URL
- 앱 설정값 (페이지네이션 크기, 제한 등)
- 라우트 경로
- 공통 상수값

## 📝 사용 예시

### 1. 환경 변수 사용

```typescript
// shared/config/env.ts
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
};

// 사용
import { env } from '@shared/config/env';

console.log(env.apiUrl); // 타입 안전!
```

### 2. 상수 사용

```typescript
// shared/config/constants.ts
export const CONSTANTS = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 8,
    MAX_TITLE_LENGTH: 100,
  },
  IMAGE: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  },
};

// 사용
import { CONSTANTS } from '@shared/config/constants';

if (file.size > CONSTANTS.IMAGE.MAX_SIZE) {
  alert('파일 크기가 너무 큽니다');
}
```

### 3. 라우트 경로

```typescript
// shared/config/routes.ts
export const ROUTES = {
  HOME: '/',
  REVIEWS: '/reviews',
  REVIEW_DETAIL: (id: number) => `/reviews/${id}`,
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: number) => `/products/${id}`,
  MY_PAGE: '/my-page',
} as const;

// 사용
import { ROUTES } from '@shared/config/routes';
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push(ROUTES.REVIEW_DETAIL(123)); // "/reviews/123"
```

## 💡 개발 팁

- **타입 안전성**: 환경 변수도 타입 검증
- **중앙 관리**: 매직 넘버/문자열 대신 상수 사용
- **읽기 쉬움**: 대문자 스네이크 케이스 (UPPER_SNAKE_CASE)
- **as const**: 리터럴 타입으로 좁히기
