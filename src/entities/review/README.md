# Review Entity (리뷰 엔티티)

## 📌 이 폴더는 무엇인가요?

앱 전체에서 사용하는 **리뷰 데이터 타입**을 정의하는 폴더입니다.
리뷰의 구조와 관련 타입들을 중앙에서 관리합니다.

## 📁 폴더 구조

```
review/
├── types/
│   └── review.types.ts    # 리뷰 타입 정의
└── README.md
```

## 🎯 제공하는 타입

### 1. Review (리뷰 데이터)

리뷰의 전체 구조를 정의합니다.

```typescript
interface Review {
  id: number; // 리뷰 ID
  campaignId: string; // 캠페인 ID
  userId: number; // 작성자 ID
  user: {
    // 작성자 정보
    id: number;
    name: string;
    email: string;
    profileImage: string | null;
  };
  rating: number; // 평점 (1-5)
  title: string; // 리뷰 제목
  content: string; // 리뷰 내용
  images: string[]; // 리뷰 이미지 URL 배열
  createdAt: string; // 생성일 (ISO 8601)
  updatedAt: string; // 수정일 (ISO 8601)
}
```

### 2. CreateReviewRequest (리뷰 작성 요청)

새 리뷰를 작성할 때 사용하는 타입입니다.

```typescript
interface CreateReviewRequest {
  campaignId: string;
  rating: number; // 1-5
  title: string;
  content: string;
}
```

### 3. ReviewFilterParams (리뷰 필터링)

리뷰 목록을 조회할 때 필터링 조건으로 사용합니다.

```typescript
interface ReviewFilterParams {
  campaignId?: string; // 특정 캠페인의 리뷰만
  userId?: number; // 특정 사용자의 리뷰만
  rating?: number; // 정확히 N점인 리뷰만
  minRating?: number; // N점 이상인 리뷰만
  searchQuery?: string; // 제목/내용 검색
}
```

## 📝 사용 예시

### 1. 리뷰 데이터 타입 사용

```typescript
import type { Review } from '@entities/review';

function ReviewCard({ review }: { review: Review }) {
  return (
    <div>
      <h3>{review.title}</h3>
      <p>평점: {review.rating}점</p>
      <p>{review.content}</p>
      <span>작성자: {review.user.name}</span>
    </div>
  );
}
```

### 2. 리뷰 작성 폼

```typescript
import type { CreateReviewRequest } from '@entities/review';

function ReviewForm({ campaignId }: { campaignId: string }) {
  const [formData, setFormData] = useState<CreateReviewRequest>({
    campaignId,
    rating: 5,
    title: '',
    content: '',
  });

  const handleSubmit = async () => {
    await createReview(formData);
  };

  // ...
}
```

### 3. 리뷰 필터링

```typescript
import type { ReviewFilterParams } from '@entities/review';

function useFilteredReviews(filters: ReviewFilterParams) {
  return useQuery({
    queryKey: ['reviews', filters],
    queryFn: () => getReviews(filters),
  });
}

// 사용 예시
const { data } = useFilteredReviews({
  campaignId: '123',
  minRating: 4,
});
```

## 💡 개발 팁

### 타입 vs 인터페이스

이 프로젝트는 **interface**를 우선 사용합니다:

```typescript
// ✅ 선호
interface Review {
  id: number;
  title: string;
}

// ⚠️ 특별한 경우만 (Union, Intersection 등)
type Rating = 1 | 2 | 3 | 4 | 5;
```

### Pick을 사용한 타입 재사용

```typescript
// 작성자 정보는 User 타입의 일부만 사용
user: Pick<User, 'id' | 'name' | 'email' | 'profileImage'>;
```

### 날짜 타입은 string (ISO 8601)

```typescript
// ✅ 올바른 예 - string으로 정의
createdAt: string; // "2024-11-04T12:00:00Z"

// ❌ 잘못된 예 - Date 객체는 직렬화 문제 발생
createdAt: Date;
```

## ❌ 자주 하는 실수

### 실수 1: 타입 import 없이 사용

```typescript
// ❌ 잘못된 예 - any 타입으로 추론됨
function ReviewCard({ review }) {
  return <div>{review.title}</div>;
}

// ✅ 올바른 예 - 타입 명시
import type { Review } from '@entities/review';

function ReviewCard({ review }: { review: Review }) {
  return <div>{review.title}</div>;
}
```

### 실수 2: 타입을 로컬에 중복 정의

```typescript
// ❌ 잘못된 예 - 타입 중복 정의
// features/review/components/ReviewCard.tsx
interface Review {
  // 이미 entities에 정의되어 있음!
  id: number;
  title: string;
  // ...
}

// ✅ 올바른 예 - entities의 타입 재사용
import type { Review } from '@entities/review';
```

**왜 중요한가요?**

- 타입이 여러 곳에 흩어지면 유지보수가 어려움
- entities에서 타입이 변경되면 한 곳만 수정하면 됨

### 실수 3: Optional 타입 누락

```typescript
// ❌ 잘못된 예 - 필터링 시 모든 필드가 필수
interface ReviewFilterParams {
  campaignId: string; // 항상 필요하지 않을 수 있음
  userId: number;
  rating: number;
}

// ✅ 올바른 예 - Optional로 정의
interface ReviewFilterParams {
  campaignId?: string; // 선택적
  userId?: number;
  rating?: number;
}
```

### 실수 4: rating 값 검증 누락

```typescript
// ❌ 잘못된 예 - 1-5 범위를 벗어날 수 있음
const rating: number = 10; // 잘못된 값!

// ✅ 올바른 예 - 유효성 검증
const rating: number = 5;

if (rating < 1 || rating > 5) {
  throw new Error('평점은 1-5 사이여야 합니다');
}

// ✅ 더 좋은 예 - Union 타입 사용
type Rating = 1 | 2 | 3 | 4 | 5;

const rating: Rating = 5; // 1-5만 허용
```

### 실수 5: 이미지 배열을 Optional로 착각

```typescript
// ❌ 잘못된 예 - images는 필수 필드
function ReviewCard({ review }: { review: Review }) {
  if (review.images) {  // 불필요한 체크
    return <img src={review.images[0]} />;
  }
}

// ✅ 올바른 예 - images는 항상 배열 (빈 배열일 수 있음)
function ReviewCard({ review }: { review: Review }) {
  if (review.images.length > 0) {
    return <img src={review.images[0]} />;
  }
  return null;
}
```

## 🔍 타입 정의 위치 가이드

**어디에 타입을 정의해야 할까요?**

### ✅ entities에 정의해야 하는 타입

- 앱 전체에서 사용되는 비즈니스 엔티티 타입
- 여러 feature에서 공유되는 타입
- 예: `Review`, `User`, `Product`

### ✅ features에 정의해야 하는 타입

- 특정 기능에만 사용되는 타입
- API 요청/응답 타입 (그 기능에서만 사용)
- 예: `CreateReviewRequest` (리뷰 작성 feature에서만 사용)

### ⚠️ 판단이 애매할 때

**질문해보세요:**

1. 이 타입이 여러 feature에서 사용되나요?
   - YES → `entities`
   - NO → `features/{기능}/api/` 또는 `features/{기능}/types/`

2. 이 타입이 비즈니스의 핵심 개념인가요?
   - YES → `entities`
   - NO → `features`

## 🔗 관련 문서

- [리뷰 기능 가이드](../../features/review/README.md)
- [Entities 가이드](../README.md)
- [TypeScript 타입 시스템](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
