# CampaignReviewedCard 컴포넌트

## 개요

`CampaignReviewedCard`는 리뷰 탭에서 사용되는 카드 컴포넌트입니다. 후기 작성이 진행 중이거나 완료된 체험에 대해 후기 상태별로 다른 UI를 제공하며, `CampaignReviewedCardFooter`를 통해 후기 상태에 맞는 하단 컴포넌트를 렌더링합니다.

## 주요 기능

- 리뷰 탭 전용 카드 렌더링
- 후기 상태 라벨 표시 (`reviewStatus` 기반)
- `CampaignReviewedCardFooter`를 통한 후기 상태별 하단 정보 제공
- `CampaignCardWrapper`를 통한 공통 UI 구조 제공

## 사용 방법

```typescript
import { CampaignReviewedCard } from '@features/history/components/CampaignCard/CampaignReviewedCard';
import type { Application } from '@entities/application';

<CampaignReviewedCard application={application} />
```

## Props

| Prop          | Type          | Required | 설명           |
| ------------- | ------------- | -------- | -------------- |
| `application` | `Application` | ✅       | 체험 신청 정보 |

## 특징

- `isSelected={true}`로 설정되어 선정된 체험임을 표시
- `reviewStatus`가 존재하는 경우에만 후기 상태 라벨과 Footer를 렌더링
- `CampaignStatusLabel`을 통해 리뷰 상태를 표시
- `CampaignReviewedCardFooter`는 후기 상태에 따라 다음 컴포넌트를 렌더링:
  - `notReviewed` 또는 `visited`: `ReviewNotRegisteredCard` (후기 미등록)
  - `reviewPending`: `ReviewPendingCard` (후기 검토 중)
  - `requiredForEditing`: `ReviewEditRequestCard` (후기 수정 요청)
  - `reviewed`: `ReviewCompletedCard` (후기 등록 완료)

## 관련 컴포넌트

- [CampaignCardWrapper](../../CampaignCardWrapper/README.md) - 공통 래퍼 컴포넌트
- [CampaignStatusLabel](../../CampaignStatusLabel/README.md) - 상태 라벨 컴포넌트
- [CampaignReviewedCardFooter](./CampaignReviewedCardFooter/index.tsx) - 후기 상태별 하단 컴포넌트
  - [ReviewNotRegisteredCard](./ReviewNotRegisteredCard/index.tsx) - 후기 미등록 카드 (`reviewStatus`: `notReviewed` 또는 `visited`)
  - [ReviewPendingCard](./ReviewPendingCard/index.tsx) - 후기 검토 중 카드 (`reviewStatus`: `reviewPending`)
  - [ReviewEditRequestCard](./ReviewEditRequestCard/index.tsx) - 후기 수정 요청 카드 (`reviewStatus`: `requiredForEditing`)
  - [ReviewCompletedCard](./ReviewCompletedCard/index.tsx) - 후기 등록 완료 카드 (`reviewStatus`: `reviewed`)
