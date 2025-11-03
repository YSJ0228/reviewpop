# Shared UI Components (공유 UI 컴포넌트)

## 📌 이 폴더는 무엇인가요?

프로젝트 전체에서 **재사용 가능한 UI 컴포넌트**를 모아둔 폴더입니다.
디자인 시스템의 역할을 합니다.

## 📁 폴더 구조

```
ui/
├── Button/
│   ├── Button.tsx
│   ├── Button.module.scss
│   └── index.ts
├── Input/
│   ├── Input.tsx
│   ├── Input.module.scss
│   └── index.ts
└── Card/
    ├── Card.tsx
    ├── Card.module.scss
    └── index.ts
```

## ✅ 여기에 넣어야 하는 컴포넌트

- ✅ Button, Input, Checkbox 같은 기본 UI
- ✅ Card, Modal, Dropdown 같은 레이아웃 컴포넌트
- ✅ 프로젝트 전체에서 동일한 디자인으로 사용되는 것
- ✅ 특정 비즈니스 로직이 없는 순수 UI

## ❌ 여기에 넣으면 안 되는 컴포넌트

- ❌ ReviewCard, ProductCard (비즈니스 로직 포함) → features/에
- ❌ Header, Footer (특정 레이아웃) → 프로젝트 규모에 따라 shared/ui 또는 별도 layout/
- ❌ API 호출이나 전역 상태 사용 → features/에

## 📝 사용 예시

### 1. 버튼 사용

```typescript
import { Button } from '@shared/ui/Button';

function MyPage() {
  return (
    <Button variant="primary" onClick={handleClick}>
      클릭하세요
    </Button>
  );
}
```

### 2. 인풋 사용

```typescript
import { Input } from '@shared/ui/Input';

function LoginForm() {
  return (
    <Input
      type="email"
      placeholder="이메일을 입력하세요"
      onChange={handleChange}
    />
  );
}
```

## 🚀 새로운 컴포넌트 추가하기

1. 컴포넌트 폴더 생성 (예: `Checkbox/`)
2. `ComponentName.tsx` 파일 작성
3. `ComponentName.module.scss` 스타일 작성
4. `index.ts`에서 export
5. TypeScript Props 타입 정의

## 💡 개발 팁

- **재사용성**: 특정 기능에 종속되지 않도록 범용적으로 만들기
- **Props**: 유연하게 커스터마이징 가능하도록 충분한 props 제공
- **스타일**: SCSS 모듈 사용으로 스타일 충돌 방지
- **접근성**: aria-label, role 등 접근성 속성 추가
