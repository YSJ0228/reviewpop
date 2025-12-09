# CampaignCompletedCard 컴포넌트

## 개요

`CampaignCompletedCard`는 체험 완료 상태의 카드를 표시하는 컴포넌트입니다. 후기 상태가 `reviewed`인 완료된 체험에 대한 정보를 보여주며, 후기 상태 라벨과 함께 `CampaignReviewedCardFooter`를 통해 후기 관련 정보를 제공합니다.

## 주요 기능

- 체험 완료 상태 카드 렌더링
- 후기 상태 라벨 표시 (`reviewStatus` 기반)
- `CampaignReviewedCardFooter`를 통한 후기 상태별 하단 정보 제공
- `CampaignCardWrapper`를 통한 공통 UI 구조 제공

## 사용 방법

```typescript
import { CampaignCompletedCard } from '@features/history/components/CampaignCard/CampaignCompletedCard';
import type { Application } from '@entities/application';

<CampaignCompletedCard application={application} />
```

## Props

| Prop          | Type          | Required | 설명           |
| ------------- | ------------- | -------- | -------------- |
| `application` | `Application` | ✅       | 체험 신청 정보 |

## 특징

- `isSelected={true}`로 설정되어 선정된 체험임을 표시
- `reviewStatus`가 존재하는 경우에만 후기 상태 라벨과 Footer를 렌더링
- `CampaignStatusLabel`을 통해 완료 상태를 표시

## 관련 컴포넌트

- [CampaignCardWrapper](../../CampaignCardWrapper/README.md) - 공통 래퍼 컴포넌트
- [CampaignStatusLabel](../../CampaignStatusLabel/README.md) - 상태 라벨 컴포넌트
- [CampaignReviewedCardFooter](../CampaignReviewedCard/CampaignReviewedCardFooter/index.tsx) - 후기 상태별 하단 컴포넌트
