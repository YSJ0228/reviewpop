# User Entity (사용자 엔티티)

## 📌 이 폴더는 무엇인가요?

앱 전체에서 사용하는 **사용자 정보**와 **인증 상태**를 관리하는 폴더입니다.

## 📁 폴더 구조

```
user/
├── store/
│   └── userStore.ts    # 사용자 전역 상태 (Zustand)
├── types/
│   └── user.types.ts   # 사용자 타입 정의
└── README.md
```

## 🎯 주요 기능

- 로그인한 사용자 정보 저장
- 사용자 인증 상태 관리
- 사용자 정보 업데이트

## 📝 사용 예시

### 1. 사용자 정보 가져오기

```typescript
import { useUserStore } from '@entities/user/store/userStore';

function Header() {
  const user = useUserStore((state) => state.user);

  return (
    <div>
      {user ? (
        <span>안녕하세요, {user.name}님!</span>
      ) : (
        <button>로그인</button>
      )}
    </div>
  );
}
```

### 2. 사용자 정보 설정하기

```typescript
import { useUserStore } from '@entities/user/store/userStore';

function LoginPage() {
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async (email, password) => {
    const user = await loginApi(email, password);
    setUser(user); // 전역 상태에 저장
  };

  // ...
}
```

## 💡 개발 팁

- 사용자 타입은 `types/user.types.ts`에 정의
- 로그인/로그아웃 로직은 `store/userStore.ts`에 작성
- 사용자 관련 API 호출은 `@shared/api` 또는 `@features/auth/api`에 작성

---

## ❌ 자주 하는 실수

### 실수 1: Zustand selector 최적화 안 함

```typescript
// ❌ 잘못된 예 - 매번 전체 state 가져옴
function Header() {
  const { user, setUser, logout } = useUserStore(); // 전체 다 가져옴!
  // user만 변경돼도, setUser와 logout도 재생성됨
  return <div>{user?.name}</div>;
}

// ✅ 올바른 예 - 필요한 것만 선택
function Header() {
  const user = useUserStore((state) => state.user); // user만 선택
  return <div>{user?.name}</div>;
}
```

**왜 중요한가요?**

- 불필요한 리렌더링 방지
- 성능 최적화
- 컴포넌트가 정확히 무엇을 사용하는지 명확히

### 실수 2: 로그인 상태 체크를 컴포넌트마다 반복

```typescript
// ❌ 잘못된 예 - 컴포넌트마다 반복
function Header() {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user; // 매번 계산

  if (isLoggedIn) {
    return <UserMenu />;
  }
  return <LoginButton />;
}

// ✅ 올바른 예 - store에 메서드 추가
// entities/user/store/userStore.ts
export const useUserStore = create((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
  isLoggedIn: () => !!get().user, // 헬퍼 메서드
}));

// 사용
function Header() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn());

  if (isLoggedIn) {
    return <UserMenu />;
  }
  return <LoginButton />;
}
```

### 실수 3: localStorage 동기화 누락

```typescript
// ❌ 잘못된 예 - 메모리에만 저장
export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }), // 새로고침하면 사라짐!
}));

// ✅ 올바른 예 - localStorage 자동 동기화
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // localStorage 키
    },
  ),
);
```

### 실수 4: 타입 정의 누락

```typescript
// ❌ 잘못된 예 - 타입 없음
export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }), // user 타입이 any!
}));

// ✅ 올바른 예 - 타입 명시
import type { User } from '../types/user.types';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

### 실수 5: 컴포넌트 내부에서 직접 setState

```typescript
// ❌ 잘못된 예 - 직접 setState
import { useUserStore } from '@entities/user/store';

function LoginButton() {
  const handleClick = () => {
    const userData = { id: 1, name: 'John' };
    useUserStore.setState({ user: userData }); // 직접 호출!
  };
}

// ✅ 올바른 예 - 정의된 액션 사용
import { useUserStore } from '@entities/user/store';

function LoginButton() {
  const setUser = useUserStore((state) => state.setUser);

  const handleClick = () => {
    const userData = { id: 1, name: 'John' };
    setUser(userData); // 액션 사용
  };
}
```

---

## 💡 체크리스트: User Store 사용 시

User store를 사용할 때 다음을 확인하세요:

- [ ] Selector로 필요한 것만 선택했나요?
- [ ] localStorage 동기화가 설정되어 있나요?
- [ ] 타입이 제대로 정의되어 있나요?
- [ ] 직접 setState를 사용하지 않고 액션을 사용했나요?
- [ ] 로그인 상태 체크를 store의 메서드로 만들었나요?
