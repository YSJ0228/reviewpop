# Toast 컴포넌트 사용법

Toast 컴포넌트는 사용자에게 알림 메시지를 표시하는 컴포넌트입니다. `@pop-ui/core`의 toast를 래핑하여 `success`와 `error` 메서드를 추가로 제공합니다.

## 설치 및 설정

### 1. PopUiProvider 설정

`PopUiProvider`는 이미 `src/app/providers/Providers.tsx`에 설정되어 있습니다.

```tsx
import { PopUiProvider } from '@pop-ui/core';

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PopUiProvider notificationPosition="bottom-center">{children}</PopUiProvider>
    </QueryClientProvider>
  );
}
```

**설정 내용:**

- `notificationPosition="bottom-center"`: 토스트가 화면 하단 중앙에 표시됩니다
- 토스트는 자동으로 BottomNavigation 위에 표시되도록 CSS로 조정되어 있습니다 (`globals.scss`)

### 2. Import

```tsx
// 방법 1: shared/components에서 import (권장)
import { toast } from '@shared/components';

// 방법 2: Toast에서 직접 import
import toast from '@shared/components/Toast';
```

---

## 기본 사용법

### 1. 기본 토스트

문자열을 직접 전달하거나 옵션 객체를 전달할 수 있습니다.

```tsx
// 간단한 메시지
toast('작업이 완료되었습니다');

// 옵션과 함께
toast({
  message: '알림 메시지',
  autoClose: 3000, // 3초 후 자동 닫기
});
```

**특징:**

- 아이콘 없음
- 너비: 텍스트 크기에 맞춤 (fit-content)
- 기본 자동 닫기: 4초

---

### 2. 성공 토스트

`IconCheckCircle` 아이콘이 자동으로 포함됩니다.

```tsx
// 기본 사용
toast.success('후기 등록이 완료됐어요');

// 옵션 사용
toast.success('저장 완료!', {
  id: 'save-toast',
  autoClose: 5000, // 5초 후 자동 닫기
});
```

**특징:**

- 아이콘: `IconCheckCircle` (청록색 `ColorAqua500`, 크기 24px)
- 너비: 텍스트 크기에 맞춤 (fit-content)
- 기본 자동 닫기: 4초

---

### 3. 에러 토스트

`IconWarningCircle` 아이콘이 자동으로 추가됩니다.

```tsx
// 기본 사용
toast.error('오류가 발생했습니다');

// 옵션 사용
toast.error('저장에 실패했습니다', {
  id: 'error-toast',
  autoClose: false, // 자동 닫기 비활성화
});
```

**특징:**

- 아이콘: `IconWarningCircle` (주황색 `ColorOrange500`, 크기 24px)
- 너비: 텍스트 크기에 맞춤 (fit-content)
- 기본 자동 닫기: 4초

---

## 옵션 (IToastOptions)

```tsx
interface IToastOptions {
  message: string; // 필수: 표시할 메시지
  id?: string; // 선택: 토스트 ID (같은 ID로 업데이트 가능)
  icon?: ReactNode; // 선택: 커스텀 아이콘 (기본 토스트에서만 사용)
  autoClose?: number | false; // 선택: 자동 닫기 시간(ms) 또는 false
}
```

**옵션 설명:**

- `message`: 표시할 메시지 (필수)
- `id`: 토스트 ID를 지정하면 같은 ID로 호출 시 기존 토스트가 업데이트됩니다
- `icon`: 커스텀 아이콘을 표시할 수 있습니다 (기본 토스트에서만 사용, `toast.success()`와 `toast.error()`에서는 사용 불가)
- `autoClose`: 자동 닫기 시간(밀리초). `false`로 설정하면 자동으로 닫히지 않습니다. 기본값: 4000ms

---

## 고급 사용법

### 1. 토스트 업데이트

같은 `id`를 사용하여 토스트를 업데이트할 수 있습니다.

```tsx
// 처음 표시
toast({
  id: 'upload-toast',
  message: '업로드 중... 0%',
  autoClose: false,
});

// 진행률 업데이트
toast.update('upload-toast', '업로드 중... 50%');

// 완료 표시 (아이콘 포함)
toast.update('upload-toast', {
  message: '업로드 완료!',
  icon: <IconCheckCircle size={24} color={ColorAqua500} />,
});
```

### 2. 토스트 닫기

```tsx
// 특정 토스트 닫기
toast.hide('upload-toast');

// 모든 토스트 닫기
toast.clean();
```

### 3. 자동 닫기 비활성화

```tsx
toast({
  message: '이 토스트는 자동으로 닫히지 않습니다',
  autoClose: false,
});
```

### 4. 커스텀 아이콘 (기본 토스트만)

```tsx
import { IconInfoCircle } from '@pop-ui/foundation';
import { ColorBlue500 } from '@pop-ui/foundation';

toast({
  message: '정보 메시지입니다',
  icon: <IconInfoCircle size={24} color={ColorBlue500} />,
});
```

**참고:** `toast.success()`와 `toast.error()`는 아이콘이 자동으로 포함되므로 `icon` 옵션을 전달할 수 없습니다.

---

## 실제 사용 예시

### 예시 1: 버튼 클릭 시

```tsx
'use client';

import { Button } from '@shared/components/Button';
import { toast } from '@shared/components';

export default function MyPage() {
  const handleSave = async () => {
    try {
      await saveData();
      toast.success('저장되었습니다!');
    } catch (error) {
      toast.error('저장에 실패했습니다.');
    }
  };

  return <Button onClick={handleSave}>저장</Button>;
}
```

### 예시 2: React Query와 함께

```tsx
'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from '@shared/components';

export function useCreateReview() {
  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success('후기가 등록되었습니다!');
    },
    onError: () => {
      toast.error('후기 등록에 실패했습니다.');
    },
  });
}
```

### 예시 3: 진행 상태 업데이트

```tsx
'use client';

import { toast } from '@shared/components';
import { IconCheckCircle } from '@pop-ui/foundation';
import { ColorAqua500 } from '@pop-ui/foundation';

export function MyComponent() {
  const handleUpload = async () => {
    const toastId = 'upload-toast';

    // 시작
    toast({
      id: toastId,
      message: '업로드 중... 0%',
      autoClose: false,
    });

    // 진행률 업데이트
    for (let i = 1; i <= 100; i++) {
      await uploadProgress(i);
      toast.update(toastId, `업로드 중... ${i}%`);
    }

    // 완료 표시 (아이콘 포함)
    toast.update(toastId, {
      message: '업로드 완료!',
      icon: <IconCheckCircle size={24} color={ColorAqua500} />,
    });
  };

  return <button onClick={handleUpload}>업로드</button>;
}
```

### 예시 4: 저장 작업 진행 상태

```tsx
const saveToastId = 'save-operation';

// 저장 시작
toast({
  id: saveToastId,
  message: '저장 중...',
  autoClose: false,
});

try {
  await saveData();
  // 저장 성공
  toast.success('저장 완료!', { id: saveToastId });
} catch (error) {
  // 저장 실패
  toast.error('저장 실패', { id: saveToastId });
}
```

---

## 사용 가능한 메서드

### `toast(message | options)`

기본 토스트를 표시합니다.

```tsx
toast('메시지');
toast({ message: '메시지', icon: <Icon />, autoClose: 3000 });
```

### `toast.success(message, options?)`

성공 토스트를 표시합니다. 아이콘이 자동으로 포함됩니다.

```tsx
toast.success('성공 메시지');
toast.success('성공 메시지', { id: 'toast-id', autoClose: 5000 });
```

**참고:** `icon` 옵션은 사용할 수 없습니다. `IconCheckCircle`이 자동으로 포함됩니다.

### `toast.error(message, options?)`

에러 토스트를 표시합니다. 아이콘이 자동으로 포함됩니다.

```tsx
toast.error('에러 메시지');
toast.error('에러 메시지', { id: 'toast-id', autoClose: false });
```

**참고:** `icon` 옵션은 사용할 수 없습니다. `IconWarningCircle`이 자동으로 포함됩니다.

### `toast.update(id, message | options)`

기존 토스트를 업데이트합니다.

```tsx
toast.update('toast-id', '업데이트된 메시지');
toast.update('toast-id', {
  message: '업데이트된 메시지',
  icon: <IconCheckCircle size={24} color={ColorAqua500} />,
});
```

**참고:** `toast.update()`를 사용할 때 아이콘을 표시하려면 `icon` 옵션에 명시적으로 전달해야 합니다.

### `toast.hide(id)`

특정 ID의 토스트를 닫습니다.

```tsx
toast.hide('toast-id');
```

### `toast.clean()`

모든 토스트를 제거합니다.

```tsx
toast.clean();
```

---

## 주의사항

1. **PopUiProvider 필수**: `toast` 함수를 사용하려면 반드시 `PopUiProvider`로 앱을 감싸야 합니다. 이미 `src/app/providers/Providers.tsx`에 설정되어 있습니다.

2. **아이콘 자동 추가**: `toast.success()`와 `toast.error()`는 아이콘이 자동으로 포함됩니다. `icon` 옵션을 전달할 수 없습니다.

3. **토스트 위치**: 토스트는 화면 하단 중앙(`bottom-center`)에 표시되며, BottomNavigation 위에 자동으로 배치됩니다. (`globals.scss`에서 CSS로 조정)

4. **업데이트 시 아이콘**: `toast.update()`를 사용할 때 아이콘을 표시하려면 `icon` 옵션에 명시적으로 전달해야 합니다. 자동으로 추가되지 않습니다.

5. **자동 닫기**: 기본적으로 4초 후 자동으로 닫힙니다. `autoClose: false`로 설정하면 수동으로 닫아야 합니다.

6. **타입**: TypeScript를 사용하는 경우, 타입은 `@shared/components`에서 import할 수 있습니다:
   ```tsx
   import type { IToastOptions, TToastInput } from '@shared/components';
   ```

---

## 요약

**기본 동작:**

- 모든 토스트는 기본적으로 **4초 후 자동으로 닫힙니다** (`autoClose` 옵션으로 변경 가능)
- 모든 토스트는 **텍스트 크기에 맞춰서 표시**됩니다 (fit-content)
- 토스트는 **화면 하단 중앙**에 표시되며, **BottomNavigation 위**에 배치됩니다

**권장 사용법:**

- 성공 메시지: `toast.success('메시지')`
- 에러 메시지: `toast.error('메시지')`
- 일반 메시지: `toast('메시지')` 또는 `toast({ message: '메시지', ... })`
- 진행 상태: `id`를 사용하여 `toast.update()`로 업데이트
