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

---

## ❌ 자주 하는 실수

### 실수 1: fetch를 직접 사용

**가장 흔한 실수!** `apiClient`를 사용해야 합니다.

```typescript
// ❌ 잘못된 예 - fetch 직접 사용
async function getCampaigns() {
  const response = await fetch('/api/campaigns');
  return response.json();
}

// ✅ 올바른 예 - apiClient 사용
import { apiClient } from '@shared/api/client';

async function getCampaigns() {
  const response = await apiClient.get('/api/campaigns');
  return response.data;
}
```

**왜 apiClient를 사용해야 하나요?**

- ✅ 자동 에러 처리
- ✅ 인증 토큰 자동 추가 (인터셉터)
- ✅ Mock API ↔ 실제 API 자동 전환
- ✅ 타임아웃 설정
- ✅ 일관된 응답 형식

### 실수 2: Mock API 활성화 방법 모름

```typescript
// ❌ 잘못된 예 - Mock API가 왜 안 될까요?
// .env.local 파일이 없거나 설정이 잘못됨

// ✅ 올바른 예 - .env.local 확인
// .env.local
NEXT_PUBLIC_USE_MOCK=true  // Mock API 활성화
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Mock API 활성화 체크리스트:**

1. `.env.local` 파일 존재 확인
2. `NEXT_PUBLIC_USE_MOCK=true` 설정
3. 개발 서버 재시작 (`yarn dev`)
4. 브라우저 콘솔에서 "MSW 활성화됨" 메시지 확인

### 실수 3: Mock 핸들러 경로 실수

```typescript
// ❌ 잘못된 예 - /api 빠짐
export const handlers = [
  http.get('/reviews', () => {  // /api가 빠짐!
    return HttpResponse.json([...]);
  }),
];

// ✅ 올바른 예 - /api 포함
export const handlers = [
  http.get('/api/reviews', () => {  // /api 포함
    return HttpResponse.json([...]);
  }),
];
```

**확인 방법:**

- 브라우저 Network 탭에서 실제 요청 경로 확인
- apiClient가 보내는 경로 = Mock 핸들러 경로

### 실수 4: axios 인터셉터 직접 수정

```typescript
// ❌ 잘못된 예 - 여러 곳에서 인터셉터 추가
// features/review/api/reviewApi.ts
apiClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// features/campaign/api/campaignApi.ts
apiClient.interceptors.request.use((config) => {
  // 중복!
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ 올바른 예 - shared/api/client.ts에서만 설정
// shared/api/client.ts
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**중요:**

- 인터셉터는 `shared/api/client.ts`에서만 설정
- 모든 API 요청에 공통으로 적용됨

### 실수 5: 에러 응답 처리 안 함

```typescript
// ❌ 잘못된 예 - 에러 처리 없음
async function createReview(data) {
  const response = await apiClient.post('/api/reviews', data);
  return response.data; // 에러 발생 시 처리 안 됨
}

// ✅ 올바른 예 - try-catch 사용
async function createReview(data) {
  try {
    const response = await apiClient.post('/api/reviews', data);
    return response.data;
  } catch (error) {
    console.error('리뷰 작성 실패:', error);
    throw error; // 상위에서 처리하도록
  }
}

// ✅ 더 좋은 예 - React Query로 에러 처리
function useCreateReview() {
  return useMutation({
    mutationFn: async (data) => {
      const response = await apiClient.post('/api/reviews', data);
      return response.data;
    },
    onError: (error) => {
      console.error('리뷰 작성 실패:', error);
      // 에러 토스트 표시 등
    },
  });
}
```

---

## 💡 체크리스트: API 개발 시

API를 사용할 때 다음을 확인하세요:

- [ ] `apiClient` 사용 (fetch 직접 사용 금지)
- [ ] Mock API가 활성화되어 있는지 확인 (브라우저 콘솔)
- [ ] Mock 핸들러 경로에 `/api` 포함
- [ ] 인터셉터는 `shared/api/client.ts`에서만 설정
- [ ] 에러 처리 (try-catch 또는 React Query)
- [ ] Network 탭에서 요청/응답 확인
