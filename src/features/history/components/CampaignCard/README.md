# CampaignCard 컴포넌트

## 개요

`CampaignCard`는 체험 신청 상태에 따라 다른 UI를 보여주는 카드 컴포넌트입니다. `Application`과 `TCardType`을 받아 적절한 카드 컴포넌트를 렌더링하는 라우터 역할을 합니다.

## 주요 기능

- 체험 신청 상태(`pending`, `selected`, `rejected`, `reviewed`, `completed`)에 따라 적절한 카드 컴포넌트 렌더링
- 각 카드 타입별 특화된 UI 및 기능 제공
- `CampaignCardWrapper`를 통한 공통 UI 구조 제공

## 사용 방법

```typescript
import { CampaignCard } from '@features/history/components/CampaignCard';
import type { Application } from '@entities/application';
import type { TCardType } from '@features/history/constants';

<CampaignCard
  application={application}
  type="selected" // 'pending' | 'selected' | 'rejected' | 'reviewed' | 'completed'
/>
```

## Props

| Prop          | Type          | Required | 설명           |
| ------------- | ------------- | -------- | -------------- |
| `application` | `Application` | ✅       | 체험 신청 정보 |
| `type`        | `TCardType`   | ✅       | 카드 타입      |

## 카드 타입별 특징

- **pending**: 신청 중 상태, 신청 취소 기능 제공
- **selected**: 선정됨 상태, 예약 관리 및 체험 정보 표시
- **rejected**: 미선정 상태, 모집 인원 정보 표시
- **reviewed**: 후기 작성 중 상태, 후기 상태별 UI 제공
- **completed**: 완료 상태, 완료된 체험 정보 표시

## 관련 컴포넌트

- [CampaignCardWrapper](../CampaignCardWrapper/README.md) - 공통 래퍼 컴포넌트
- [CampaignStatusLabel](../CampaignStatusLabel/README.md) - 상태 라벨 컴포넌트
