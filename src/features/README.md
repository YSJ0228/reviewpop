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
