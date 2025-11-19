# Campaign Entity (체험 엔티티)

## 📌 이 Entity는 무엇인가요?

**체험**에 대한 전역 타입 정의와 비즈니스 로직을 관리합니다.

앱 전체에서 사용되는 체험 관련 데이터 모델을 정의하며, 여러 Feature에서 공유하여 사용합니다.

## 📁 폴더 구조

```
campaign/
├── types/
│   └── campaign.types.ts   # 체험 타입 정의
└── README.md
```

## 🎯 주요 타입

### Campaign (체험 기본 정보)

```typescript
interface Campaign {
  id: string;
  title: string;
  description: string;
  category: CampaignCategory;
  status: CampaignStatus;
  thumbnailUrl: string;
  imageUrls: string[];
  startDate: string;
  endDate: string;
  applicationDeadline: string;
  location: string;
  address: string;
  totalSlots: number;
  appliedCount: number;
  selectedCount: number;
  reviewRequired: boolean;
  reviewDeadline?: string;
}
```

### CampaignDetail (체험 상세 정보)

상세 페이지에서 필요한 추가 정보를 포함:

```typescript
interface CampaignDetail extends Campaign {
  benefits: string[];
  requirements: string[];
  guidelines: string[];
  contactInfo?: string;
}
```

### CampaignStatus (체험 상태)

```typescript
type CampaignStatus = 'recruiting' | 'in_progress' | 'completed' | 'closed';
```

- `recruiting`: 모집 중
- `in_progress`: 진행 중
- `completed`: 완료
- `closed`: 종료

### MyCampaign (나의 체험)

나의 체험에서 사용하는 체험 정보:

```typescript
interface MyCampaign extends Campaign {
  applicationDate: string;
  applicationStatus: 'pending' | 'selected' | 'rejected';
  reservationDate?: string;
  reviewSubmitted?: boolean;
}
```

## 🔧 사용 예시

### 타입 Import

```typescript
// features/campaign/api/campaignApi.ts
import type { Campaign, CampaignFilters } from '@entities/campaign/types/campaign.types';

export async function getCampaigns(filters?: CampaignFilters): Promise<Campaign[]> {
  const response = await apiClient.get('/campaigns', { params: filters });
  return response.data;
}
```

### 컴포넌트에서 사용

```typescript
// features/campaign/components/CampaignCard/CampaignCard.tsx
import type { Campaign } from '@entities/campaign/types/campaign.types';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <div>
      <h3>{campaign.title}</h3>
      <p>{campaign.description}</p>
      <span>{campaign.status}</span>
    </div>
  );
}
```

## ✅ 타입 추가/수정 시 체크리스트

- [ ] 백엔드 API 스펙 확인
- [ ] 필요한 필드 추가
- [ ] 선택적 필드는 `?` 사용
- [ ] 타입 주석 작성
- [ ] 관련 Feature에 변경사항 전파

## 🚫 주의사항

1. **Entities는 Feature를 import할 수 없습니다**

   ```typescript
   // ❌ 잘못된 예
   import { useCampaigns } from '@features/campaign/hooks/useCampaigns';

   // ✅ 올바른 예
   import { apiClient } from '@shared/api/client';
   ```

2. **전역 타입만 정의**
   - 여러 Feature에서 사용되는 타입만 정의
   - Feature 전용 타입은 해당 Feature 내부에 정의

3. **비즈니스 로직 최소화**
   - 주로 타입 정의와 간단한 유틸 함수만
   - 복잡한 로직은 Feature의 훅으로

## 🔗 사용하는 Feature

- `features/campaign/` - 체험 목록, 상세, 신청
- `features/history/` - 나의 체험 (MyCampaign 타입 사용)
- `features/reserve/` - 예약 (Campaign 타입 참조)
- `features/review/` - 후기 작성 (Campaign 타입 참조)

## 💡 Tip

- 백엔드 API 응답과 타입이 일치하도록 유지
- 타입 변경 시 영향받는 Feature 확인
- API 스펙이 확정되지 않았다면 TODO 주석으로 표시
