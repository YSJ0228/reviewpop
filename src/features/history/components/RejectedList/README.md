# RejectedList 컴포넌트

## 개요

`RejectedList`는 미선정된 체험 목록을 표시하는 컴포넌트입니다. `useMyCampaigns` 훅을 통해 데이터를 가져와 `rejected` 상태의 캠페인만 필터링하여 `CampaignCard`로 렌더링합니다.

## 주요 기능

- 미선정된 체험 목록 조회 및 표시
- 로딩 상태 처리 (`LoadingSpinner` 표시)
- 에러 상태 처리 (에러 메시지 표시)
- 빈 상태 처리 (`EmptyState` 컴포넌트 표시)

## 사용 방법

```typescript
import { RejectedList } from '@features/history/components/RejectedList';

<RejectedList />
```

## 동작 방식

1. `useMyCampaigns` 훅을 통해 전체 캠페인 데이터 조회
2. `filterCampaignsByStatus`를 사용하여 `rejected` 상태의 캠페인만 필터링
3. 각 캠페인을 `CampaignCard` 컴포넌트로 렌더링 (type="rejected")

## 상태 처리

- **로딩 중**: `LoadingSpinner` 컴포넌트 표시
- **에러 발생**: 에러 메시지 표시
- **빈 목록**: `EmptyState` 컴포넌트 표시 (variant="no-selected")

## 관련 컴포넌트

- [CampaignCard](../CampaignCard/README.md) - 개별 캠페인 카드 컴포넌트
- [useMyCampaigns](../../../entities/history/hooks/useMyCampaigns.ts) - 캠페인 데이터 조회 훅
