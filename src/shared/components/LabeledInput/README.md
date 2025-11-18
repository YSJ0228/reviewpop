# LabeledInput 컴포넌트

## 📌 컴포넌트 설명

`LabeledInput`은 **라벨 + 입력창 + 버튼**으로 구성된 폼 UI 컴포넌트입니다.  
입력 타입(`name`, `phone`, `url`)에 따라 **유효성 검사**가 자동 적용되며  
옵션에 따라 **URL 존재 여부 확인 버튼**을 사용할 수 있습니다.

---

## 🎯 주요 기능

- `inputType`에 따라 자동 유효성 검사 (`name`, `phone`, `url`)
- focus out 했을 때 에러 메시지 표시
- 버튼(`isButton=true`) 사용 시 URL 존재 확인 버튼 구현
- `isText=true`일 경우 입력값 미리보기 UI 제공
  예: `blog.naver.com/아이디`
- 입력값은 부모 컴포넌트에서 관리 (`text`, `setText`)
- 성공/에러 메시지 UI 제공
- CORS 문제로 실제 블로그 확인은 되지 않음

---

## 🔧 사용 예시

```tsx
import { useState } from 'react';
import { LabeledInput } from './LabeledInput';

function Example() {
  const [blogId, setBlogId] = useState('');

  return (
    <LabeledInput
      label="블로그 주소"
      placeholder="네이버 블로그 아이디 입력"
      isText={true}
      isButton={true}
      text={blogId}
      setText={setBlogId}
      inputType="url"
    />
  );
}
```
