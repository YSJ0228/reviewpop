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
