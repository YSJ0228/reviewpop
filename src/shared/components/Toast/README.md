# Toast 컴포넌트 사용법

Toast 컴포넌트는 사용자에게 알림 메시지를 표시하는 컴포넌트입니다.

## 설치 및 설정

### 1. ToastProvider 설정

`ToastProvider`는 이미 `src/app/providers/Providers.tsx`에 설정되어 있습니다.

```tsx
import { ToastProvider } from '@shared/components/Toast';

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>{children}</ToastProvider>
    </QueryClientProvider>
  );
}
```

### 2. Import

```tsx
import { toast } from '@shared/components';
```

---

## 사용법

### 1. 기본 토스트 (아이콘 없음)

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
- 기본 너비: 344px (고정)
- 기본 자동 닫기: 4초

---

### 2. 성공 토스트

기본적으로 `IconCheckCircle` 아이콘이 자동으로 포함됩니다.

```tsx
// 기본 사용
toast.success('후기 등록이 완료됐어요');

// 옵션 사용
toast.success('저장 완료!', {
  id: 'save-toast', // 업데이트용 ID
  autoClose: 5000,
});
```

**특징:**

- 아이콘: `IconCheckCircle` (청록색 #0FD3D8)
- 기본 너비: 344px (고정)
- 기본 자동 닫기: 4초

---

### 3. 실패 토스트

`IconWarningCircle` 아이콘이 자동으로 추가됩니다.

```tsx
// 기본 사용
toast.error('오류가 발생했습니다');

// 옵션 사용
toast.error('저장에 실패했습니다', {
  autoClose: false, // 자동 닫힘 없음
});
```

**특징:**

- 아이콘: `IconWarningCircle` (주황색 #FF922B)
- 기본 너비: 344px (고정)
- 기본 자동 닫기: 4초

---

### 4. 업데이트 가능한 토스트 (진행 상태 표시용)

진행 상태를 표시하고 나중에 업데이트할 수 있는 토스트입니다.

#### 1) 생성 (id 필수)

```tsx
const toastId = 'process-toast';

toast({
  id: toastId,
  message: '저장 중...',
  autoClose: false, // 자동 닫기 비활성화
});
```

**특징:**

- `id`를 명시하면 자동으로 텍스트 크기에 맞춰서 표시됨 (`fitContent: true`)
- `id`가 없으면 344px 고정 너비

#### 2) 내용 업데이트

```tsx
toast.update(toastId, '처리 중...');
```

**특징:**

- 아이콘이 명시되지 않으면 자동으로 `IconCheckCircle` 추가
- 텍스트 크기에 맞춰서 표시됨
- 기본 자동 닫기: 4초 (업데이트 시)

#### 3) 성공/실패로 업데이트

```tsx
// 방법 1: toast.update 사용 (권장)
toast.update(toastId, '저장 완료!');

// 방법 2: toast.success/error에 같은 id 전달
toast.success('저장 완료!', { id: toastId });
toast.error('저장 실패', { id: toastId });
```

> **참고:** `toast.success/error`에 같은 `id`를 전달하면 기존 토스트를 교체합니다. 하지만 `toast.update()`를 사용하는 것이 더 명확합니다.

---

### 5. 특정 토스트 닫기

```tsx
const toastId = 'my-toast';

toast({ id: toastId, message: '메시지' });

// 특정 토스트 숨기기
toast.hide(toastId);
```

---

### 6. 모든 토스트 닫기

```tsx
toast.clean();
```

---

## 옵션

### IToastOptions

```tsx
interface IToastOptions {
  message: string; // 필수: 표시할 메시지
  id?: string; // 선택: 토스트 ID (같은 ID면 업데이트됨)
  icon?: ReactNode; // 선택: 커스텀 아이콘
  autoClose?: number | false; // 선택: 자동 닫기 시간(ms) 또는 false
  fitContent?: boolean; // 선택: 텍스트 크기에 맞춤 여부
}
```

**옵션 설명:**

- `message`: 표시할 메시지 (필수)
- `id`: 토스트 ID. 같은 ID를 사용하면 기존 토스트를 업데이트하거나 교체합니다
- `icon`: 커스텀 아이콘을 표시할 수 있습니다
- `autoClose`: 자동 닫기 시간(밀리초). `false`로 설정하면 자동으로 닫히지 않습니다. 기본값: 4000ms
- `fitContent`: `true`로 설정하면 텍스트 크기에 맞춰서 표시됩니다. `id`가 명시된 경우 기본값이 `true`입니다

---

## 사용 예시

### 예시 1. API 호출 성공/실패

```tsx
try {
  await submitReview();
  toast.success('후기 등록이 완료됐어요');
} catch (error) {
  toast.error('후기 등록에 실패했습니다');
}
```

---

### 예시 2. 진행 상황 표시

```tsx
const toastId = 'upload-toast';

// 1단계: 진행 중 표시
toast({
  id: toastId,
  message: '업로드 중...',
  autoClose: false,
});

// 2단계: 진행률 업데이트
toast.update(toastId, '업로드 중... 50%');

// 3단계: 완료 표시
toast.update(toastId, '업로드 완료!');
```

---

### 예시 3. React Query와 함께 사용

```tsx
import { useMutation } from '@tanstack/react-query';
import { toast } from '@shared/components';

const createReview = useMutation({
  mutationFn: submitReview,
  onSuccess: () => {
    toast.success('후기 등록이 완료됐어요');
  },
  onError: () => {
    toast.error('후기 등록에 실패했습니다');
  },
});
```

---

### 예시 4. 저장 작업 진행 상태

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
  toast.update(saveToastId, '저장 완료!');
} catch (error) {
  // 저장 실패
  toast.update(saveToastId, {
    message: '저장 실패',
    icon: <IconWarningCircle size={24} color="#FF922B" />,
  });
}
```

---

### 예시 5. Hook 사용 (컴포넌트 내부)

```tsx
import { useToast } from '@shared/components';

function MyComponent() {
  const toast = useToast();

  const handleClick = () => {
    toast.success('클릭했습니다!');
  };

  return <button onClick={handleClick}>클릭</button>;
}
```

---

## 요약

| 상황      | 사용법                       | 아이콘                      | 너비               |
| --------- | ---------------------------- | --------------------------- | ------------------ |
| 기본      | `toast('메시지')`            | 없음                        | 344px (고정)       |
| 기본 (id) | `toast({ id, message })`     | 없음                        | 텍스트 크기에 맞춤 |
| 성공      | `toast.success('메시지')`    | IconCheckCircle (청록색)    | 344px (고정)       |
| 실패      | `toast.error('메시지')`      | IconWarningCircle (주황색)  | 344px (고정)       |
| 업데이트  | `toast.update(id, '메시지')` | IconCheckCircle (자동 추가) | 텍스트 크기에 맞춤 |
| 닫기      | `toast.hide(id)`             | -                           | -                  |
| 모두 닫기 | `toast.clean()`              | -                           | -                  |

**기본 동작:**

- 모든 토스트는 기본적으로 **4초 후 자동으로 닫힙니다**
- `toast()` 함수에서 `id`를 명시하면 **텍스트 크기에 맞춰서 표시**됩니다
- `toast.success/error`는 `id`가 있어도 **344px 고정 너비**입니다
- `toast.update()`는 아이콘이 없으면 **자동으로 IconCheckCircle을 추가**합니다

---

## 주의사항

1. **ToastProvider 필수**: `toast` 함수를 사용하려면 반드시 `ToastProvider`로 앱을 감싸야 합니다.

2. **업데이트 토스트의 id**: 업데이트 가능한 토스트를 만들려면 반드시 `id`를 명시해야 합니다. `id`가 없으면 나중에 업데이트할 수 없습니다.

3. **너비 차이**:
   - `id`가 없는 토스트: 344px 고정 너비
   - `id`가 있는 토스트: 텍스트 크기에 맞춤

4. **같은 id 사용**: 같은 `id`를 사용하면 기존 토스트를 교체하거나 업데이트합니다.
