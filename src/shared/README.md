# Shared (공유 자원)

## 📌 이 폴더는 무엇인가요?

앱 전체에서 **공통으로 사용**하는 코드를 모아둔 폴더입니다.

## 🎯 언제 사용하나요?

- 여러 곳에서 재사용되는 UI 컴포넌트 (Button, Input 등)
- API 설정 및 HTTP 클라이언트
- 유틸리티 함수 (날짜 포맷, 텍스트 변환 등)
- 전역 설정 (환경 변수, 상수 등)

## 📁 폴더 구조

```
shared/
├── ui/              # 재사용 가능한 UI 컴포넌트
│   ├── Button/
│   ├── Input/
│   └── README.md
├── api/             # API 설정 및 HTTP 클라이언트
│   ├── client.ts
│   ├── mock/
│   └── README.md
├── lib/             # 유틸리티 함수
│   ├── date.ts
│   ├── format.ts
│   └── README.md
└── config/          # 전역 설정
    ├── constants.ts
    └── README.md
```

## ✅ 규칙

1. **재사용 가능해야 함**: 특정 기능에 종속되지 않은 코드만
2. **비즈니스 로직 금지**: 순수한 UI나 유틸만 포함
3. **어디서든 import 가능**: features, entities 모두에서 사용 가능

## 📝 예시

### ✅ 좋은 예 (shared에 넣기)

```typescript
// shared/ui/Button/Button.tsx
// 어디서든 사용 가능한 범용 버튼
export function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
```

### ❌ 나쁜 예 (shared에 넣지 말기)

```typescript
// shared/ui/ReviewSubmitButton.tsx  <- 특정 기능(Review)에 종속됨
// 이런 경우 features/review/components/에 넣기
export function ReviewSubmitButton() {
  const submitReview = useReviewSubmit(); // 특정 기능의 로직
  // ...
}
```

## 💡 개발 팁

- **shared/ui**: 프로젝트의 디자인 시스템 역할
- **shared/api**: axios 인스턴스, API 기본 설정
- **shared/lib**: lodash처럼 프로젝트만의 유틸 함수 모음
- **shared/config**: 환경 변수, 공통 상수 관리

---

## ❌ 자주 하는 실수

### 실수 1: 비즈니스 로직을 shared에 넣기

Shared는 **순수한 유틸**만 포함해야 합니다. 특정 기능의 로직은 features에!

```typescript
// ❌ 잘못된 예 - 비즈니스 로직을 shared에
// shared/lib/review.ts
export function calculateReviewScore(reviews: Review[]) {
  // 리뷰 점수 계산은 review 기능에 종속됨!
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

// ✅ 올바른 예 - features에 위치
// features/review/lib/reviewUtils.ts
export function calculateReviewScore(reviews: Review[]) {
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

// ✅ Shared는 범용 유틸만
// shared/lib/math.ts
export function average(numbers: number[]) {
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}
```

### 실수 2: 특정 기능에 종속된 컴포넌트를 shared에 넣기

```typescript
// ❌ 잘못된 예 - 특정 기능에 종속
// shared/components/ReviewCard/
export function ReviewCard({ review }: { review: Review }) {
  // Review 기능에만 사용됨!
}

// ✅ 올바른 예 - features에 위치
// features/review/components/ReviewCard/
export function ReviewCard({ review }: { review: Review }) {
  // ...
}

// ✅ Shared는 범용 컴포넌트만
// shared/components/Card/
export function Card({ children }: { children: ReactNode }) {
  return <div className="card">{children}</div>;
}
```

**판단 기준:**

- "이 컴포넌트를 다른 기능에서도 **똑같이** 쓸 수 있나?" → YES면 shared
- "이 컴포넌트가 특정 엔티티(Review, Campaign 등)에 의존하나?" → YES면 features

### 실수 3: any 타입 사용

```typescript
// ❌ 잘못된 예 - any 타입 사용
// shared/lib/format.ts
export function formatData(data: any) {
  // any 금지!
  return data.toString();
}

// ✅ 올바른 예 - 제네릭 사용
export function formatData<T>(data: T): string {
  return String(data);
}

// ✅ 또는 구체적인 타입
export function formatPrice(price: number): string {
  return `${price.toLocaleString()}원`;
}
```

### 실수 4: 환경 변수를 하드코딩

```typescript
// ❌ 잘못된 예 - 하드코딩
// features/review/api/reviewApi.ts
const API_URL = 'https://api.example.com'; // 하드코딩!

// ✅ 올바른 예 - shared/config 사용
// shared/config/env.ts
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
};

// features/review/api/reviewApi.ts
import { env } from '@shared/config/env';
const API_URL = env.apiUrl;
```

### 실수 5: Import 경로 일관성 부족

```typescript
// ❌ 잘못된 예 - 상대 경로 사용
import { Button } from '../../../shared/components/Button';

// ✅ 올바른 예 - 절대 경로 사용
import { Button } from '@shared/components/Button';
```

---

## 💡 체크리스트: Shared에 넣기 전에

코드를 shared에 넣기 전에 다음을 확인하세요:

- [ ] 여러 기능에서 **정확히 같은 방식**으로 사용되나요?
- [ ] 특정 비즈니스 로직에 종속되지 않았나요?
- [ ] 타입이 제대로 정의되어 있나요? (any 금지!)
- [ ] 환경 변수나 상수가 하드코딩되지 않았나요?
- [ ] 다른 개발자가 봐도 "범용적"이라고 느낄까요?
