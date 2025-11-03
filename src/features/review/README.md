# Review Feature (리뷰 기능)

## 📌 이 폴더는 무엇인가요?

리뷰 작성, 조회, 수정, 삭제 등 **리뷰 관련 모든 기능**을 관리하는 폴더입니다.

## 📁 폴더 구조

```
review/
├── components/      # 리뷰 전용 컴포넌트
│   ├── ReviewCard.tsx
│   ├── ReviewForm.tsx
│   └── ReviewList.tsx
├── hooks/           # 리뷰 전용 커스텀 훅
│   ├── useReviews.ts
│   └── useReviewSubmit.ts
├── api/             # 리뷰 API 호출 함수
│   └── reviewApi.ts
└── README.md
```

## 🎯 주요 기능

- [ ] 리뷰 목록 조회
- [ ] 리뷰 상세 조회
- [ ] 리뷰 작성
- [ ] 리뷰 수정
- [ ] 리뷰 삭제

## 📝 사용 예시

### 1. 리뷰 목록 컴포넌트 사용

```typescript
import { ReviewList } from '@features/review/components/ReviewList';

export default function ReviewPage() {
  return (
    <div>
      <h1>리뷰 목록</h1>
      <ReviewList />
    </div>
  );
}
```

### 2. 리뷰 작성 훅 사용

```typescript
import { useReviewSubmit } from '@features/review/hooks/useReviewSubmit';

function ReviewForm() {
  const { submitReview, isLoading } = useReviewSubmit();

  const handleSubmit = async (data) => {
    await submitReview(data);
  };

  // ...
}
```

## 💡 개발 팁

- 리뷰 관련 타입은 `@entities/review/types`에 정의 (전역에서 사용되는 경우)
- 리뷰 전용 컴포넌트는 이 폴더에, 재사용 가능한 UI는 `@shared/ui`에
- API 호출은 `api/reviewApi.ts`에 모아서 관리
