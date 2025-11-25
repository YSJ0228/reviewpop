# Modal (커스텀 확인 모달)

## 📌 컴포넌트 설명

Mantine `Modal`을 래핑하여 확인/취소 액션을 간편하게 구성하는 컴포넌트입니다. 트리거 요소를 클릭하면 모달이 열리고, variant에 따라 버튼 스타일과 기본 문구 프리셋이 적용됩니다. 필요한 문구는 `texts`로 부분 오버라이드할 수 있습니다.

## 🎯 주요 기능

- Mantine `Modal` 기반의 공통 확인 모달 제공
- `variant`에 따른 버튼 스타일 및 문구 프리셋
- `texts` prop으로 제목·내용·버튼 문구 부분 덮어쓰기
- 확인 버튼에 비동기 핸들러 연결
- 모달 외부/취소 버튼으로 닫기 처리

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
      trigger={<button className={styles.~~__Button}>예약 취소</button>}
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

````typescript
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
## 📝 Props

```typescript
interface ModalProps extends Omit<MantineModalProps, 'onClose' | 'opened'> {
  /** 모달을 열기 위한 트리거 요소 */
  trigger: ReactElement;
  /** 확인 버튼 클릭 시 실행될 핸들러 */
  onConfirm: () => void | Promise<void>;
  /** 모달 유형과 버튼 스타일을 함께 결정 */
  variant?: ModalVariant;
  /** 프리셋을 부분적으로 덮어쓸 ModalContentTexts */
  texts?: Partial<ModalContentTexts>;
}
```

`ModalProps`는 `MantineModalProps`를 상속받으므로, `closeOnClickOutside`, `size` 등 Mantine Modal의 모든 props를 사용할 수 있습니다.

## 📋 동작 방식

Modal 컴포넌트는 **2단계 이벤트 버블링 방지 전략**을 사용하여 Link 내부에서도 안전하게 동작합니다.

### 1단계: Trigger 클릭 시
`trigger` 요소에 주입되는 `onClick` 핸들러에서:
```tsx
e.stopPropagation(); // 상위 요소(Link 등)로 이벤트 전파 차단
e.preventDefault();   // 기본 동작 방지
open();              // 모달 열기
```

### 2단계: Portal 이벤트 보호
Mantine Modal은 Portal을 사용하지만, **React Event Tree** 상에서는 여전히 부모-자식 관계가 유지되어 이벤트가 버블링됩니다. 이를 방지하기 위해 Modal을 감싸는 wrapper div에서 모든 클릭 이벤트를 차단합니다.

```tsx
<div onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
  <MantineModal>...</MantineModal>
</div>
```

이로 인해:
- ✅ Trigger 클릭 → Link 이동 안 됨
- ✅ 모달 버튼 클릭 → Link 이동 안 됨
- ✅ 모달 오버레이 클릭 → Link 이동 안 됨

### 전체 흐름
1. **Trigger 렌더링**: `cloneElement`로 trigger에 `onClick` 핸들러 주입
2. **Trigger 클릭**: 이벤트 전파 차단 + 모달 열기
3. **모달 동작**: Portal 내부 이벤트도 wrapper가 보호
4. **확인/취소**:
   - **확인**: `onConfirm` 실행 → 성공 시 모달 닫힘
   - **취소**: 모달 즉시 닫힘

> [!IMPORTANT]
> **Link 내부에서 사용 시 주의사항**
> `Link`(`<a>`) 태그 내부에서 모달을 사용할 경우, `trigger` 요소로 `<button>`을 사용하면 **유효하지 않은 HTML**이 됩니다 (Hydration Error 발생 가능).
>
> **해결책**: `<span role="button">`을 사용하여 웹 표준을 준수하면서 버튼처럼 동작하게 만드세요.
> ```tsx
> <Modal
>   trigger={<span role="button" className="btn-style">신청 취소</span>}
>   onConfirm={handleCancel}
> />
> ```

## 💡 사용 예시

### Link 내부에서 사용 시 (권장 패턴)
```tsx
<Link href="/campaign/123">
  <div className="card">
    <h2>상품명</h2>
    <Modal
      variant="outline"
      onConfirm={handleCancel}
      trigger={
        <span role="button" className={styles.CancelButton}>
          신청 취소
        </span>
      }
    />
  </div>
</Link>
```

### 일반적인 경우
```tsx
<Modal
  variant="confirm"
  texts={{
    title: '정말 삭제하시겠습니까?',
    content: '삭제된 데이터는 복구할 수 없습니다.',
  }}
  trigger={<Button>삭제</Button>}
  onConfirm={handleDelete}
/>
```

### 모든 프리셋 Variant 활용
```tsx
// 확인 (파란색 버튼)
<Modal variant="confirm" trigger={<span>신청하기</span>} onConfirm={handleApply} />

// 경고 (빨간색 버튼)
<Modal variant="warning" trigger={<span>탈퇴하기</span>} onConfirm={handleWithdraw} />

// 아웃라인 (회색 테두리 버튼)
<Modal variant="outline" trigger={<span>취소</span>} onConfirm={handleCancel} />
```



## 🎨 스타일

- 폭 288px, 16px 라운드, 화이트 배경 + 그림자
- 제목/본문은 중앙 정렬, 확인/취소 버튼은 가로로 배치
- 버튼 높이 50px, 동일한 너비를 갖도록 flex 적용

## 🔗 사용 위치

- 신청 및 신청/예약 취소 확인 모달
- 탈퇴, 위험 동작 경고
- 기타 확인이 필요한 곳에서 공통 UX 제공
````
