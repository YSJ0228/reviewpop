# BottomSheet 컴포넌트

## 📌 컴포넌트 설명

BottomSheet는 화면 하단에서 자연스럽게 슬라이드되어 나타나는 바텀 시트 UI 컴포넌트입니다.
opened와 onClose를 외부에서 제어하도록 설계되어 있으며, 제목, 높이, 닫기 버튼 여부 등을 옵션으로 제공해 다양한 화면에서 재사용할 수 있습니다.
내부 콘텐츠는 children으로 전달되며, 카드 목록, 입력 폼 등 원하는 UI를 자유롭게 배치할 수 있습니다.

**11/26 추가)** footer prop을 통해 하단에 고정된 푸터 영역을 추가할 수 있으며, footer가 있을 경우 콘텐츠 영역은 스크롤 가능한 영역으로 자동 설정됩니다.

---

## 🎯 주요 기능

- Mantine Drawer 기반 바텀시트 구현
- 부모 컴포넌트에서 열림/닫힘 상태 외부 제어 (opened, open, close - useDisclosure)
- 제목 표시(title) + 제목 폰트 크기 조절 (titleSize)
- 바텀시트 전체 높이 지정 (height)
- 닫기 버튼 표시 여부 설정 (withCloseButton)
- 내부 콘텐츠는 children으로 자유롭게 구성

**11/26 추가)** - 하단 푸터 영역 추가 (footer) - footer가 있을 경우 콘텐츠 영역은 스크롤 가능, 푸터는 하단 고정

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

```tsx
// Footer가 있는 경우
<BottomSheet
  opened={opened}
  onClose={close}
  title="캠페인 선택"
  height={600}
  footer={
    <Button onClick={close} fullWidth>
      확인
    </Button>
  }
>
  <div>
    {/* 스크롤 가능한 콘텐츠 영역 */}
    <p>콘텐츠가 많아도 스크롤됩니다.</p>
  </div>
</BottomSheet>
```
