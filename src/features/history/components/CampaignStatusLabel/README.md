# CampaignStatusLabel 컴포넌트

## 📌 개요

`CampaignStatusLabel`은 `CampaignCard`의 상태에 따라 적절한 상태 라벨을 표시하는 컴포넌트입니다.
카드 타입(`type`)에 따라 방문 상태 또는 후기 상태를 표시하며, `CampaignCardWrapper`의 `statusLabel` prop으로 사용됩니다.

## 🎯 주요 기능

- **조건부 렌더링**: 카드 타입에 따라 다른 상태 라벨 표시
- **SELECTED 타입**: 방문 상태 라벨 표시 (`방문 전`, `방문 예정`)
- **REVIEWED/COMPLETED 타입**: 후기 상태 및 방문 날짜 표시
- **특수 케이스 처리**: 체험이 종료되었지만 후기 미등록인 경우 "체험 종료" 표시

## 📝 사용 방법

```typescript
import { CampaignStatusLabel } from '@features/history/components/CampaignStatusLabel';
import { useCampaignCardData } from '@features/history/hooks/useCampaignCardData';
import type { Application } from '@entities/application';

const { campaign, visitStatus } = useCampaignCardData(application);

<CampaignStatusLabel
  type="selected"
  visitStatus={visitStatus}
  reviewStatus={application.reviewStatus}
  reservationDate={application.reservationDate}
  campaignStatus={campaign.status}
/>
```

## 🔧 Props

| Prop              | Type                          | Required | Default | 설명                                                                   |
| ----------------- | ----------------------------- | -------- | ------- | ---------------------------------------------------------------------- |
| `type`            | `TCardType`                   | ✅       | -       | 카드 타입 (`pending`, `selected`, `rejected`, `reviewed`, `completed`) |
| `visitStatus`     | `VisitStatus \| undefined`    | ❌       | -       | 방문 상태 (`before`, `scheduled`) - SELECTED 타입에서 사용             |
| `reviewStatus`    | `ReviewStatus \| undefined`   | ❌       | -       | 후기 상태 - REVIEWED/COMPLETED 타입에서 사용                           |
| `reservationDate` | `string \| undefined`         | ❌       | -       | 예약 날짜 (ISO 문자열) - 방문 날짜 표시에 사용                         |
| `campaignStatus`  | `CampaignStatus \| undefined` | ❌       | -       | 캠페인 상태 - 특수 케이스 처리에 사용                                  |

## 📦 컴포넌트 구조

```
CampaignStatusLabel/
├── index.tsx              # 메인 컴포넌트
├── type.ts                # 타입 정의
├── style.module.scss      # 스타일 정의
└── README.md              # 문서
```

## 🎨 렌더링 로직

### SELECTED 타입

`type === 'selected'`이고 `visitStatus`가 존재할 때 방문 상태 라벨을 표시합니다.

```typescript
// visitStatus === 'before' → "방문 전"
// visitStatus === 'scheduled' → "방문 예정"
```

**렌더링 예시:**

```tsx
<div className={styles.CampaignStatusLabel}>
  <p>방문 전</p>
</div>
```

### REVIEWED/COMPLETED 타입

`type === 'reviewed'` 또는 `type === 'completed'`이고 `reviewStatus`가 존재할 때 후기 상태 및 방문 날짜를 표시합니다.

**특수 케이스:**

- `reviewStatus === 'notReviewed'`이고 `campaignStatus === 'closed'`인 경우 → "체험 종료" 표시
- 그 외의 경우 → `STATUS_REVIEW_TITLES[reviewStatus]` 값 표시

**렌더링 예시:**

```tsx
<div className={styles['CampaignStatusLabel--Reviewed']}>
  <span>체험 완료</span>
  <span className={styles.CampaignStatusLabel__ReservationDate}>24.12.25 (수) 오후 2시 방문</span>
</div>
```

### 그 외의 경우

조건에 맞지 않으면 `null`을 반환하여 아무것도 렌더링하지 않습니다.

## 💡 사용 예시

### SELECTED 타입 (CampaignSelectedCard)

```typescript
import { CampaignStatusLabel } from '@features/history/components/CampaignStatusLabel';
import { useCampaignCardData } from '@features/history/hooks/useCampaignCardData';

const { campaign, visitStatus } = useCampaignCardData(application);

<CampaignCardWrapper
  campaign={campaign}
  statusLabel={
    <CampaignStatusLabel
      type="selected"
      visitStatus={visitStatus}
      reviewStatus={application.reviewStatus}
      reservationDate={application.reservationDate}
      campaignStatus={campaign.status}
    />
  }
/>
```

### REVIEWED 타입 (CampaignReviewedCard)

```typescript
<CampaignCardWrapper
  campaign={campaign}
  statusLabel={
    <CampaignStatusLabel
      type="reviewed"
      visitStatus={undefined}
      reviewStatus={application.reviewStatus}
      reservationDate={application.reservationDate}
      campaignStatus={campaign.status}
    />
  }
/>
```

### COMPLETED 타입 (CampaignCompletedCard)

```typescript
<CampaignCardWrapper
  campaign={campaign}
  statusLabel={
    <CampaignStatusLabel
      type="completed"
      visitStatus={undefined}
      reviewStatus={application.reviewStatus}
      reservationDate={application.reservationDate}
      campaignStatus={campaign.status}
    />
  }
/>
```

## 🎨 스타일링

### 기본 스타일 (SELECTED 타입)

- 폰트 크기: 14px
- 폰트 굵기: 700 (Bold)
- 색상: `var(--gray-900)`
- 줄 간격: 1.5
- 자간: -0.02em

### 후기 상태 스타일 (REVIEWED/COMPLETED 타입)

- 컨테이너: Flexbox 레이아웃 (gap: 8px, 중앙 정렬)
- 상태 제목: 기본 스타일과 동일
- 방문 날짜: 폰트 크기 12px, 색상 `var(--gray-600)`, 폰트 굵기 500

## 📊 상태 매핑

### 방문 상태 (STATUS_VISIT)

| 값          | 표시 텍스트 |
| ----------- | ----------- |
| `before`    | 방문 전     |
| `scheduled` | 방문 예정   |

### 후기 상태 제목 (STATUS_REVIEW_TITLES)

| 값                   | 표시 텍스트    |
| -------------------- | -------------- |
| `visited`            | 체험 완료      |
| `notReviewed`        | 방문 완료      |
| `reviewed`           | 체험 종료      |
| `reviewPending`      | 후기 등록 완료 |
| `requiredForEditing` | 후기 등록 완료 |
| `closed`             | 체험 종료      |

**특수 케이스:**

- `reviewStatus === 'notReviewed'` && `campaignStatus === 'closed'` → `closed` 사용

## ⚠️ 주의사항

1. **타입별 필수 Props**:
   - SELECTED 타입: `visitStatus`가 필수입니다.
   - REVIEWED/COMPLETED 타입: `reviewStatus`가 필수입니다.

2. **조건부 렌더링**: 조건에 맞지 않으면 `null`을 반환하므로, 항상 렌더링되는 것을 보장하지 않습니다.

3. **날짜 포맷**: `reservationDate`는 ISO 문자열 형식이어야 하며, `dayjs`를 사용하여 `YY.MM.DD (ddd) A h시` 형식으로 포맷됩니다.

4. **데이터 준비**: `useCampaignCardData` 훅을 통해 준비된 데이터를 사용하는 것을 권장합니다.

5. **접근성**: `aria-label` 속성이 자동으로 설정되어 스크린 리더 사용자를 위한 접근성을 제공합니다.

## 🔗 관련 컴포넌트

- [CampaignCardWrapper](../CampaignCardWrapper/README.md) - 상태 라벨을 포함하는 래퍼 컴포넌트
- [CampaignCard](../CampaignCard/README.md) - 카드 라우터 컴포넌트
- [useCampaignCardData](../../hooks/useCampaignCardData.ts) - 공통 데이터 준비 훅
