# CampaignCard 컴포넌트

## 📌 개요

`CampaignCard`는 체험 신청 상태에 따라 다른 UI를 보여주는 카드 컴포넌트입니다.
`Application`과 `TCardType`을 받아 적절한 카드 컴포넌트를 렌더링하는 라우터 역할을 합니다.

## 🏗 컴포넌트 구조

```
CampaignCard/
├── index.tsx                    # 메인 컴포넌트 (라우터)
├── types.ts                     # 공통 타입
├── CampaignPendingCard/         # 신청 탭
├── CampaignSelectedCard/        # 선정 탭
├── CampaignRejectedCard/        # 미선정
├── CampaignReviewedCard/        # 후기 탭
├── CampaignCompletedCard/       # 완료 탭
└── CampaignAppliedCard/         # 신청 상태 관련 컴포넌트
```

## 🎯 카드 타입

| 타입        | 설명         | 사용 탭   |
| ----------- | ------------ | --------- |
| `pending`   | 신청 중      | 신청 탭   |
| `selected`  | 선정됨       | 선정 탭   |
| `rejected`  | 미선정       | 미선정 탭 |
| `reviewed`  | 후기 작성 중 | 후기 탭   |
| `completed` | 완료         | 종료 탭   |

## 📝 사용 방법

```typescript
import { CampaignCard } from '@features/history/components/CampaignCard';
import type { Application } from '@entities/application';
import type { TCardType } from '@features/history/constants';

<CampaignCard
  application={application}
  type={type} // 'pending' | 'selected' | 'rejected' | 'reviewed' | 'completed'
/>
```

## 🔧 주요 컴포넌트

### CampaignCardWrapper

모든 카드 타입이 공통으로 사용하는 래퍼 컴포넌트입니다.

- `SharedCampaignCard`를 래핑하여 공통 UI 제공
- 캠페인 상세 페이지로 이동하는 Link 제공
- `statusLabel`, `topContent`, `bottomContent` 슬롯 지원

### useCampaignCardData

카드 컴포넌트에서 사용하는 공통 데이터를 준비하는 훅입니다.

```typescript
const { campaign, visitStatus, appliedAt, announcementStatus } = useCampaignCardData(application);
```

**반환 데이터:**

- `campaign`: 캠페인 정보
- `visitStatus`: 방문 상태 (`before` | `scheduled`)
- `appliedAt`: 예약 날짜
- `announcementStatus`: 발표 상태 메시지
- `recruitmentSchedule`: 모집 일정

## 📦 각 카드 타입별 특징

### CampaignPendingCard

- `CampaignAppliedCard`를 상단 컨텐츠로 표시
- 신청 취소 기능 제공

### CampaignSelectedCard

- 방문 상태에 따라 다른 UI 표시
  - `before`: 체험 방문할 날짜 설정 버튼 show
  - `scheduled`: 예약 날짜 및 케밥 메뉴 버튼 & 체험 정보 및 후기 미션 바텀 시트 show
- `ReservationBottomSheet`를 통한 예약 관리 (날짜 변경, 취소)
- `CampaignSelectedCardFooter`로 추가 정보 표시

### CampaignRejectedCard

- 모집 인원 정보 표시

### CampaignReviewedCard

- 후기 상태에 따라 다른 UI 표시 (후기 미작성, 후기 검토, 후기 작성 완료, 후기 완료, 후기 수정요청)
- `CampaignReviewedCardFooter`로 후기 관련 액션 제공

### CampaignCompletedCard

- 완료된 체험 정보 표시
- 후기 상태 표시

## ⚠️ 주의사항

1. **타입 일치**: `type` prop은 `Application`의 상태와 일치해야 합니다.
2. **데이터 준비**: 각 카드 컴포넌트는 내부적으로 `useCampaignCardData`를 사용하므로 직접 데이터를 전달할 필요가 없습니다.
3. **조건부 렌더링**: 일부 카드 컴포넌트는 조건부로 하단 컨텐츠를 렌더링합니다.

## 🔗 관련 컴포넌트

- [CampaignCardWrapper](../CampaignCardWrapper/README.md)
- [CampaignStatusLabel](../CampaignStatusLabel/README.md)
- [ReservationBottomSheet](../ReservationBottomSheet/README.md)
