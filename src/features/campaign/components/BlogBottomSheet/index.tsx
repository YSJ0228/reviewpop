import { useState } from 'react';

import { BottomSheet } from '@shared/components/BottomSheet';
import { LabeledInput } from '@shared/components/LabeledInput';

import { BlogBottomSheetProps } from './types';
import { ButtonBar } from '../ButtonBar';

export function BlogBottomSheet({ opened, onClose, input, setBlogAddress }: BlogBottomSheetProps) {
  const [confirmMsg, setConfirmMsg] = useState<string>('');
  return (
    <BottomSheet opened={opened} onClose={onClose} title="블로그 아이디를 입력해주세요">
      <LabeledInput
        label="블로그 주소"
        placeholder="네이버 블로그 아이디 입력"
        value={input.value}
        setValue={input.setValue}
        errorMsg={input.error}
        showButton
        showPreview
        confirmMsg={confirmMsg}
        onClick={() => setConfirmMsg('블로그 주소가 확인되었어요')}
      />
      <ButtonBar
        variant="primary"
        onClick={() => {
          onClose();
          setBlogAddress(`blog.naver.com/${input.value}`);
        }}
        disabled={!!input.error}
        text="저장"
      />
    </BottomSheet>
  );
}
