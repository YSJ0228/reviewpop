# Features (기능)

## 📌 이 폴더는 무엇인가요?

사용자가 실제로 사용하는 **기능 단위**로 코드를 관리하는 폴더입니다.

## 🎯 언제 사용하나요?

- 사용자의 행동이나 시나리오가 명확한 경우
- 예: 리뷰 작성하기, 제품 필터링하기, 로그인하기

## 📁 폴더 구조

각 기능은 독립적인 폴더로 관리됩니다:

```
features/
├── review/           # 리뷰 관련 기능
│   ├── components/   # 리뷰 전용 컴포넌트
│   ├── hooks/        # 리뷰 전용 훅
│   ├── api/          # 리뷰 API 호출
│   └── README.md
└── product/          # 제품 관련 기능
    └── ...
```

## ✅ 규칙

1. **한 기능은 한 폴더에**: 리뷰 관련 코드는 모두 `review/` 폴더 안에
2. **다른 feature는 import 금지**: `review/`에서 `product/`를 import하면 안됨
3. **shared는 사용 가능**: `shared/ui/Button` 같은 공통 컴포넌트는 자유롭게 사용
4. **entities는 사용 가능**: `entities/user/store`처럼 전역 상태는 사용 가능

## 📝 예시

### ❌ 나쁜 예

```typescript
// features/review/components/ReviewCard.tsx
import { ProductCard } from '@features/product/components/ProductCard'; // 다른 feature import 금지!
```

### ✅ 좋은 예

```typescript
// features/review/components/ReviewCard.tsx
import { Button } from '@shared/ui/Button'; // shared는 OK
import { useUser } from '@entities/user/store'; // entities는 OK
```

## 🚀 새로운 기능 추가하기

1. `features/` 아래에 새 폴더 생성 (예: `auth/`)
2. 필요한 하위 폴더 생성 (`components/`, `hooks/`, `api/`)
3. README.md 작성
4. 코드 작성 시작!

---

## ❌ 자주 하는 실수

### 실수 1: 다른 feature import

**가장 흔한 실수입니다!** Feature 간에는 서로 import할 수 없습니다.

```typescript
// ❌ 잘못된 예 - 다른 feature import 금지!
// features/review/components/ReviewCard.tsx
import { ProductCard } from '@features/product/components/ProductCard';

// features/history/hooks/useCampaigns.ts
import { useReviews } from '@features/review/hooks/useReviews';
```

**왜 안 될까요?**

- Feature 간 의존성이 생기면 코드가 복잡해짐
- 순환 참조(Circular Dependency) 발생 가능
- 기능 분리의 의미가 없어짐

**해결 방법:**

```typescript
// ✅ 방법 1: shared 컴포넌트 사용
import { Card } from '@shared/components/Card'; // 공통 UI 사용

// ✅ 방법 2: entities 사용
import { useUserStore } from '@entities/user/store'; // 전역 상태 OK

// ✅ 방법 3: 컴포넌트를 shared로 이동
// 여러 feature에서 사용된다면 shared/components/로 이동 고려
```

### 실수 2: 잘못된 폴더 구조

```typescript
// ❌ 잘못된 구조
features/
├── review/
│   ├── ReviewCard.tsx        // components/ 폴더가 없음
│   ├── useReviews.ts         // hooks/ 폴더가 없음
│   └── reviewApi.ts          // api/ 폴더가 없음

// ✅ 올바른 구조
features/
├── review/
│   ├── components/           // 컴포넌트는 여기
│   │   └── ReviewCard.tsx
│   ├── hooks/                // 훅은 여기
│   │   └── useReviews.ts
│   └── api/                  // API는 여기
│       └── reviewApi.ts
```

### 실수 3: 비즈니스 로직을 컴포넌트에 직접 작성

```typescript
// ❌ 잘못된 예 - 컴포넌트에 모든 로직
function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  return <div>...</div>;
}

// ✅ 올바른 예 - 커스텀 훅으로 분리
// features/review/hooks/useReviews.ts
export function useReviews() {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: () => getReviews(),
  });
}

// features/review/components/ReviewList.tsx
function ReviewList() {
  const { data: reviews } = useReviews();
  return <div>...</div>;
}
```

**왜 분리해야 할까요?**

- 컴포넌트는 UI만 담당하도록
- 로직 재사용 가능
- 테스트가 쉬워짐

### 실수 4: 타입 정의 위치 실수

```typescript
// ❌ 잘못된 예 - 전역 타입을 feature에 정의
// features/review/types/user.types.ts
export interface User {
  // User는 여러 곳에서 사용됨!
  id: number;
  name: string;
}

// ✅ 올바른 예 - 전역 타입은 entities에
// entities/user/types/user.types.ts
export interface User {
  id: number;
  name: string;
}

// features/review/api/reviewApi.ts
import type { User } from '@entities/user/types/user.types';
```

### 실수 5: README 작성 안 함

```typescript
// ❌ 잘못된 예
features/
├── review/
│   ├── components/
│   ├── hooks/
│   └── api/
    // README.md 없음!

// ✅ 올바른 예
features/
├── review/
│   ├── components/
│   ├── hooks/
│   ├── api/
│   └── README.md  // 필수!
```

**왜 README가 필요한가요?**

- 다른 개발자(또는 미래의 나)를 위한 가이드
- 기능의 책임 범위 명확히
- 사용 예시 제공

---

## 💡 체크리스트: 새 Feature 만들 때

새로운 feature를 추가할 때 다음을 확인하세요:

- [ ] `features/{기능명}/` 폴더 생성
- [ ] 필요한 하위 폴더 생성 (`components/`, `hooks/`, `api/`)
- [ ] `README.md` 작성
- [ ] 다른 feature를 import하지 않았는지 확인
- [ ] 전역 타입은 `entities`에 정의했는지 확인
- [ ] 비즈니스 로직은 커스텀 훅으로 분리했는지 확인
