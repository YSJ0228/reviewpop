# History Feature (체험 히스토리 기능)

## 📌 개요

사용자의 **체험 참여 히스토리**를 조회하고 관리하는 기능입니다.
신청 중, 선정, 후기 작성 중, 완료된 체험을 탭으로 구분하여 보여줍니다.

## 📁 폴더 구조

```
history/
├── components/          # 히스토리 관련 컴포넌트
│   ├── CampaignCard/    # 체험 카드 컴포넌트 (상태별 카드 타입)
│   ├── CampaignList/    # 체험 목록 컴포넌트
│   ├── CampaignTabs/    # 탭 UI 컴포넌트
│   ├── CampaignCardWrapper/  # 카드 공통 래퍼
│   ├── CampaignStatusLabel/  # 상태 라벨 컴포넌트
│   └── ReservationBottomSheet/  # 예약 관리 바텀시트
├── hooks/               # 히스토리 관련 커스텀 훅
│   ├── useCampaignCardData.ts  # 카드 데이터 준비 훅
│   ├── useReservationActions.ts  # 예약 액션 훅
│   └── ...
├── constants.ts         # 상수 정의
└── README.md
```

## 🎯 주요 기능

- 체험 목록 조회 및 탭별 필터링
- 체험 상태별 카드 UI (`pending`, `selected`, `rejected`, `reviewed`, `completed`)
- 예약 관리 (날짜 변경, 취소)
- 후기 상태 관리

## 📝 사용 예시

### CampaignTabs 사용

```typescript
import { CampaignTabs } from '@features/history';

export default function MyPage() {
  return <CampaignTabs />;
}
```

### CampaignList 사용

```typescript
import { CampaignList } from '@features/history';

export default function MyCampaigns() {
  return <CampaignList status="selected" />;
}
```

### CampaignCard 직접 사용

```typescript
import { CampaignCard } from '@features/history';
import type { Application } from '@entities/application';

function CustomList({ applications }: { applications: Application[] }) {
  return (
    <div>
      {applications.map((application) => (
        <CampaignCard
          key={application.campaign.id}
          application={application}
          type={application.status}
        />
      ))}
    </div>
  );
}
```

## 💡 CampaignCard 타입

`CampaignCard`는 체험 신청 상태에 따라 다른 카드 컴포넌트를 렌더링합니다:

| 타입        | 설명         | 주요 기능                                                                                     |
| ----------- | ------------ | --------------------------------------------------------------------------------------------- |
| `pending`   | 신청 중      | 신청 취소 , 미선정 체험 내역 확인 (있을 경우)                                                 |
| `rejected`  | 미선정       | 미선정 체험 내역                                                                              |
| `selected`  | 선정됨       | 예약 변경 및 취소(방문 예정), 체험 정보 및 후기 미션 확인(방문 예정) ,방문 날짜 설정(방문 전) |
| `reviewed`  | 후기 작성 중 | 후기 상태 표시, 후기 등록/수정                                                                |
| `completed` | 완료         | 완료된 체험 정보 표시                                                                         |

각 카드 타입은 `CampaignCardWrapper`를 공통 래퍼로 사용하며, 상태에 맞는 UI를 제공합니다.
