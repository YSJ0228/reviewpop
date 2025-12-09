# CampaignStatusLabel 컴포넌트

## 개요

`CampaignStatusLabel`은 `CampaignCard`의 상태에 따라 적절한 상태 라벨을 표시하는 컴포넌트입니다. 카드 타입에 따라 방문 상태 또는 후기 상태를 표시하며, `CampaignCardWrapper`의 `statusLabel` prop으로 사용됩니다.

## 주요 기능

- 카드 타입에 따라 다른 상태 라벨 표시
- **SELECTED 타입**: 방문 상태 라벨 표시 (`방문 전`, `방문 예정`)
- **REVIEWED/COMPLETED 타입**: 후기 상태 및 방문 날짜 표시
- 체험이 종료되었지만 후기 미등록인 경우 "체험 종료" 표시

## 사용 방법

```typescript
import { CampaignStatusLabel } from '@features/history/components/CampaignStatusLabel';

<CampaignStatusLabel
  type="selected"
  visitStatus={visitStatus}
  reviewStatus={application.reviewStatus}
  reservationDate={application.reservationDate}
  campaignStatus={campaign.status}
/>
```

## Props

| Prop              | Type                          | Required | 설명                                                                   |
| ----------------- | ----------------------------- | -------- | ---------------------------------------------------------------------- |
| `type`            | `TCardType`                   | ✅       | 카드 타입 (`pending`, `selected`, `rejected`, `reviewed`, `completed`) |
| `visitStatus`     | `VisitStatus \| undefined`    | ❌       | 방문 상태 (`before`, `scheduled`) - SELECTED 타입에서 사용             |
| `reviewStatus`    | `ReviewStatus \| undefined`   | ❌       | 후기 상태 - REVIEWED/COMPLETED 타입에서 사용                           |
| `reservationDate` | `string \| undefined`         | ❌       | 예약 날짜 (ISO 문자열) - 방문 날짜 표시에 사용                         |
| `campaignStatus`  | `CampaignStatus \| undefined` | ❌       | 캠페인 상태 - 특수 케이스 처리에 사용                                  |

## 렌더링 로직

- **SELECTED 타입**: `visitStatus`가 존재할 때 방문 상태 라벨 표시
- **REVIEWED/COMPLETED 타입**: `reviewStatus`가 존재할 때 후기 상태 및 방문 날짜 표시
- 조건에 맞지 않으면 `null` 반환

## 관련 컴포넌트

- [CampaignCardWrapper](../CampaignCardWrapper/README.md) - 상태 라벨을 포함하는 래퍼 컴포넌트
- [CampaignCard](../CampaignCard/README.md) - 카드 라우터 컴포넌트
