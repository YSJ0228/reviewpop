import { useEffect, useState } from 'react';

import { BottomSheet } from '@shared/components/BottomSheet';
import { LabeledInput } from '@shared/components/LabeledInput';
import { useInputValidate } from '@entities/campaign/hooks/useInputValidate';

import { ButtonBar } from '../ButtonBar';
import { BLOG, MESSAGES } from './constant';

import { BlogBottomSheetProps } from './types';

export function BlogBottomSheet({
  opened,
  onClose,
  blog,
  setBlog,
  setIsConnected,
}: BlogBottomSheetProps) {
  const urlInput = useInputValidate('url', blog?.replace('blog.naver.com/', '') ?? '');
  const [confirmMsg, setConfirmMsg] = useState<string>(blog ? MESSAGES.CONFIRM : '');

  useEffect(() => {
    if (confirmMsg === MESSAGES.CONFIRM) setIsConnected(true);
    else setIsConnected(false);
  }, [confirmMsg]);

  return (
    <BottomSheet opened={opened} onClose={onClose} height={560} title={BLOG.TITLE}>
      <LabeledInput
        label={BLOG.LABEL}
        placeholder={BLOG.PLACEHOLDER}
        input={urlInput}
        showButton
        showPreview
        confirmMsg={confirmMsg}
        setConfirmMsg={setConfirmMsg}
        onClick={() => {
          setConfirmMsg(MESSAGES.CONFIRM);
        }}
      />
      <ButtonBar
        variant="primary"
        onClick={() => {
          onClose();
          setBlog(`blog.naver.com/${urlInput.value}`);
        }}
        disabled={!!urlInput.errorMsg}
        text="저장"
      />
    </BottomSheet>
  );
}
