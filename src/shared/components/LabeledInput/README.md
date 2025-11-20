# LabeledInput 컴포넌트

## 📌 컴포넌트 설명

`LabeledInput`은 **라벨 + 입력창 + 버튼**으로 구성된 폼 UI 컴포넌트입니다.  
useInputValidate 훅을 이용해 타입(name, phone, url)에 따른 적절한 에러메시지를 받아 **유효성 검사**가 자동 적용되며 옵션에 따라 **URL 존재 여부 확인 버튼**을 사용할 수 있습니다.

---

## 🎯 주요 기능

- `inputType`에 따라 자동 유효성 검사 (`name`, `phone`, `url`)
- focus out 했을 때 에러 메시지 표시
- 버튼(`showButton=true`) 사용 시 URL 존재 확인 버튼 구현
- `showPreview=true`일 경우 입력값 미리보기 UI 제공
  예: `blog.naver.com/아이디`
- 입력값은 부모 컴포넌트에서 useInputValidate 훅을 이용해 관리 (`value`, `setValue`)
- 성공/에러 메시지 UI 제공

---

## 🔧 사용 예시

```tsx
import { useState } from 'react';
import { LabeledInput } from '@shared/components/LabeledInput';
import { useInputValidate } from '@entities/campaign/hooks/useInputValidate';

import { LabeledInput } from './LabeledInput';

function Example() {
  const nameInput = useInputValidate('name');
  const phoneInput = useInputValidate('phone');
  const urlInput = useInputValidate('url');
  const [confirmMsg, setConfirmMsg ]= useState<string>('')

  return (
    <LabeledInput
            label="이름"
            placeholder="이름 입력"
            value={nameInput.value}
            setValue={nameInput.setValue}
            errorMsg={nameInput.error}
          />

          <LabeledInput
            label="전화번호"
            placeholder="01012345678"
            value={phoneInput.value}
            setValue={phoneInput.setValue}
            errorMsg={phoneInput.error}
          />

          <LabeledInput
            label="블로그 주소"
            placeholder="네이버 블로그 아이디 입력"
            value={urlInput.value}
            setValue={urlInput.setValue}
            errorMsg={urlInput.error}
            showButton
            showPreview
            confirmMsg={confirmMsg}
            onClick={() => setConfirmMsg("블로그 주소가 확인되었어요")}
          />
  );
}
```
