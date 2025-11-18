# WebButton 컴포넌트

## 📌 컴포넌트 설명

라벨과 입력창, 버튼이 결합된 UI 컴포넌트입니다.  
`buttonType`에 따라 버튼 텍스트, 아이콘, 스타일이 자동으로 변경되어 다양한 상황에 맞게 활용할 수 있습니다.

---

## 🎯 주요 기능

- `copy`, `edit`, `connect` 세 가지 버튼 타입 지원
- 타입에 따른 버튼 텍스트 및 아이콘 자동 표시
- `edit`, `connect` 타입일 때 입력창 왼쪽에 블로그 로고 이미지 노출
- `isConnected` 플래그로 라벨 옆에 연결 상태 표시 (`연결됨` 텍스트, 필요 시 사용)
- 입력값 관리 (`text` props로 컨트롤 가능)
- 버튼 스타일을 `buttonType`에 맞춰 동적 적용
- 입력값은 변동되지 않음(기능 필요 x)

---

## 🔧 사용 예시

```tsx
import { WebButton } from './WebButton';

function Example() {
  const text = 'blog.naver.com';

  return (
    <WebButton
      buttonType="connect"
      label="블로그 주소"
      text={text}
      onClick={() => setIsModal(true)}
    />
  );
}
```
