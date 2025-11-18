# Button (공통 버튼)

## 📌 컴포넌트 설명

프로젝트 전반에서 사용하는 기본 버튼 래퍼입니다. 공통 색상/크기 규칙과 인터랙션을 한 곳에서 관리해, 디자인 시스템을 일관되게 적용할 수 있도록 합니다.

## 🎯 주요 기능

- `variant`에 따른 스타일 변형 (primary, secondary, outline, text, warning)
- `size` 옵션 (small, medium, large)
- `fullWidth` 지원으로 레이아웃에 맞춘 확장
- 기본 HTML button 속성(onClick, disabled, type 등) 그대로 전달

## 🔧 사용 예시

### 기본 버튼

```typescript
import { Button } from '@shared/components/Button';

<Button onClick={handleSubmit}>제출하기</Button>;
```

### Variant & Size 지정

```typescript
<Button variant="warning" size="large" onClick={handleDangerAction}>
  위험 동작
</Button>

<Button variant="outline" size="small" type="button">
  취소
</Button>
```

### 전체 너비 버튼

```typescript
<Button fullWidth onClick={handleConfirm}>
  확인
</Button>
```

## 📝 Props

```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'warning';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}
```

## 📋 Variant & Size 세부 정보

- **primary**: 브랜드 기본 색상, 흰색 텍스트
- **secondary**: 흰 배경 + 연한 테두리, 회색 텍스트
- **outline**: 흰 배경 + 회색 테두리, 강조 색상 텍스트
- **warning**: 에러 컬러 배경, 흰 텍스트
- **text**: 스타일 경량화(필요 시 확장 예정)

크기 규칙:

- **small**: 32px 높이, 14px 폰트
- **medium**: 44px 높이, 16px 폰트 (기본)
- **large**: 52px 높이, 18px 폰트

`fullWidth`를 사용하면 버튼이 부모 요소 너비를 모두 차지합니다.

## 🎨 스타일 가이드

- 둥근 모서리(10px), inline-flex 정렬, 8px 아이콘/텍스트 간격
- hover 시 살짝 떠오르는 효과(translateY, box-shadow)
- disabled 상태는 opacity 0.5 + 커서 비활성화
- variant/size 조합은 BEM 네이밍(`Button--Primary`, `Button--Medium`)으로 SCSS 클래스 매핑
