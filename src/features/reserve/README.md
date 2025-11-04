# Reserve (예약)

## 📌 이 Feature는 무엇인가요?

선정된 캠페인의 방문 예약 기능을 담당합니다:

- 방문 날짜/시간 선택
- 예약 정보 입력 및 확인
- 예약 완료 처리

## 📁 폴더 구조

```
reserve/
├── components/         # 예약 관련 컴포넌트
│   ├── ReserveForm/        # 예약 폼
│   ├── ReserveConfirm/     # 예약 확인
│   └── ReserveComplete/    # 예약 완료
├── hooks/              # 예약 관련 훅
│   └── useReserve.ts       # 예약 생성/제출
├── api/                # 예약 API
│   └── reserveApi.ts
└── README.md
```

## 🎯 주요 기능

### 1. 예약 폼 (ReserveForm)

- 방문 날짜 선택 (달력 UI)
- 방문 시간 선택
- 방문자 정보 입력 (이름, 연락처 등)
- 예약 가능 여부 확인

### 2. 예약 확인 (ReserveConfirm)

- 입력한 예약 정보 요약 표시
- 수정하기 버튼 (이전 페이지로)
- 최종 제출 버튼

### 3. 예약 완료 (ReserveComplete)

- 예약 완료 메시지
- 예약 번호, 날짜, 시간, 장소 표시
- 나의 체험으로 이동 버튼
- 캘린더에 추가 기능 (선택적)

## 🔧 사용 예시

### 예약 생성

```typescript
// features/reserve/hooks/useReserve.ts
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { createReservation } from '../api/reserveApi';

export function useReserve(campaignId: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ReservationData) => createReservation(campaignId, data),
    onSuccess: () => {
      router.push(`/campaign/${campaignId}/reserve/complete`);
    },
  });
}

// 사용
import { useReserve } from '@features/reserve/hooks/useReserve';

function ReserveConfirm({ campaignId, reservationData }: Props) {
  const { mutate: reserve, isPending } = useReserve(campaignId);

  const handleSubmit = () => {
    reserve(reservationData);
  };

  return (
    <div>
      <h2>예약 정보 확인</h2>
      {/* 예약 정보 표시 */}
      <button onClick={handleSubmit} disabled={isPending}>
        예약 완료
      </button>
    </div>
  );
}
```

### 날짜/시간 선택

```typescript
// features/reserve/components/ReserveForm/ReserveForm.tsx
import { useState } from 'react';

function ReserveForm({ campaignId }: { campaignId: string }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleNext = () => {
    // 예약 확인 페이지로 이동
    router.push(`/campaign/${campaignId}/reserve/confirm`);
  };

  return (
    <div>
      {/* 날짜 선택 UI */}
      {/* 시간 선택 UI */}
      {/* 방문자 정보 입력 */}
      <button onClick={handleNext}>다음</button>
    </div>
  );
}
```

## 🔄 예약 플로우

```
나의 체험 (신청 탭)
    ↓
선정된 캠페인 목록
    ↓
[예약하기] 버튼 클릭
    ↓
/campaign/[id]/reserve (예약 폼)
    ↓
날짜/시간 선택 + 정보 입력
    ↓
[다음] 버튼
    ↓
/campaign/[id]/reserve/confirm (예약 확인)
    ↓
정보 확인 + [예약 완료] 버튼
    ↓
/campaign/[id]/reserve/complete (예약 완료)
    ↓
[나의 체험으로] 또는 [홈으로] 이동
```

## ✅ 개발 시 체크리스트

### ReserveForm 컴포넌트

- [ ] 날짜 선택 UI (달력 라이브러리 또는 커스텀)
- [ ] 시간 선택 UI (드롭다운 또는 버튼)
- [ ] 예약 가능 시간 확인 API
- [ ] 방문자 정보 입력 폼
- [ ] 폼 validation
- [ ] 다음 단계로 데이터 전달

### ReserveConfirm 컴포넌트

- [ ] 예약 정보 요약 표시
- [ ] 수정하기 버튼 (이전 페이지)
- [ ] 예약 생성 API 연동
- [ ] 로딩 상태 처리
- [ ] 에러 처리

### ReserveComplete 컴포넌트

- [ ] 예약 완료 메시지
- [ ] 예약 정보 표시 (번호, 날짜, 시간, 장소)
- [ ] 나의 체험으로 이동 버튼
- [ ] 홈으로 이동 버튼
- [ ] 캘린더 추가 기능 (선택적)

## 🚫 주의사항

1. **다른 Feature import 금지**

   ```typescript
   // ❌ 잘못된 예
   import { CampaignCard } from '@features/campaign/components/CampaignCard';

   // ✅ 올바른 예
   import { Button } from '@shared/components/Button';
   ```

2. **상태 관리**
   - 예약 폼 데이터는 페이지 간 전달 필요
   - URL 쿼리 파라미터 또는 전역 상태 활용 고려

3. **에러 처리**
   - 이미 예약한 경우
   - 예약 가능 시간이 아닌 경우
   - 캠페인이 종료된 경우

## 🔗 관련 페이지

- 예약하기 (`/campaign/[id]/reserve`)
- 예약 확인 (`/campaign/[id]/reserve/confirm`)
- 예약 완료 (`/campaign/[id]/reserve/complete`)

## 💡 Tip

- 날짜/시간 선택 UI는 모바일 친화적으로 구현
- 예약 가능 시간은 실시간으로 확인
- 완료 페이지에서 뒤로가기 방지 고려
