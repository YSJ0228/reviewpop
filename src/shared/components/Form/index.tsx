import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

import { TextArea } from '@features/campaign/components/TextArea';
import { ButtonBar } from '@features/campaign/components/ButtonBar';
import { useInputValidate } from '@entities/campaign/hooks/useInputValidate';
import { BlogBottomSheet } from '@features/campaign/components/BlogBottomSheet';
import { useUserInfo } from '@entities/user/hooks/useUserInfo';

import { LabeledInput } from '../LabeledInput';
import { WebButton } from '../WebButton';

import { FormProps } from './types';

import styles from './style.module.scss';
import { CautionBottomSheet } from '@features/campaign/components/CautionBottomSheet';

export function Form({ onClick, showTextArea = true, buttonText = '확인' }: FormProps) {
  const { data: user } = useUserInfo();
  const nameInput = useInputValidate('name', user?.name ?? '');
  const phoneInput = useInputValidate('phone', user?.phoneNumber ?? '');

  const [blog, setBlog] = useState<string>(user?.blogAddress ?? '');
  const [blogOpened, { open: blogOpen, close: blogClose }] = useDisclosure();
  const [cautionOpened, { open: cautionOpen, close: cautionClose }] = useDisclosure();

  const [text, setText] = useState<string>('');
  const formData = {
    name: nameInput.value,
    phoneNumber: phoneInput.value,
    blogAddress: blog,
    message: text,
  };

  const handleClick = () => {
    if (onClick) {
      onClick(formData);
    } else {
      cautionOpen();
    }
  };

  return (
    <div className={styles.Form}>
      <WebButton label="네이버 블로그 주소" buttonType="connect" onClick={blogOpen} text={blog} />
      <LabeledInput label="이름" placeholder="이름 입력" input={nameInput} />
      <LabeledInput label="전화번호" placeholder="01012345678" input={phoneInput} />
      {showTextArea && (
        <TextArea
          label="전달하고 싶은 한마디(선택)"
          maxTextCount={300}
          text={text}
          setText={setText}
          placeholder="체험단에 선정되어야 할 이유가 있다면 알려주세요!"
        />
      )}
      <ButtonBar
        text={buttonText}
        variant="primary"
        onClick={handleClick}
        disabled={!blog || !!nameInput.errorMsg || !!phoneInput.errorMsg}
      />
      <BlogBottomSheet opened={blogOpened} onClose={blogClose} blog={blog} setBlog={setBlog} />
      <CautionBottomSheet opened={cautionOpened} onClose={cautionClose} formData={formData} />
    </div>
  );
}
