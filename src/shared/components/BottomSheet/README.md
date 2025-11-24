# BottomSheet 컴포넌트

## 📌 컴포넌트 설명

BottomSheet는 화면 하단에서 자연스럽게 슬라이드되어 나타나는 바텀 시트 UI 컴포넌트입니다.
opened와 onClose를 외부에서 제어하도록 설계되어 있으며, 제목, 높이, 닫기 버튼 여부 등을 옵션으로 제공해 다양한 화면에서 재사용할 수 있습니다.
내부 콘텐츠는 children으로 전달되며, 카드 목록, 입력 폼 등 원하는 UI를 자유롭게 배치할 수 있습니다

---

## 🎯 주요 기능

- Mantine Drawer 기반 바텀시트 구현
- 부모 컴포넌트에서 열림/닫힘 상태 외부 제어 (opened, open, close - useDisclosure)
- 제목 표시(title) + 제목 폰트 크기 조절 (titleSize)
- 바텀시트 전체 높이 지정 (height)
- 닫기 버튼 표시 여부 설정 (withCloseButton)
- 내부 콘텐츠는 children으로 자유롭게 구성

---

## 🔧 사용 예시

```tsx
import { useDisclosure } from '@mantine/hooks';
import { BottomSheet } from './BottomSheet';

export function Example() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <button onClick={open}>BottomSheet 열기</button>

      <BottomSheet opened={opened} onClose={close} title="설정" titleSize={22} height={500}>
        <p>여기에 원하는 내용을 넣으세요.</p>
      </BottomSheet>
    </>
  );
}
```
