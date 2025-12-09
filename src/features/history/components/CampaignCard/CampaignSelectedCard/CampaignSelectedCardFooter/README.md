# CampaignSelectedCardFooter 컴포넌트

## 개요

`CampaignSelectedCardFooter`는 선정된 체험 카드의 액션 영역 컴포넌트입니다. 방문 상태(`visitStatus`)에 따라 적절한 하위 컴포넌트를 렌더링하는 라우터 역할을 하며, 예약 관리 기능을 제공합니다.

## 주요 기능

- 방문 상태에 따른 조건부 렌더링
- 방문 전 상태: 예약 날짜 설정 버튼 제공
- 방문 예정 상태: 체험 정보 및 미션 표시
- 예약 날짜 설정 페이지로 이동하는 핸들러 제공

## 사용 방법

```typescript
import { CampaignSelectedCardFooter } from '@features/history/components/CampaignCard/CampaignSelectedCard/CampaignSelectedCardFooter';
import type { CampaignDetail } from '@entities/campaign/types/campaign.types';
import type { Application } from '@entities/application';
import type { VisitStatus } from '@features/history/types';

<CampaignSelectedCardFooter
  campaign={campaign}
  visitStatus="before"
  application={application}
/>
```

## Props

| Prop          | Type             | Required | 설명           |
| ------------- | ---------------- | -------- | -------------- |
| `campaign`    | `CampaignDetail` | ✅       | 캠페인 정보    |
| `visitStatus` | `VisitStatus`    | ✅       | 방문 상태      |
| `application` | `Application`    | ✅       | 체험 신청 정보 |

## 방문 상태별 렌더링

- **`before`**: `ReservationBeforeCard` 렌더링
  - 예약 날짜 설정 버튼 표시
  - 버튼 클릭 시 예약 날짜 설정 페이지(`/campaign/{campaignId}/reserve`)로 이동
  - Zustand store를 통해 예약 폼 데이터 초기화 및 설정

- **`scheduled`**: `ReservationScheduledCard` 렌더링
  - 체험 정보 및 미션 표시
  - 제공자 혜택 및 리뷰 미션 정보 제공

## 특징

- 방문 상태에 따라 적절한 하위 컴포넌트를 자동으로 선택하여 렌더링
- 예약 날짜 설정 시 Zustand store를 사용하여 상태 관리
- 예약 폼 데이터를 초기화한 후 새로운 예약 정보로 설정
- 라우터를 사용하여 예약 페이지로 이동

## 관련 컴포넌트

- [CampaignSelectedCard](../README.md) - 선정 탭 카드 컴포넌트
- [ReservationBeforeCard](../ReservationBeforeCard/index.tsx) - 방문 전 카드
- [ReservationScheduledCard](../ReservationScheduledCard/index.tsx) - 방문 예정 카드
