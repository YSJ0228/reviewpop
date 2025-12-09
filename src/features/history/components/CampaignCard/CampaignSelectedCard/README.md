# CampaignSelectedCard 컴포넌트

## 개요

`CampaignSelectedCard`는 선정 탭에서 사용되는 카드 컴포넌트입니다. 선정된 체험에 대해 방문 상태(`visitStatus`)에 따라 다른 UI를 제공하며, 예약 관리 기능과 체험 정보를 표시합니다.

## 주요 기능

- 선정 탭 전용 카드 렌더링
- 방문 상태(`before`, `scheduled`)에 따른 조건부 UI 렌더링
- 예약 관리 기능 (예약 날짜 변경, 예약 취소)
- `ReservationBottomSheet`를 통한 예약 관리 모달 제공
- `CampaignSelectedCardFooter`를 통한 방문 상태별 하단 정보 제공
- `CampaignCardWrapper`를 통한 공통 UI 구조 제공

## 사용 방법

```typescript
import { CampaignSelectedCard } from '@features/history/components/CampaignCard/CampaignSelectedCard';
import type { Application } from '@entities/application';

<CampaignSelectedCard application={application} />
```

## Props

| Prop          | Type          | Required | 설명           |
| ------------- | ------------- | -------- | -------------- |
| `application` | `Application` | ✅       | 체험 신청 정보 |

## 특징

- `isSelected={true}`로 설정되어 선정된 체험임을 표시
- `visitStatus`에 따라 다른 `topContent` 렌더링:
  - `scheduled`: 방문 예정 날짜와 예약 관리 케밥 버튼 표시
  - `before`: "선정됨" 텍스트 표시
- `CampaignStatusLabel`을 통해 선정 상태와 방문 상태를 표시
- `CampaignSelectedCardFooter`는 방문 상태에 따라 다음 컴포넌트를 렌더링:
  - `before`: `ReservationBeforeCard` (방문 전 - 예약 날짜 설정 버튼)
  - `scheduled`: `ReservationScheduledCard` (방문 예정 - 체험 정보 및 미션 표시)
- `ReservationBottomSheet`를 통한 예약 날짜 변경 및 취소 기능 제공

## 관련 컴포넌트

- [CampaignCardWrapper](../../CampaignCardWrapper/README.md) - 공통 래퍼 컴포넌트
- [CampaignStatusLabel](../../CampaignStatusLabel/README.md) - 상태 라벨 컴포넌트
- [CampaignSelectedCardFooter](./CampaignSelectedCardFooter/index.tsx) - 방문 상태별 하단 컴포넌트
  - [ReservationBeforeCard](./ReservationBeforeCard/index.tsx) - 방문 전 카드 (`visitStatus`: `before`)
  - [ReservationScheduledCard](./ReservationScheduledCard/index.tsx) - 방문 예정 카드 (`visitStatus`: `scheduled`)
- [ReservationBottomSheet](../../ReservationBottomSheet/README.md) - 예약 관리 바텀시트
