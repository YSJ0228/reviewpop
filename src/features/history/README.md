# History Feature (체험 히스토리 기능)

## 📌 개요

사용자의 **체험 참여 히스토리**를 조회하고 관리하는 기능입니다.
신청 중, 선정, 후기 작성 중, 완료된 체험을 탭으로 구분하여 보여줍니다.

## 📁 폴더 구조

```
history/
├── components/          # 히스토리 관련 컴포넌트
│   ├── CampaignCard/    # 체험 카드 컴포넌트 (상태별 카드 타입)
│   │   ├── CampaignAppliedCard/      # 신청 상태 카드
│   │   ├── CampaignPendingCard/     # 신청 중 카드
│   │   ├── CampaignSelectedCard/    # 선정됨 카드
│   │   │   ├── ReservationBeforeCard/      # 방문 전 카드
│   │   │   ├── ReservationScheduledCard/   # 방문 예정 카드
│   │   │   └── CampaignSelectedCardFooter/ # 선정 카드 푸터
│   │   ├── CampaignRejectedCard/    # 미선정 카드
│   │   │   └── CampaignRejectedCardFooter/ # 미선정 카드 푸터
│   │   ├── CampaignReviewedCard/    # 후기 작성 중 카드
│   │   │   ├── ReviewNotRegisteredCard/    # 후기 미등록 카드
│   │   │   ├── ReviewPendingCard/          # 후기 검토 중 카드
│   │   │   ├── ReviewEditRequestCard/      # 후기 수정 요청 카드
│   │   │   ├── ReviewCompletedCard/        # 후기 등록 완료 카드
│   │   │   └── CampaignReviewedCardFooter/ # 후기 카드 푸터
│   │   └── CampaignCompletedCard/   # 완료 카드
│   ├── CampaignList/    # 체험 목록 컴포넌트
│   ├── CampaignTabs/    # 탭 UI 컴포넌트 (메인 진입점)
│   ├── CampaignCardWrapper/  # 카드 공통 래퍼
│   ├── CampaignStatusLabel/  # 상태 라벨 컴포넌트
│   ├── RejectedList/   # 미선정 체험 목록 컴포넌트
│   └── ReservationBottomSheet/  # 예약 관리 바텀시트
├── hooks/               # 히스토리 관련 커스텀 훅
│   ├── useCampaignCardData.ts        # 카드 데이터 준비 훅
│   ├── useCampaignBottomSheetData.ts # 바텀시트 데이터 조회 훅
│   ├── useIsTodayReservation.ts      # 당일 예약 확인 훅
│   ├── useMyCampaign.ts              # 나의 체험 조회 훅
│   └── useReservationActions.ts      # 예약 액션 훅
├── constants.ts         # 상수 정의
├── types.ts             # 타입 정의
└── README.md
```

## 🎯 주요 기능

- **체험 목록 조회 및 탭별 필터링**: 신청, 선정, 후기, 종료 탭으로 체험 상태별 필터링
- **체험 상태별 카드 UI**: `pending`, `selected`, `rejected`, `reviewed`, `completed` 상태에 따른 카드 렌더링
- **방문 상태 관리**: 선정된 체험의 방문 상태 (`before`: 방문 전, `scheduled`: 방문 예정)에 따른 UI 제공
- **예약 관리**: 예약 날짜 변경 및 취소 기능 (방문 예정 상태에서만 가능)
- **후기 상태 관리**: 후기 상태별 UI 제공
  - `visited` / `notReviewed`: 후기 미등록
  - `reviewPending`: 후기 검토 중
  - `requiredForEditing`: 후기 수정 요청
  - `reviewed`: 후기 등록 완료
- **미선정 체험 내역 조회**: 신청 탭에서 미선정된 체험 내역 확인

## 📝 사용 예시

### CampaignTabs 사용 (메인 진입점)

`CampaignTabs`는 체험 히스토리 기능의 메인 컴포넌트로, 탭 UI와 체험 목록을 함께 제공합니다.

```typescript
import { CampaignTabs } from '@features/history';

export default function MyPage() {
  return <CampaignTabs />;
}
```

### CampaignList 사용

특정 상태의 체험 목록만 표시하고 싶을 때 사용합니다.

```typescript
import { CampaignList } from '@features/history';
import type { TabKey } from '@features/history';

export default function MySelectedCampaigns() {
  return <CampaignList status="selected" />;
}
```

### CampaignCard 직접 사용

커스텀 목록에서 개별 카드를 렌더링할 때 사용합니다.

```typescript
import { CampaignCard } from '@features/history';
import type { Application } from '@entities/application';
import type { TCardType } from '@features/history/constants';

function CustomList({ applications }: { applications: Application[] }) {
  return (
    <div>
      {applications.map((application) => (
        <CampaignCard
          key={application.campaign.id}
          application={application}
          type={application.status as TCardType}
        />
      ))}
    </div>
  );
}
```

## 💡 CampaignCard 타입

`CampaignCard`는 체험 신청 상태에 따라 다른 카드 컴포넌트를 렌더링합니다. 각 카드 타입은 `CampaignCardWrapper`를 공통 래퍼로 사용하며, 상태에 맞는 UI를 제공합니다.

| 타입        | 설명         | 주요 기능                                                            | 하위 컴포넌트                                                                                                |
| ----------- | ------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `pending`   | 신청 중      | 신청 취소, 미선정 체험 내역 확인 (있을 경우)                         | `CampaignAppliedCard` (신청 상태 표시 및 취소 버튼)                                                          |
| `rejected`  | 미선정       | 미선정 체험 내역, 모집 일정 및 선정 인원 정보 표시                   | `CampaignRejectedCardFooter` (모집 일정 및 선정 인원 정보)                                                   |
| `selected`  | 선정됨       | 방문 상태에 따른 UI 제공                                             | `CampaignSelectedCardFooter` → `ReservationBeforeCard` (방문 전) 또는 `ReservationScheduledCard` (방문 예정) |
|             |              | - 방문 전: 방문 날짜 설정                                            |                                                                                                              |
|             |              | - 방문 예정: 예약 변경/취소, 체험 정보 및 후기 미션 확인             |                                                                                                              |
| `reviewed`  | 후기 작성 중 | 후기 상태별 UI 제공                                                  | `CampaignReviewedCardFooter` → 후기 상태별 카드:                                                             |
|             |              | - `notReviewed` / `visited`: `ReviewNotRegisteredCard` (후기 미등록) |                                                                                                              |
|             |              | - `reviewPending`: `ReviewPendingCard` (후기 검토 중)                |                                                                                                              |
|             |              | - `requiredForEditing`: `ReviewEditRequestCard` (후기 수정 요청)     |                                                                                                              |
|             |              | - `reviewed`: `ReviewCompletedCard` (후기 등록 완료)                 |                                                                                                              |
| `completed` | 완료         | 완료된 체험 정보 표시, 후기 상태 표시                                | `CampaignReviewedCardFooter` (후기 상태별 하단 정보)                                                         |

### 방문 상태 (VisitStatus)

선정된 체험(`selected`)은 방문 상태에 따라 다른 UI를 제공합니다:

- `before`: 방문 전 - 예약 날짜 설정 버튼 표시
- `scheduled`: 방문 예정 - 예약 날짜 표시, 예약 관리 기능 제공

### 후기 상태 (ReviewStatus)

후기 작성 중(`reviewed`) 및 완료(`completed`) 체험은 후기 상태에 따라 다른 UI를 제공합니다:

- `visited` / `notReviewed`: 후기 미등록 상태
- `reviewPending`: 후기 검토 중 상태
- `requiredForEditing`: 후기 수정 요청 상태
- `reviewed`: 후기 등록 완료 상태
