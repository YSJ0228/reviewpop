import { LabeledInput } from '@shared/components/LabeledInput';
import { WebButton } from '@shared/components/WebButton';
import { TextArea } from '../TextArea';

import styles from './style.module.scss';
import { ButtonBar } from '../ButtonBar';
import { useInputValidate } from '@entities/campaign/hooks/useInputValidate';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { BlogBottomSheet } from '../BlogBottomSheet';
import { CautionBottomSheet } from '../CautionBottomSheet';
import { ApplyFormProps } from './types';

export function ApplyForm({ user }: ApplyFormProps) {
  const nameInput = useInputValidate('name', user?.name ?? '');
  const phoneInput = useInputValidate('phone', user?.phone ?? '');

  const [text, setText] = useState<string>('');
  const [blog, setBlog] = useState<string>(user?.blog ?? '');

  const [blogOpened, { open: blogOpen, close: blogClose }] = useDisclosure();
  const [cautionOpened, { open: cautionOpen, close: cautionClose }] = useDisclosure();

  return (
    <div>
      <div className={styles.ApplyForm}>
        <WebButton label="네이버 블로그 주소" buttonType="connect" onClick={blogOpen} text={blog} />
        <LabeledInput label="이름" placeholder="이름 입력" input={nameInput} />
        <LabeledInput label="전화번호" placeholder="01012345678" input={phoneInput} />
        <TextArea
          label="전달하고 싶은 한마디(선택)"
          maxTextCount={300}
          text={text}
          setText={setText}
          placeholder="체험단에 선정되어야 할 이유가 있다면 알려주세요!"
        />
      </div>
      <ButtonBar
        text="다음"
        variant="primary"
        onClick={cautionOpen}
        disabled={!blog || !!nameInput.errorMsg || !!phoneInput.errorMsg}
      />
      <BlogBottomSheet opened={blogOpened} onClose={blogClose} blog={blog} setBlog={setBlog} />
      <CautionBottomSheet opened={cautionOpened} onClose={cautionClose} />
    </div>
  );
}
