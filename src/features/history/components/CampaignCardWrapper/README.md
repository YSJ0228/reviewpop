# CampaignCardWrapper 컴포넌트

## 개요

`CampaignCardWrapper`는 모든 `CampaignCard` 타입이 공통으로 사용하는 래퍼 컴포넌트입니다. `SharedCampaignCard`를 래핑하여 공통 UI를 제공하고, 캠페인 상세 페이지로 이동하는 Link 기능을 제공합니다.

## 주요 기능

- `SharedCampaignCard`를 래핑하여 일관된 카드 UI 제공
- 캠페인 상세 페이지(`/campaign/${campaign.id}`)로 이동하는 Link 제공
- `statusLabel`, `topContent`, `bottomContent` 슬롯을 통한 유연한 컨텐츠 주입
- `isSelected` prop을 통한 선택 상태에 따른 스타일 변경

## 사용 방법

```typescript
import { CampaignCardWrapper } from '@features/history/components/CampaignCardWrapper';
import { CampaignStatusLabel } from '@features/history/components/CampaignStatusLabel';

<CampaignCardWrapper
  campaign={campaign}
  statusLabel={<CampaignStatusLabel type="selected" visitStatus={visitStatus} />}
  topContent={<div>상단 컨텐츠</div>}
  bottomContent={<div>하단 컨텐츠</div>}
  isSelected={true}
/>
```

## Props

| Prop            | Type             | Required | Default | 설명                                     |
| --------------- | ---------------- | -------- | ------- | ---------------------------------------- |
| `campaign`      | `CampaignDetail` | ✅       | -       | 캠페인 정보                              |
| `statusLabel`   | `ReactNode`      | ❌       | -       | 상태 라벨 컴포넌트                       |
| `topContent`    | `ReactNode`      | ❌       | -       | 상단 컨텐츠 (브랜드명 위에 표시)         |
| `bottomContent` | `ReactNode`      | ❌       | -       | 하단 컨텐츠 (제목 아래에 표시)           |
| `isSelected`    | `boolean`        | ❌       | `false` | 선택 여부 (true일 경우 하단 border 제거) |

## 관련 컴포넌트

- [SharedCampaignCard](../../../../shared/components/SharedCampaignCard/README.md) - 공통 캠페인 카드 컴포넌트
- [CampaignStatusLabel](../CampaignStatusLabel/README.md) - 상태 라벨 컴포넌트
