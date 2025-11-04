# Entities (엔티티)

## 📌 이 폴더는 무엇인가요?

비즈니스의 핵심 **데이터 모델**과 **전역 상태**를 관리하는 폴더입니다.

## 🎯 언제 사용하나요?

- 앱 전체에서 공유되는 데이터 (예: 로그인한 사용자 정보)
- 여러 기능에서 사용되는 비즈니스 개념 (예: User, Product, Review)
- 전역 상태 관리 (예: 테마, 사용자 정보)

## 📁 폴더 구조

```
entities/
├── user/            # 사용자 엔티티
│   ├── store/       # 사용자 전역 상태 (Zustand)
│   ├── types/       # 사용자 타입 정의
│   └── README.md
└── theme/           # 테마 엔티티
    ├── store/       # 테마 전역 상태 (Zustand)
    └── README.md
```

## ✅ 규칙

1. **전역적으로 사용**: entities는 앱 어디서든 import 가능
2. **features는 import 금지**: entities에서 features를 import하면 안됨
3. **shared는 사용 가능**: 유틸 함수나 설정은 사용 가능
4. **순수한 비즈니스 로직**: UI 컴포넌트는 포함하지 않음

## 📝 예시

### ✅ 좋은 예

```typescript
// entities/user/store/userStore.ts
import { create } from 'zustand';

// 전역에서 사용할 수 있는 사용자 상태
export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

### ❌ 나쁜 예

```typescript
// entities/user/components/UserProfile.tsx  <- UI 컴포넌트는 entities에 넣지 않기!
// 대신 features/user/ 또는 shared/ui/에 넣기
```

## 🚀 새로운 엔티티 추가하기

1. `entities/` 아래에 새 폴더 생성 (예: `review/`)
2. `store/`, `types/` 폴더 생성
3. README.md 작성
4. 타입과 store 작성

---

## ❌ 자주 하는 실수

### 실수 1: Features를 entities에서 import

**절대 금지!** Entities는 features보다 하위 레이어이므로 features를 import할 수 없습니다.

```typescript
// ❌ 잘못된 예 - features import 금지!
// entities/user/store/userStore.ts
import { ReviewCard } from '@features/review/components/ReviewCard';

// entities/user/types/user.types.ts
import type { Campaign } from '@features/history/types/campaign.types';
```

**왜 안 될까요?**

- 순환 의존성(Circular Dependency) 발생
- Features가 entities를 사용하는데, entities가 features를 사용하면 무한 루프
- 레이어 구조 붕괴

**해결 방법:**

```typescript
// ✅ 올바른 예 - 타입을 entities로 이동
// entities/campaign/types/campaign.types.ts
export interface Campaign {
  id: string;
  title: string;
  // ...
}

// entities/user/types/user.types.ts
import type { Campaign } from '@entities/campaign/types/campaign.types';
```

### 실수 2: UI 컴포넌트를 entities에 넣기

Entities는 **비즈니스 로직과 데이터**만 담당합니다. UI는 넣지 마세요!

```typescript
// ❌ 잘못된 예 - UI 컴포넌트를 entities에 넣음
entities/
├── user/
│   ├── components/        // 컴포넌트 폴더 자체가 잘못됨!
│   │   └── UserProfile.tsx
│   └── store/

// ✅ 올바른 예 - UI는 features 또는 shared에
features/
├── profile/               // 사용자 프로필 기능
│   └── components/
│       └── UserProfile.tsx

// 또는 재사용 가능한 UI라면
shared/
└── components/
    └── UserProfile/
```

### 실수 3: Store를 컴포넌트에서 직접 수정

Zustand store는 항상 **제공된 액션**을 통해 수정해야 합니다.

```typescript
// ❌ 잘못된 예 - store 직접 수정
import { useUserStore } from '@entities/user/store';

function LoginButton() {
  const handleClick = () => {
    useUserStore.setState({ user: userData }); // 직접 setState 호출!
  };
}

// ✅ 올바른 예 - 정의된 액션 사용
import { useUserStore } from '@entities/user/store';

function LoginButton() {
  const setUser = useUserStore((state) => state.setUser);

  const handleClick = () => {
    setUser(userData); // 액션 사용
  };
}
```

**왜 중요한가요?**

- 액션을 통하면 로직을 한 곳에서 관리
- 디버깅이 쉬워짐
- 유효성 검증을 액션에 추가 가능

### 실수 4: 타입만 있는 entity에 store 추가

모든 entity가 store를 가질 필요는 없습니다!

```typescript
// ❌ 불필요한 예 - 타입만 있으면 되는 경우
entities/
├── review/
│   ├── store/             // 리뷰는 전역 상태가 필요 없음!
│   │   └── reviewStore.ts
│   └── types/
│       └── review.types.ts

// ✅ 올바른 예 - 타입만 정의
entities/
├── review/
│   └── types/
│       └── review.types.ts
```

**Store가 필요한 경우:**

- 앱 전체에서 공유되는 데이터 (예: 로그인한 사용자 정보)
- 여러 페이지/컴포넌트에서 접근하는 상태

**Store가 불필요한 경우:**

- 특정 페이지/컴포넌트에서만 사용 (useState 사용)
- React Query로 관리되는 서버 상태 (리뷰 목록, 캠페인 등)

---

## 💡 체크리스트: 새 Entity 만들 때

새로운 entity를 추가할 때 다음을 확인하세요:

- [ ] `entities/{엔티티명}/` 폴더 생성
- [ ] `types/` 폴더 생성 및 타입 정의
- [ ] 전역 상태가 필요하면 `store/` 폴더 생성
- [ ] `README.md` 작성
- [ ] Features를 import하지 않았는지 확인
- [ ] UI 컴포넌트를 넣지 않았는지 확인
- [ ] Store는 액션을 통해서만 수정하도록 설계
