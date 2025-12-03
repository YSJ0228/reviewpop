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
  const [validationState, setValidationState] = useState<{
    type: 'error' | 'success' | 'idle';
    message: string;
  }>({ type: 'idle', message: '' });

  const handleCheck = () => {
    if (!input.value) {
      setValidationState({ type: 'error', message: MESSAGES.EMPTY_LINK });
      return;
    }

    if (input.errorMsg) {
      setValidationState({ type: 'idle', message: '' });
      return;
    }

    setValidationState({ type: 'success', message: MESSAGES.VALID_LINK });
  };

  const handleValueChange = (val: string) => {
    input.setValue(val);
    setValidationState({ type: 'idle', message: '' });
  };

  return (
    <LabeledInput
      label="후기 작성 블로그 링크"
      placeholder="후기를 남긴 블로그 링크를 적어주세요"
      input={{
        ...input,
        setValue: handleValueChange,
        errorMsg: validationState.type === 'error' ? validationState.message : input.errorMsg,
      }}
      confirmMsg={validationState.type === 'success' ? validationState.message : ''}
      showButton
      onClick={handleCheck}
    />
  );
}
