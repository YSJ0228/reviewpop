# Reservation API & Mocking 가이드

이 문서는 예약 관련 API를 정의하고, React Query Hook을 생성하며, MSW(Mock Service Worker)를 통해 모킹하는 방법을 설명합니다.

## 1. API 함수 정의 (`api/reserveApi.ts`)

서버와 통신하는 실제 API 함수를 정의합니다. `apiClient`를 사용하여 요청을 보냅니다.

```typescript
import { apiClient } from '@shared/api/client';
import { ApiResponse, unwrapApiResponse } from '@shared/api/types/common.types';
import { Reservation, PostReservation } from '@entities/reservation';

// 예: 예약 생성 API
export const createReservation = async (data: PostReservation) => {
  const response = await apiClient.post<ApiResponse<Reservation>>(`/reservations`, data, {
    withCredentials: true,
  });
  return unwrapApiResponse(response.data);
};
```

## 2. React Query Hook 생성 (`hooks/useReserve.ts`)

API 함수를 React Query의 `useQuery` 또는 `useMutation`으로 래핑하여 컴포넌트에서 쉽게 사용할 수 있도록 합니다.

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReservation, PostReservation } from '@entities/reservation';

export const useCreateReservation = (campaignId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostReservation) => createReservation(data),
    onSuccess: () => {
      // 성공 시 관련 쿼리 무효화 (데이터 갱신)
      queryClient.invalidateQueries({ queryKey: ['campaign', campaignId] });
    },
  });
};
```

## 3. MSW 핸들러 설정 (`shared/api/mock/handlers/reservations.ts`)

로컬 개발 환경에서 API 요청을 가로채고 Mock 데이터를 반환하도록 설정합니다.

**왜 필요한가요?**

- **백엔드 의존성 제거**: 백엔드 API가 완성되지 않아도 프론트엔드 개발을 진행할 수 있습니다.
- **다양한 케이스 테스트**: 성공, 실패, 로딩 지연 등 다양한 네트워크 상황을 시뮬레이션하여 UI를 테스트할 수 있습니다.
- **비용 절감**: 실제 서버 요청을 보내지 않으므로 데이터 비용이나 서버 부하를 줄일 수 있습니다.

```typescript
import { http, HttpResponse } from 'msw';
import { mockReservations } from '../data/reservations';

export const reservationHandlers = [
  // POST 요청 가로채기
  http.post('/api/reservations', async ({ request }) => {
    const body = (await request.json()) as PostReservation;

    // Mock 데이터 생성 및 추가
    const newReservation = {
      id: `res-${Date.now()}`,
      ...body,
      isVisited: false,
    };
    mockReservations.push(newReservation);

    // 성공 응답 반환
    return HttpResponse.json({
      success: true,
      data: newReservation,
    });
  }),
];
```

## 4. 핸들러 등록 (`mocks/handlers.ts`)

작성한 핸들러를 MSW 메인 핸들러 목록에 추가해야 합니다.

```typescript
import { reservationHandlers } from '@shared/api/mock/handlers/reservations';

export const handlers = [
  ...reservationHandlers,
  // ... 다른 핸들러들
];
```

## 요약

1.  **API 정의**: `api/reserveApi.ts`에 Axios 요청 함수 작성.
2.  **Hook 생성**: `hooks/useReserve.ts`에 React Query Hook 작성.
3.  **MSW 설정**: `shared/api/mock/handlers/reservations.ts`에 요청 인터셉트 및 응답 로직 작성.
4.  **등록**: `mocks/handlers.ts`에 핸들러 등록.
