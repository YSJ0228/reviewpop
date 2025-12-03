import { useState } from 'react';
import { LabeledInput } from '@shared/components/LabeledInput';

interface ReviewFormLinkProps {
  input: {
    value: string;
    setValue: (value: string) => void;
    errorMsg: string;
  };
}

const MESSAGES = {
  EMPTY_LINK: '링크를 입력해주세요.',
  VALID_LINK: '올바른 링크입니다.',
} as const;

export function ReviewFormLink({ input }: ReviewFormLinkProps) {
  const [manualError, setManualError] = useState('');
  const [confirmMsg, setConfirmMsg] = useState('');

  const handleValueChange = (val: string) => {
    input.setValue(val);
    setManualError('');
    setConfirmMsg('');
  };

  const handleCheck = () => {
    if (!input.value) {
      setManualError(MESSAGES.EMPTY_LINK);
      setConfirmMsg('');
      return;
    }

    if (input.errorMsg) {
      setManualError('');
      setConfirmMsg('');
      return;
    }

    setManualError('');
    setConfirmMsg(MESSAGES.VALID_LINK);
  };

  return (
    <div>
      <LabeledInput
        label="후기 작성 블로그 링크"
        placeholder="후기를 남긴 블로그 링크를 적어주세요"
        input={{
          ...input,
          setValue: handleValueChange,
          errorMsg: manualError || input.errorMsg,
        }}
        confirmMsg={confirmMsg}
        setConfirmMsg={setConfirmMsg}
        showButton
        onClick={handleCheck}
      />
    </div>
  );
}
