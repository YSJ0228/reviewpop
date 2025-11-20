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
      onConfirm={handleCancelReservation}
    >
      <button>예약 취소</button>
    </Modal>
  );
}
```

### variant 프리셋 활용

```typescript
<Modal variant="warning" onConfirm={handleWithdraw}>
  <span>탈퇴하기</span>
</Modal>
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
  onConfirm={handleCancel}
>
  <button>신청 취소</button>
</Modal>
```

## 📝 Props

```typescript
interface ModalProps extends MantineModalProps {
  children: ReactElement; // 모달을 열 트리거 요소
  variant?: 'confirm' | 'warning' | 'outline'; // 버튼 스타일 및 기본 문구 프리셋
  texts?: Partial<ModalContentTexts>; // title/content/confirmButton/cancelButton
  onConfirm: () => Promise<void>; // 확인 버튼 클릭 시 실행 (성공 시 모달 닫힘)
}
```

## 📋 동작 방식

- `children`에 전달한 요소가 트리거가 되며, 클릭 시 모달이 열립니다.
- `variant`에 따라 `primary / warning / outline` 버튼 스타일과 기본 문구가 세팅됩니다.
- `texts`에 전달한 필드만 프리셋 위에 덮어써 원하는 문구만 수정할 수 있습니다.
- 확인 버튼은 `onConfirm` 비동기 함수를 await한 뒤 모달을 닫습니다.
- 취소 버튼은 항상 secondary 스타일이며 즉시 모달을 닫습니다.

## 🎨 스타일

- 폭 288px, 16px 라운드, 화이트 배경 + 그림자
- 제목/본문은 중앙 정렬, 확인/취소 버튼은 가로로 배치
- 버튼 높이 50px, 동일한 너비를 갖도록 flex 적용

## 🔗 사용 위치

- 신청 및 신청/예약 취소 확인 모달
- 탈퇴, 위험 동작 경고
- 기타 확인이 필요한 곳에서 공통 UX 제공
