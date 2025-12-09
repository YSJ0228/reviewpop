# CampaignPendingCard 컴포넌트

## 개요

`CampaignPendingCard`는 후기 작성 전 상태의 체험 신청 카드를 표시하는 컴포넌트입니다. `visited` 또는 `notReviewed` 상태의 체험에 대해 신청 상태 정보와 신청 취소 기능을 제공합니다.

## 주요 기능

- 후기 작성 전 상태 카드 렌더링
- `CampaignAppliedCard`를 통한 신청 상태 표시 및 신청 취소 기능 제공
- `CampaignCardWrapper`를 통한 공통 UI 구조 제공

## 사용 방법

```typescript
import { CampaignPendingCard } from '@features/history/components/CampaignCard/CampaignPendingCard';
import type { Application } from '@entities/application';

<CampaignPendingCard application={application} />
```

## Props

| Prop          | Type          | Required | 설명           |
| ------------- | ------------- | -------- | -------------- |
| `application` | `Application` | ✅       | 체험 신청 정보 |

## 특징

- `CampaignAppliedCard`를 `topContent`로 사용하여 신청 상태와 취소 버튼 제공
- 신청 취소 시 모달을 통한 확인 절차 제공
- `announcementStatus`를 통해 현재 신청 상태를 표시

## 관련 컴포넌트

- [CampaignCardWrapper](../../CampaignCardWrapper/README.md) - 공통 래퍼 컴포넌트
- [CampaignAppliedCard](../CampaignAppliedCard/index.tsx) - 신청 상태 표시 및 취소 기능 컴포넌트
