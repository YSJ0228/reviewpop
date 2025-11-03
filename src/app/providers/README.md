# App Providers

## 📌 이 폴더는 무엇인가요?

앱 전체에서 사용하는 Provider들을 모아둔 폴더입니다.

## 🎯 포함된 Provider

### 1. React Query Provider

**React Query**의 QueryClient를 제공합니다.
서버 상태 관리 (API 호출, 캐싱 등)를 담당합니다.

#### 설정된 기본 옵션

```typescript
{
  staleTime: 5분,      // 데이터 신선도 유지 시간
  gcTime: 10분,        // 캐시 유지 시간
  retry: 1,            // 에러 발생 시 재시도 횟수
}
```

### 2. React Query Devtools

**개발 환경에서만** 표시되는 디버깅 도구입니다.

#### 사용 방법

1. 개발 서버 실행 (`yarn dev`)
2. 브라우저 우측 하단에 React Query 아이콘 표시
3. 클릭하면 쿼리 상태를 시각적으로 확인 가능

#### 볼 수 있는 정보

- 현재 실행 중인 쿼리 목록
- 각 쿼리의 상태 (loading, success, error)
- 캐시된 데이터
- 쿼리 재실행, 캐시 초기화 등

### 3. MSW (Mock Service Worker)

**Mock API**를 활성화합니다.

- `.env.local`에서 `NEXT_PUBLIC_USE_MOCK=true`면 활성화
- 백엔드 없이도 프론트엔드 개발 가능
- Mock 데이터는 `src/shared/api/mock/` 폴더에서 관리

### 4. 테마 초기화

- localStorage에 저장된 테마 불러오기
- 시스템 다크모드 감지
- 자동으로 테마 적용

### 5. 사용자 정보 복원

- localStorage에 저장된 사용자 정보 불러오기
- 로그인 상태 유지

## 📝 사용 방법

`layout.tsx`에서 자동으로 적용되므로 **별도 설정 불필요**합니다.

```typescript
// app/layout.tsx
import { Providers } from './providers/Providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

## 🔧 React Query Devtools 사용 팁

### 1. 쿼리 상태 확인

- **Fresh**: 신선한 데이터 (staleTime 내)
- **Stale**: 오래된 데이터 (refetch 필요)
- **Fetching**: 데이터 가져오는 중
- **Inactive**: 현재 사용되지 않는 쿼리

### 2. 수동 작업

- **Refetch**: 쿼리 다시 실행
- **Invalidate**: 캐시 무효화
- **Reset**: 쿼리 초기화
- **Remove**: 쿼리 제거

### 3. 디버깅

```typescript
// 특정 쿼리 찾기
const { data } = useQuery({
  queryKey: ['reviews'], // <- 이 키로 Devtools에서 검색
  queryFn: getReviews,
});
```

Devtools에서 `reviews`로 검색하면 해당 쿼리의 모든 정보를 볼 수 있습니다!

## 💡 개발 팁

### Mock API 끄기

실제 백엔드가 준비되면:

```bash
# .env.local
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_URL=https://api.reviewpop.com
```

### 새로운 Provider 추가

필요하면 `Providers.tsx`에 추가하면 됩니다:

```typescript
export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NewProvider> {/* 새 Provider 추가 */}
        {children}
      </NewProvider>
    </QueryClientProvider>
  );
}
```
