import { useState } from 'react';

import { BottomSheet } from '@shared/components/BottomSheet';
import { LabeledInput } from '@shared/components/LabeledInput';
import { useInputValidate } from '@entities/campaign/hooks/useInputValidate';

import { ButtonBar } from '../ButtonBar';

import { BlogBottomSheetProps } from './types';

export function BlogBottomSheet({ opened, onClose, blog, setBlog }: BlogBottomSheetProps) {
  const urlInput = useInputValidate('url', blog?.replace('blog.naver.com/', '') ?? '');
  const [confirmMsg, setConfirmMsg] = useState<string>('');
  return (
    <BottomSheet
      opened={opened}
      onClose={onClose}
      height={560}
      title="블로그 아이디를 입력해주세요"
    >
      <LabeledInput
        label="블로그 주소"
        placeholder="네이버 블로그 아이디 입력"
        input={urlInput}
        showButton
        showPreview
        confirmMsg={confirmMsg}
        setConfirmMsg={setConfirmMsg}
        onClick={() => setConfirmMsg('블로그 주소가 확인되었어요')}
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
