# LoadingSpinner (로딩 스피너)

## 📌 컴포넌트 설명

데이터 로딩 중임을 나타내는 스피너 컴포넌트입니다.

Suspense fallback 또는 데이터 fetching 중에 사용됩니다.

## 🎯 주요 기능

- 회전 애니메이션
- 크기 옵션 (small, medium, large)
- 메시지 표시 (선택적)

## 🔧 사용 예시

### 기본 사용법

```typescript
import { LoadingSpinner } from '@shared/components/LoadingSpinner';

function MyComponent() {
  return (
    <div>
      <LoadingSpinner />
    </div>
  );
}
```

### Suspense fallback으로 사용

```typescript
import { Suspense } from 'react';
import { LoadingSpinner } from '@shared/components/LoadingSpinner';

function Page() {
  return (
    <Suspense fallback={<LoadingSpinner message="데이터를 불러오는 중..." />}>
      <DataComponent />
    </Suspense>
  );
}
```

### 크기 옵션

```typescript
// 작은 크기
<LoadingSpinner size="small" />

// 중간 크기 (기본값)
<LoadingSpinner size="medium" />

// 큰 크기
<LoadingSpinner size="large" />
```

### 메시지 표시

```typescript
<LoadingSpinner message="체험 목록을 불러오는 중..." />
```

## 📝 Props

```typescript
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'; // 기본값: 'medium'
  message?: string; // 선택적 메시지
}
```

## ✅ 구현 체크리스트

- [x] 기본 스피너 애니메이션
- [x] 크기 옵션 (small, medium, large)
- [x] 메시지 표시
- [ ] 디자인 시스템 색상 적용
- [ ] 색상 옵션 추가 (선택적)

## 💡 개선 아이디어

### 색상 옵션 추가

```typescript
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
  message?: string;
}
```

### 풀페이지 로딩

전체 화면을 덮는 로딩 스피너:

```typescript
interface LoadingSpinnerProps {
  // ...
  fullPage?: boolean;
}

// fullPage일 때
<div className={styles.fullPageOverlay}>
  <LoadingSpinner />
</div>
```

## 🎨 디자인 가이드

### 크기

- **small**: 24px - 인라인 요소용
- **medium**: 40px - 일반 로딩 (기본값)
- **large**: 60px - 전체 페이지 로딩

### 색상

- 기본: 프라이머리 컬러 (blue-500)
- 배경: 밝은 회색 (#f3f3f3)

### 애니메이션

- 회전 속도: 1초/회전
- Easing: linear

## 🔗 사용 위치

- 페이지 전체: Suspense fallback
- 데이터 로딩: 목록, 상세 페이지 등
- 버튼 로딩: 폼 제출 중 (small 크기)
- API 요청 중: 모든 비동기 작업

## 📱 접근성

- `aria-label` 또는 `role="status"` 추가 고려
- 스크린 리더를 위한 로딩 메시지
