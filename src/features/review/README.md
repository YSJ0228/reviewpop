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
- 리뷰 전용 컴포넌트는 이 폴더에, 재사용 가능한 UI는 `@shared/components`에
- API 호출은 `api/reviewApi.ts`에 모아서 관리

---

## ❌ 자주 하는 실수

### 실수 1: fetch를 직접 사용

**절대 금지!** 항상 `apiClient`를 사용해야 합니다.

```typescript
// ❌ 잘못된 예 - fetch 직접 사용
async function getReviews() {
  const response = await fetch('/api/reviews');
  return response.json();
}

// ✅ 올바른 예 - apiClient 사용
import { apiClient } from '@shared/api/client';

async function getReviews() {
  const response = await apiClient.get('/api/reviews');
  return response.data;
}
```

**왜 중요한가요?**

- apiClient는 에러 처리, 토큰 추가 등이 이미 설정되어 있음
- Mock API와 실제 API 전환이 자동으로 처리됨
- 중앙 집중식 설정 관리 가능

### 실수 2: 타입 정의 누락

```typescript
// ❌ 잘못된 예 - any 타입
function ReviewCard({ review }) {  // review: any
  return <div>{review.title}</div>;
}

// ✅ 올바른 예 - 타입 명시
import type { Review } from '@entities/review';

function ReviewCard({ review }: { review: Review }) {
  return <div>{review.title}</div>;
}

// ✅ 더 좋은 예 - Props 타입 분리
import type { Review } from '@entities/review';

interface ReviewCardProps {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
  return <div>{review.title}</div>;
}
```

### 실수 3: 리뷰 API를 컴포넌트에서 직접 호출

```typescript
// ❌ 잘못된 예 - 컴포넌트에서 직접 호출
import { apiClient } from '@shared/api/client';

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    apiClient.get('/api/reviews')
      .then(res => setReviews(res.data));
  }, []);

  return <div>...</div>;
}

// ✅ 올바른 예 - 커스텀 훅으로 분리
// features/review/hooks/useReviews.ts
export function useReviews() {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const response = await apiClient.get('/api/reviews');
      return response.data;
    },
  });
}

// features/review/components/ReviewList.tsx
function ReviewList() {
  const { data: reviews } = useReviews();
  return <div>...</div>;
}
```

### 실수 4: 로딩/에러 상태 처리 안 함

```typescript
// ❌ 잘못된 예 - 로딩/에러 무시
function ReviewList() {
  const { data } = useReviews();

  return (
    <div>
      {data.map((review) => (  // data가 undefined면 에러!
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}

// ✅ 올바른 예 - 모든 상태 처리
function ReviewList() {
  const { data, isLoading, error } = useReviews();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!data || data.length === 0) return <div>리뷰가 없습니다</div>;

  return (
    <div>
      {data.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
```

### 실수 5: 이미지 배열 처리 실수

```typescript
// ❌ 잘못된 예 - 첫 번째 이미지만 있다고 가정
function ReviewCard({ review }: { review: Review }) {
  return <img src={review.images[0]} />; // images가 빈 배열이면 에러!
}

// ✅ 올바른 예 - 배열 길이 체크
function ReviewCard({ review }: { review: Review }) {
  return (
    <div>
      {review.images.length > 0 && (
        <img src={review.images[0]} alt={review.title} />
      )}
    </div>
  );
}

// ✅ 더 좋은 예 - 모든 이미지 표시
function ReviewCard({ review }: { review: Review }) {
  return (
    <div>
      {review.images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${review.title} - ${index + 1}`}
        />
      ))}
    </div>
  );
}
```

---

## 💡 체크리스트: 리뷰 기능 개발 시

리뷰 기능을 개발할 때 다음을 확인하세요:

- [ ] `apiClient` 사용 (fetch 직접 사용 금지)
- [ ] 타입 정의 (`Review` 타입 import)
- [ ] 커스텀 훅으로 API 로직 분리
- [ ] 로딩/에러 상태 처리
- [ ] 이미지 배열 빈 배열 처리
- [ ] React Query Devtools로 캐싱 상태 확인
