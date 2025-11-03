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
