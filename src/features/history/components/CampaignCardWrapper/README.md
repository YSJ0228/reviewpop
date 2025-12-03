# CampaignCardWrapper 컴포넌트

## 📌 개요

`CampaignCardWrapper`는 모든 `CampaignCard` 타입이 공통으로 사용하는 래퍼 컴포넌트입니다.
`SharedCampaignCard`를 래핑하여 공통 UI를 제공하고, 캠페인 상세 페이지로 이동하는 Link 기능을 제공합니다.

## 🎯 주요 기능

- **공통 UI 제공**: `SharedCampaignCard`를 래핑하여 일관된 카드 UI 제공
- **네비게이션**: 캠페인 상세 페이지(`/campaign/${campaign.id}`)로 이동하는 Link 제공
- **슬롯 지원**: `statusLabel`, `topContent`, `bottomContent`를 통한 유연한 컨텐츠 주입
- **조건부 스타일링**: `isSelected` prop을 통한 선택 상태에 따른 스타일 변경

## 📝 사용 방법

```typescript
import { CampaignCardWrapper } from '@features/history/components/CampaignCardWrapper';
import { CampaignStatusLabel } from '@features/history/components/CampaignStatusLabel';
import type { CampaignDetail } from '@features/campaign';

const campaign: CampaignDetail = {
  id: '1',
  thumbnail: '/images/campaign.jpg',
  brand: '브랜드명',
  providedItem: '제공 상품명',
  // ... 기타 캠페인 정보
};

<CampaignCardWrapper
  campaign={campaign}
  statusLabel={<CampaignStatusLabel type="selected" />}
  topContent={<div>상단 컨텐츠</div>}
  bottomContent={<div>하단 컨텐츠</div>}
  isSelected={true}
/>
```

## 🔧 Props

| Prop            | Type             | Required | Default | 설명                                         |
| --------------- | ---------------- | -------- | ------- | -------------------------------------------- |
| `campaign`      | `CampaignDetail` | ✅       | -       | 캠페인 정보                                  |
| `statusLabel`   | `ReactNode`      | ❌       | -       | 상태 라벨 컴포넌트 (예: CampaignStatusLabel) |
| `topContent`    | `ReactNode`      | ❌       | -       | 상단 컨텐츠 (브랜드명 위에 표시)             |
| `bottomContent` | `ReactNode`      | ❌       | -       | 하단 컨텐츠 (제목 아래에 표시)               |
| `isSelected`    | `boolean`        | ❌       | `false` | 선택 여부 (true일 경우 하단 border 제거)     |

## 📦 컴포넌트 구조

```
CampaignCardWrapper/
├── index.tsx              # 메인 컴포넌트
├── types.ts               # 타입 정의
├── style.module.scss      # 스타일 정의
└── README.md              # 문서
```

## 🎨 스타일링

- **기본 스타일**: 하단에 1px border 적용 (`border-bottom: 1px solid var(--gray-50)`)
- **선택 상태**: `isSelected={true}`일 경우 하단 border 제거 (`CampaignCardWrapper__Link--NoBorder`)

## 💡 사용 예시

### 기본 사용 (CampaignPendingCard)

```typescript
<CampaignCardWrapper
  campaign={campaign}
  topContent={<CampaignAppliedCard announcementStatus={announcementStatus} />}
/>
```

### 상태 라벨 포함 (CampaignSelectedCard)

```typescript
<CampaignCardWrapper
  campaign={campaign}
  isSelected={true}
  statusLabel={
    <CampaignStatusLabel
      type="selected"
      visitStatus={visitStatus}
      reviewStatus={application.reviewStatus}
      reservationDate={application.reservationDate}
      campaignStatus={campaign.status}
    />
  }
  topContent={getTopContent()}
/>
```

### 하단 컨텐츠 포함

```typescript
<CampaignCardWrapper
  campaign={campaign}
  bottomContent={<CampaignCardFooter campaign={campaign} />}
/>
```

## 🔗 관련 컴포넌트

- [SharedCampaignCard](../../../../shared/components/SharedCampaignCard/README.md) - 공통 캠페인 카드 컴포넌트
- [CampaignStatusLabel](../CampaignStatusLabel/README.md) - 상태 라벨 컴포넌트
- [CampaignCard](../CampaignCard/README.md) - 카드 라우터 컴포넌트

## ⚠️ 주의사항

1. **Link 동작**: 카드 전체가 클릭 가능한 Link로 동작합니다. 내부 버튼 클릭 시 `e.preventDefault()` 및 `e.stopPropagation()`을 사용하여 Link 동작을 방지해야 합니다.

2. **슬롯 컨텐츠**: `topContent`와 `bottomContent`는 선택적이지만, 각 카드 타입에 맞는 적절한 컨텐츠를 제공해야 합니다.

3. **선택 상태**: `isSelected` prop은 주로 선정된 카드에서 사용되며, 하단 border를 제거하여 시각적 구분을 제공합니다.

4. **데이터 준비**: `campaign` prop은 `CampaignDetail` 타입을 준수해야 하며, `useCampaignCardData` 훅을 통해 준비된 데이터를 사용하는 것을 권장합니다.
