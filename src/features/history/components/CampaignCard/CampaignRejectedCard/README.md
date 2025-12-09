# CampaignRejectedCard 컴포넌트

## 개요

`CampaignRejectedCard`는 미선정된 체험 신청 카드를 표시하는 컴포넌트입니다. 선정되지 않은 체험에 대해 모집 일정과 최대 선정 인원 정보를 하단에 표시합니다.

## 주요 기능

- 미선정 상태 카드 렌더링
- `CampaignRejectedCardFooter`를 통한 모집 일정 및 선정 인원 정보 표시
- `CampaignCardWrapper`를 통한 공통 UI 구조 제공

## 사용 방법

```typescript
import { CampaignRejectedCard } from '@features/history/components/CampaignCard/CampaignRejectedCard';
import type { Application } from '@entities/application';

<CampaignRejectedCard application={application} />
```

## Props

| Prop          | Type          | Required | 설명           |
| ------------- | ------------- | -------- | -------------- |
| `application` | `Application` | ✅       | 체험 신청 정보 |

## 특징

- `CampaignRejectedCardFooter`를 `bottomContent`로 사용하여 모집 일정 정보 표시
- 모집 일정이 없는 경우 Footer를 렌더링하지 않음
- 최대 선정 인원 정보를 함께 표시

## 관련 컴포넌트

- [CampaignCardWrapper](../../CampaignCardWrapper/README.md) - 공통 래퍼 컴포넌트
- [CampaignRejectedCardFooter](./CampaignRejectedCardFooter/index.tsx) - 모집 일정 및 선정 인원 정보 컴포넌트
