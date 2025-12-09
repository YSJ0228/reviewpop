# CampaignReviewedCardFooter 컴포넌트

## 개요

`CampaignReviewedCardFooter`는 후기 탭 카드의 하단 컴포넌트입니다. 후기 상태(`reviewStatus`)에 따라 적절한 하위 컴포넌트를 렌더링하는 라우터 역할을 합니다.

## 주요 기능

- 후기 상태에 따른 조건부 렌더링
- 후기 미등록 상태: 후기 작성 안내 및 버튼 제공
- 후기 검토 중 상태: 검토 중 메시지 표시
- 후기 수정 요청 상태: 수정 요청 안내 및 수정 버튼 제공
- 후기 등록 완료 상태: 완료 메시지 표시

## 사용 방법

```typescript
import { CampaignReviewedCardFooter } from '@features/history/components/CampaignCard/CampaignReviewedCard/CampaignReviewedCardFooter';

<CampaignReviewedCardFooter
  reviewStatus="reviewPending"
  campaignStatus="ongoing"
  campaignId="campaign-123"
  applicationId="app-456"
  reviewId="review-789"
/>
```

## Props

| Prop             | Type                          | Required | 설명                                    |
| ---------------- | ----------------------------- | -------- | --------------------------------------- |
| `reviewStatus`   | `ReviewStatus \| undefined`   | ✅       | 후기 상태                               |
| `campaignStatus` | `CampaignStatus \| undefined` | ✅       | 캠페인 상태 (체험 상태)                 |
| `campaignId`     | `string`                      | ❌       | 캠페인 ID (후기 미등록 상태일 때 필요)  |
| `applicationId`  | `string`                      | ❌       | 신청 ID (후기 미등록 상태일 때 필요)    |
| `reviewId`       | `string`                      | ❌       | 후기 ID (후기 수정 요청 상태일 때 필요) |

## 후기 상태별 렌더링

- **`notReviewed` 또는 `visited`**: `ReviewNotRegisteredCard` 렌더링
  - `campaignId`와 `applicationId`가 모두 있어야 렌더링됨
  - 후기 작성 안내 및 후기 작성 버튼 제공

- **`reviewPending`**: `ReviewPendingCard` 렌더링
  - 후기 검토 중 메시지 표시

- **`requiredForEditing`**: `ReviewEditRequestCard` 렌더링
  - 후기 수정 요청 안내 및 수정 버튼 제공
  - `campaignId`, `reviewId`, `applicationId` 필요

- **`reviewed`**: `ReviewCompletedCard` 렌더링
  - 후기 등록 완료 메시지 표시

- **`reviewStatus`가 `undefined`인 경우**: `null` 반환

## 특징

- 후기 상태에 따라 적절한 하위 컴포넌트를 자동으로 선택하여 렌더링
- 각 상태별로 필요한 props가 다르므로, 사용 시 상태에 맞는 props를 제공해야 함
- 조건부 렌더링을 통해 불필요한 컴포넌트 렌더링 방지

## 관련 컴포넌트

- [CampaignReviewedCard](../README.md) - 후기 탭 카드 컴포넌트
- [ReviewNotRegisteredCard](../ReviewNotRegisteredCard/index.tsx) - 후기 미등록 카드
- [ReviewPendingCard](../ReviewPendingCard/index.tsx) - 후기 검토 중 카드
- [ReviewEditRequestCard](../ReviewEditRequestCard/index.tsx) - 후기 수정 요청 카드
- [ReviewCompletedCard](../ReviewCompletedCard/index.tsx) - 후기 등록 완료 카드
