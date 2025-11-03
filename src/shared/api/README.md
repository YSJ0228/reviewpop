# Shared API (공유 API)

## 📌 이 폴더는 무엇인가요?

API 호출을 위한 **HTTP 클라이언트 설정**과 **Mock API**를 관리하는 폴더입니다.

## 📁 폴더 구조

```
api/
├── client.ts          # axios 인스턴스 설정
├── mock/
│   ├── browser.ts     # MSW 브라우저 설정
│   ├── handlers.ts    # Mock API 핸들러
│   └── data.ts        # Mock 데이터
└── README.md
```

## 🎯 주요 기능

- **axios 인스턴스**: 공통 설정이 적용된 HTTP 클라이언트
- **Mock API**: 백엔드 없이 개발 가능한 가짜 API
- **에러 처리**: 통일된 에러 핸들링
- **인터셉터**: 요청/응답 가로채기 (토큰 추가 등)

## 📝 사용 예시

### 1. API 호출하기

```typescript
import { apiClient } from '@shared/api/client';

// GET 요청
const getReviews = async () => {
  const response = await apiClient.get('/reviews');
  return response.data;
};

// POST 요청
const createReview = async (data) => {
  const response = await apiClient.post('/reviews', data);
  return response.data;
};
```

### 2. React Query와 함께 사용

```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@shared/api/client';

function useReviews() {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const response = await apiClient.get('/reviews');
      return response.data;
    },
  });
}
```

## 🎭 Mock API 사용법

개발 중에는 Mock API를 사용합니다 (백엔드가 준비되지 않았을 때).

### Mock API 활성화

`src/app/layout.tsx` 또는 `src/app/providers.tsx`에서 활성화:

```typescript
if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('@shared/api/mock/browser');
  worker.start();
}
```

### Mock 핸들러 추가

```typescript
// shared/api/mock/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/reviews', () => {
    return HttpResponse.json([
      { id: 1, title: '좋은 상품이에요', rating: 5 },
      { id: 2, title: '배송이 빨라요', rating: 4 },
    ]);
  }),
];
```

## 💡 개발 팁

- **baseURL**: 환경 변수로 관리 (`NEXT_PUBLIC_API_URL`)
- **토큰 관리**: axios 인터셉터로 자동 추가
- **에러 처리**: 통일된 에러 메시지 처리
- **타임아웃**: 요청 타임아웃 설정 추천 (10초)
