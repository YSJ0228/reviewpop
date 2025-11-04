# Auth Feature (인증 기능)

## 📌 이 폴더는 무엇인가요?

로그인, 로그아웃 등 **인증 관련 모든 기능**을 관리하는 폴더입니다.
현재는 카카오 소셜 로그인을 지원합니다.

## 📁 폴더 구조

```
auth/
├── components/          # 인증 관련 컴포넌트
│   └── KakaoLoginButton/
│       ├── index.tsx
│       ├── types.ts
│       └── utils.ts
└── README.md
```

## 🎯 주요 기능

- [x] 카카오 소셜 로그인
- [ ] 로그아웃
- [ ] 회원가입 (향후 추가 예정)

## 📝 사용 예시

### 1. 카카오 로그인 버튼 사용

```typescript
import { KakaoLoginButton } from '@features/auth';

export default function LoginPage() {
  return (
    <div>
      <h1>로그인</h1>
      <KakaoLoginButton />
    </div>
  );
}
```

### 2. 로그인 성공 후 동작

카카오 로그인이 성공하면:

1. OAuth 인증 코드를 받아옴
2. 백엔드 API에 인증 코드 전송
3. 백엔드에서 액세스 토큰 발급
4. 사용자 정보를 `@entities/user/store`에 저장
5. 메인 페이지로 리다이렉트

## 💡 개발 팁

### OAuth 흐름 이해하기

```
1. 사용자가 "카카오 로그인" 버튼 클릭
   ↓
2. 카카오 로그인 페이지로 이동
   ↓
3. 사용자가 카카오 계정으로 로그인
   ↓
4. 카카오가 인증 코드(code) 발급
   ↓
5. 우리 앱이 인증 코드를 받아서 백엔드로 전송
   ↓
6. 백엔드가 카카오에 액세스 토큰 요청
   ↓
7. 사용자 정보를 받아서 로그인 완료
```

### 환경 변수 설정

카카오 로그인을 사용하려면 `.env.local`에 다음 값이 필요합니다:

```bash
NEXT_PUBLIC_KAKAO_CLIENT_ID=your_kakao_client_id
NEXT_PUBLIC_KAKAO_REDIRECT_URI=http://localhost:3000/login
```

> 💡 카카오 개발자 콘솔(https://developers.kakao.com)에서 앱을 생성하고 Client ID를 발급받으세요.

## ❌ 자주 하는 실수

### 실수 1: 환경 변수 설정 누락

```typescript
// ❌ 잘못된 예 - 환경 변수 없이 사용
const clientId = 'hard-coded-id'; // 절대 하드코딩 금지!

// ✅ 올바른 예 - 환경 변수 사용
const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
```

**왜 중요한가요?**

- 하드코딩하면 보안 취약점 발생
- Git에 Client ID가 노출됨
- 환경별로 다른 설정을 사용할 수 없음

### 실수 2: 리다이렉트 URI 불일치

```typescript
// ❌ 잘못된 예 - 카카오 콘솔 설정과 다른 URI
NEXT_PUBLIC_KAKAO_REDIRECT_URI=http://localhost:3000/auth/callback

// 카카오 개발자 콘솔 설정: http://localhost:3000/login
// → OAuth 에러 발생!

// ✅ 올바른 예 - 카카오 콘솔과 동일한 URI
NEXT_PUBLIC_KAKAO_REDIRECT_URI=http://localhost:3000/login
```

**해결 방법:**

1. 카카오 개발자 콘솔 → 내 애플리케이션 → 카카오 로그인 → Redirect URI 확인
2. `.env.local`의 `NEXT_PUBLIC_KAKAO_REDIRECT_URI`와 일치시키기

### 실수 3: 사용자 정보를 로컬 상태에만 저장

```typescript
// ❌ 잘못된 예 - 컴포넌트 state에만 저장
function LoginPage() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const userData = await login();
    setUser(userData); // 페이지 새로고침하면 사라짐!
  };
}

// ✅ 올바른 예 - 전역 store에 저장
import { useUserStore } from '@entities/user/store';

function LoginPage() {
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async () => {
    const userData = await login();
    setUser(userData); // 앱 전체에서 사용 가능
  };
}
```

### 실수 4: 다른 feature의 컴포넌트 import

```typescript
// ❌ 잘못된 예 - 다른 feature import 금지!
import { ReviewCard } from '@features/review/components/ReviewCard';

// ✅ 올바른 예 - shared 컴포넌트 사용
import { Button } from '@shared/components/Button';
import { useUserStore } from '@entities/user/store'; // entities는 OK
```

## 🔗 관련 문서

- [카카오 로그인 공식 문서](https://developers.kakao.com/docs/latest/ko/kakaologin/common)
- [사용자 엔티티 가이드](../../entities/user/README.md)
- [FSD 아키텍처 가이드](../README.md)
