# Campaign (캠페인)

## 📌 이 Feature는 무엇인가요?

캠페인과 관련된 모든 기능을 담당합니다:

- 캠페인 목록 조회 및 필터링
- 캠페인 상세 정보 조회
- 캠페인 이미지 갤러리
- 캠페인 신청

## 📁 폴더 구조

```
campaign/
├── components/         # 캠페인 관련 컴포넌트
│   ├── CampaignList/       # 캠페인 목록
│   ├── CampaignCard/       # 캠페인 카드
│   ├── CampaignDetail/     # 캠페인 상세
│   ├── CampaignFilter/     # 필터 (카테고리, 지역 등)
│   ├── ImageGallery/       # 이미지 목록
│   └── ApplyForm/          # 신청 폼
├── hooks/              # 캠페인 관련 훅
│   ├── useCampaigns.ts     # 캠페인 목록 조회
│   ├── useCampaignDetail.ts # 캠페인 상세 조회
│   └── useApplyCampaign.ts # 캠페인 신청
├── api/                # 캠페인 API
│   └── campaignApi.ts
└── README.md
```

## 🎯 주요 기능

### 1. 캠페인 목록 (CampaignList)

- 전체 캠페인 목록 표시
- 무한 스크롤 또는 페이지네이션
- 진행 상태별 필터링 (모집 중, 진행 중, 종료)

### 2. 캠페인 필터 (CampaignFilter)

- 카테고리별 필터 (식품, 뷰티, 생활용품 등)
- 지역별 필터
- 정렬 (최신순, 마감임박순 등)

### 3. 캠페인 상세 (CampaignDetail)

- 캠페인 상세 정보 표시
- 이미지 슬라이더
- 신청 조건 및 안내사항
- 신청하기 버튼

### 4. 이미지 갤러리 (ImageGallery)

- 캠페인 이미지 목록 그리드
- 이미지 클릭 시 전체화면 뷰어 모달 표시
- Swiper 라이브러리 활용

### 5. 신청 폼 (ApplyForm)

- 신청 정보 입력
- 폼 validation
- 신청 제출

## 🔧 사용 예시

### 캠페인 목록 조회

```typescript
// features/campaign/hooks/useCampaigns.ts
import { useQuery } from '@tanstack/react-query';

import { getCampaigns } from '../api/campaignApi';

export function useCampaigns(filters?: CampaignFilters) {
  return useQuery({
    queryKey: ['campaigns', filters],
    queryFn: () => getCampaigns(filters),
  });
}

// 사용
import { useCampaigns } from '@features/campaign/hooks/useCampaigns';

function CampaignList() {
  const { data: campaigns, isLoading } = useCampaigns();

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div>
      {campaigns?.map(campaign => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
```

### 캠페인 신청

```typescript
// features/campaign/hooks/useApplyCampaign.ts
import { useMutation } from '@tanstack/react-query';

import { applyCampaign } from '../api/campaignApi';

export function useApplyCampaign() {
  return useMutation({
    mutationFn: (data: ApplyData) => applyCampaign(data),
    onSuccess: () => {
      // 신청 완료 처리
    },
  });
}

// 사용
import { useApplyCampaign } from '@features/campaign/hooks/useApplyCampaign';

function ApplyForm({ campaignId }: { campaignId: string }) {
  const { mutate: apply, isPending } = useApplyCampaign();

  const handleSubmit = (data: FormData) => {
    apply({ campaignId, ...data });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## ✅ 개발 시 체크리스트

### CampaignList 컴포넌트

- [ ] 캠페인 목록 API 연동
- [ ] 로딩 상태 처리
- [ ] 에러 상태 처리
- [ ] 빈 상태 UI
- [ ] 무한 스크롤 또는 페이지네이션

### CampaignFilter 컴포넌트

- [ ] 필터 UI 구현
- [ ] 필터 상태 관리
- [ ] 필터 적용 시 목록 갱신

### CampaignDetail 컴포넌트

- [ ] 캠페인 상세 API 연동
- [ ] 이미지 슬라이더 (Swiper)
- [ ] 신청하기 버튼 (신청 페이지로 이동)

### ImageGallery 컴포넌트

- [ ] 이미지 그리드 레이아웃
- [ ] ImageViewer 모달 연동
- [ ] Swiper 이미지 뷰어 구현

### ApplyForm 컴포넌트

- [ ] 폼 입력 필드 구현
- [ ] Validation 로직
- [ ] 제출 API 연동
- [ ] 완료 페이지로 리다이렉트

## 🚫 주의사항

1. **다른 Feature import 금지**

   ```typescript
   // ❌ 잘못된 예
   import { useReviews } from '@features/review/hooks/useReviews';

   // ✅ 올바른 예
   import { Button } from '@shared/components/Button';
   import { useCampaignStore } from '@entities/campaign/store'; // entities는 OK
   ```

2. **타입 정의 위치**
   - 전역 타입: `@entities/campaign/types/campaign.types.ts`
   - API 응답 타입: `features/campaign/api/campaignApi.ts` 내부

3. **비즈니스 로직 분리**
   - 컴포넌트는 UI만 담당
   - 비즈니스 로직은 커스텀 훅으로 분리

## 🔗 관련 페이지

- 홈 (`/`) - 캠페인 목록
- 캠페인 상세 (`/campaign/[id]`)
- 이미지 목록 (`/campaign/[id]/images`)
- 캠페인 신청 (`/campaign/[id]/apply`)
- 신청 완료 (`/campaign/[id]/apply/complete`)
