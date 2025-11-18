# History Feature (체험 히스토리 기능)

## 📌 이 폴더는 무엇인가요?

사용자의 **체험 참여 히스토리**를 조회하고 관리하는 기능을 담당하는 폴더입니다.
신청 중, 진행 중, 완료된 체험을 탭으로 구분하여 보여줍니다.

## 📁 폴더 구조

```
history/
├── components/          # 히스토리 관련 컴포넌트
│   ├── CampaignCard/    # 체험 카드 컴포넌트
│   ├── CampaignList/    # 체험 목록 컴포넌트
│   └── CampaignTabs/    # 탭 UI 컴포넌트
├── hooks/               # 히스토리 관련 커스텀 훅
│   ├── useCampaigns.ts       # 체험 목록 조회
│   └── useCampaignDetail.ts  # 체험 상세 조회
├── types/               # 히스토리 관련 타입
│   └── campaign.types.ts
└── README.md
```

## 🎯 주요 기능

- [x] 체험 목록 조회 (탭별 필터링)
- [x] 체험 상세 조회
- [x] 체험 상태별 분류
  - `applying`: 신청 중
  - `selected`: 선정됨
  - `reviewing`: 리뷰 작성 중
  - `completed`: 완료
- [ ] 체험 검색 (향후 추가 예정)

## 📝 사용 예시

### 1. 체험 목록 조회

```typescript
import { useCampaigns } from '@features/history';

function HistoryPage() {
  const { data: campaigns, isLoading } = useCampaigns({
    status: 'selected', // 선정된 체험만 조회
  });

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div>
      {campaigns?.map((campaign) => (
        <div key={campaign.id}>{campaign.title}</div>
      ))}
    </div>
  );
}
```

### 2. 체험 상세 조회

```typescript
import { useCampaignDetail } from '@features/history';

function CampaignDetailPage({ campaignId }: { campaignId: string }) {
  const { data: campaign, isLoading } = useCampaignDetail(campaignId);

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>{campaign.title}</h1>
      <p>{campaign.description}</p>
      <p>상태: {campaign.status}</p>
    </div>
  );
}
```

### 3. 체험 목록 컴포넌트 사용

```typescript
import { CampaignList } from '@features/history';

export default function MyPage() {
  return (
    <div>
      <h1>내 체험</h1>
      <CampaignList status="selected" />
    </div>
  );
}
```

### 4. 탭으로 상태별 분류

```typescript
import { CampaignTabs } from '@features/history';

export default function HistoryPage() {
  return (
    <div>
      <h1>체험 히스토리</h1>
      <CampaignTabs />
    </div>
  );
}
```

## 💡 체험 상태 (Status) 이해하기

### 상태 종류

| 상태        | 설명                       | 사용자가 할 일         |
| ----------- | -------------------------- | ---------------------- |
| `applying`  | 체험 신청 중               | 선정 대기              |
| `selected`  | 선정됨                     | 제품 수령 후 리뷰 작성 |
| `reviewing` | 리뷰 작성 중               | 리뷰 완성 및 제출      |
| `completed` | 체험 완료 (리뷰 제출 완료) | 추가 작업 없음         |

### 상태별 UI 표시

```typescript
import { STATUS_LABELS, STATUS_DESCRIPTIONS } from '@features/history';

function CampaignStatus({ status }: { status: CampaignStatus }) {
  return (
    <div>
      <span>{STATUS_LABELS[status]}</span>
      <p>{STATUS_DESCRIPTIONS[status]}</p>
    </div>
  );
}
```

## 🗂 탭 구성

```typescript
import { TAB_CONFIG } from '@features/history';

// TAB_CONFIG 내용:
// {
//   all: { label: '전체', key: 'all' },
//   selected: { label: '선정', key: 'selected' },
//   reviewing: { label: '리뷰 작성 중', key: 'reviewing' },
//   completed: { label: '완료', key: 'completed' }
// }
```

## ❌ 자주 하는 실수

### 실수 1: 상태(status) 값을 하드코딩

```typescript
// ❌ 잘못된 예 - 오타 발생 가능!
const { data } = useCampaigns({ status: 'selectd' }); // 'selected' 오타!

// ✅ 올바른 예 - 타입 사용
import type { CampaignStatus } from '@features/history';

const status: CampaignStatus = 'selected'; // TypeScript가 자동 완성 제공
const { data } = useCampaigns({ status });
```

### 실수 2: React Query 캐싱 이해 부족

```typescript
// ❌ 잘못된 예 - 같은 데이터를 여러 번 호출
function Component1() {
  const { data } = useCampaigns({ status: 'selected' });
  // ...
}

function Component2() {
  // 같은 쿼리 키 → React Query가 자동으로 캐시에서 가져옴!
  // 추가 네트워크 요청 없음
  const { data } = useCampaigns({ status: 'selected' });
  // ...
}

// ✅ 올바른 이해
// React Query는 같은 queryKey를 가진 쿼리를 캐싱합니다.
// 여러 컴포넌트에서 같은 훅을 호출해도 괜찮습니다!
```

**React Query Devtools로 확인하기:**

1. 개발 서버 실행 후 브라우저 우측 하단의 React Query 아이콘 클릭
2. 쿼리 키 `['campaigns', { status: 'selected' }]` 찾기
3. 캐시 상태, fresh/stale 여부 확인

### 실수 3: 로딩 상태 처리 누락

```typescript
// ❌ 잘못된 예 - 로딩 중에 데이터 접근
function HistoryPage() {
  const { data } = useCampaigns({ status: 'selected' });

  return (
    <div>
      {data.map((campaign) => (  // data가 undefined면 에러!
        <div key={campaign.id}>{campaign.title}</div>
      ))}
    </div>
  );
}

// ✅ 올바른 예 - 로딩/에러 상태 처리
function HistoryPage() {
  const { data, isLoading, error } = useCampaigns({ status: 'selected' });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!data || data.length === 0) return <div>체험이 없습니다</div>;

  return (
    <div>
      {data.map((campaign) => (
        <div key={campaign.id}>{campaign.title}</div>
      ))}
    </div>
  );
}
```

### 실수 4: 타입 import 누락

```typescript
// ❌ 잘못된 예 - any 타입으로 추론됨
function CampaignCard({ campaign }) {  // campaign: any
  return <div>{campaign.title}</div>;
}

// ✅ 올바른 예 - 타입 명시
import type { Campaign } from '@features/history';

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return <div>{campaign.title}</div>;
}

// ✅ 더 좋은 예 - Props 타입 분리
import type { CampaignCardProps } from '@features/history';

function CampaignCard({ campaign }: CampaignCardProps) {
  return <div>{campaign.title}</div>;
}
```

### 실수 5: 다른 feature import

```typescript
// ❌ 잘못된 예 - feature 간 import 금지!
import { ReviewForm } from '@features/review/components/ReviewForm';

// ✅ 올바른 예 - shared 컴포넌트 사용
import { Button } from '@shared/components/Button';
import { useUserStore } from '@entities/user/store'; // entities는 OK
```

## 🔍 디버깅 팁

### React Query Devtools 활용

체험 데이터가 제대로 불러와지지 않을 때:

1. React Query Devtools 열기 (우측 하단 아이콘)
2. 쿼리 목록에서 `campaigns` 검색
3. 확인할 사항:
   - ✅ Query Key가 올바른가? `['campaigns', { status: 'selected' }]`
   - ✅ Query Status가 `success`인가?
   - ✅ Data에 값이 있는가?
   - ❌ Error가 있는가?

### 브라우저 콘솔 확인

```typescript
import { useCampaigns } from '@features/history';

function DebugComponent() {
  const { data, isLoading, error } = useCampaigns({ status: 'selected' });

  console.log('데이터:', data);
  console.log('로딩 중:', isLoading);
  console.log('에러:', error);

  // ...
}
```

## 🔗 관련 문서

- [React Query 공식 문서](https://tanstack.com/query/latest)
- [React Query Devtools 가이드](../../app/providers/README.md)
- [FSD 아키텍처 가이드](../README.md)
