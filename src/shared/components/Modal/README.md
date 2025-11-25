# Modal

## 📌 컴포넌트 설명

Mantine `Modal`을 래핑한 확인/취소 액션 모달 컴포넌트입니다. 트리거 요소를 클릭하면 모달이 열리고, variant에 따라 버튼 스타일과 기본 문구 프리셋이 적용됩니다. 필요한 문구는 `texts`로 부분 오버라이드할 수 있습니다.

## 🎯 주요 기능

- `variant` 기반 버튼 스타일 및 문구 프리셋 (confirm, warning, outline)
- `texts` prop으로 문구 부분 커스터마이징
- 비동기 `onConfirm` 핸들러 지원
- 모달 외부/취소 버튼으로 닫기 처리
- Link 내부 사용 시 이벤트 버블링 자동 차단

## 🔧 사용 예시

```typescript
import { Modal } from '@shared/components/Modal';

function CancelReservationButton() {
  return (
    <Modal
      variant="confirm"
      texts={{
        // 기본 preset에서 content만 덮어쓰기
        content: '다시 신청하려면 모집 기간 내에 가능합니다.',
      }}
      trigger={<button>예약 취소</button>}
      onConfirm={handleCancelReservation}
    />
  );
}
```

### variant 프리셋 활용

```typescript
<Modal
  variant="warning"
  trigger={<span>탈퇴하기</span>}
  onConfirm={handleWithdraw}
/>
```

### 모든 문구를 직접 전달

```typescript
<Modal
  variant="outline"
  texts={{
    title: '정말 신청을 취소할까요?',
    content: '취소 후에도 다시 신청할 수 있어요.',
    confirmButton: '신청 취소',
    cancelButton: '닫기',
  }}
  trigger={<button>신청 취소</button>}
  onConfirm={handleCancel}
/>
```

### Link 내부에서 사용

> `Link`(`<a>`) 태그 내부에서는 `trigger`로 `<button>`을 사용할 수 없습니다 (Hydration Error).
> `<span role="button">`을 사용하세요.

```tsx
<Link href="/detail">
  <div className="card">
    <h2>상품명</h2>
    <Modal variant="outline" trigger={<span role="button">취소</span>} onConfirm={handleCancel} />
  </div>
</Link>
```

### Variant 종류

```tsx
// 확인 (--primary 색상)
<Modal variant="confirm" trigger={<span>신청</span>} onConfirm={handleApply} />

// 경고 (--danger 색상)
<Modal variant="warning" trigger={<span>탈퇴</span>} onConfirm={handleWithdraw} />

// 아웃라인 (--gray 색상)
<Modal variant="outline" trigger={<span>취소</span>} onConfirm={handleCancel} />
```

## 📝 Props

```typescript
interface ModalProps extends Omit<MantineModalProps, 'onClose' | 'opened'> {
  /** 모달을 열기 위한 트리거 요소 */
  trigger: ReactElement;
  /** 확인 버튼 클릭 시 실행될 핸들러 */
  onConfirm: () => void | Promise<void>;
  /** 모달 유형과 텍스트 프리셋, 버튼 스타일을 함께 결정 */
  variant?: ModalVariant;
  // confirm : 신청, warning : 탈퇴, outline : 예약/신청 취소
  /** 텍스트 프리셋을 부분적으로 덮어쓸 ModalContentTexts */
  texts?: Partial<ModalContentTexts>;
}
```

`MantineModalProps`를 상속받으므로 `closeOnClickOutside`, `size` 등 Mantine Modal 옵션 사용 가능합니다.

## 🔒 이벤트 버블링 처리

Link 내부에서 안전하게 동작하도록 2단계 방어:

1. **Trigger 클릭**: `stopPropagation` + `preventDefault`로 상위 Link 이벤트 차단
2. **Portal 보호**: Mantine Modal을 wrapper div로 감싸서 React Event Tree 버블링 차단

결과적으로 모든 모달 상호작용(trigger 클릭, 버튼 클릭, 오버레이 클릭)에서 Link 이동이 발생하지 않습니다.
