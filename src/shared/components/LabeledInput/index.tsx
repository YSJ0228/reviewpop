import { useId, useState } from 'react';
import { IconClose } from '@pop-ui/foundation';

import { LabeledInputProps } from './types';

import styles from './style.module.scss';

/**
 * LabeledInput 컴포넌트
 *
 * form 입력 UI에 label, preview, validation, 버튼을 모두 포함한 커스텀 인풋 컴포넌트입니다.
 *
 * 기능:
 * - label 표시
 * - preview(blog.naver.com/ + value) 옵션
 * - 에러 메시지 및 성공 메시지
 * - "확인" 버튼(optional)
 * - touched 상태를 기반으로 blur 이후 에러 메시지 표시
 *
 * @example
 * <LabeledInput
 *   label="블로그 주소 입력"
 *   placeholder="블로그를 입력하세요"
 *   showPreview
 *   value={value}
 *   setValue={setValue}
 *   errorMsg={errorMsg}
 *   confirmMsg="블로그 주소가 확인되었어요"
 *   showButton
 *   onClick={handleSubmit}
 * />
 */

export function LabeledInput({
  placeholder,
  label,
  showPreview = false,
  showButton = false,
  value,
  setValue,
  errorMsg,
  onClick,
  confirmMsg,
}: LabeledInputProps) {
  const id = useId();
  const [touched, setTouched] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={styles.LabeledInput}>
      <label className={styles.LabeledInput__Label} htmlFor={id}>
        {label}
      </label>
      {showPreview && (
        <div>
          <span className={styles.LabeledInput__BlogLink}>blog.naver.com/</span>
          <span className={styles.LabeledInput__BlogId}>{value}</span>
        </div>
      )}
      <div className={styles.LabeledInput__InputSection}>
        <div className={styles.LabeledInput__InputMessage}>
          <div
            className={`${styles.LabeledInput__InputBox} ${errorMsg && touched ? styles['LabeledInput__InputBox--Error'] : ''}`}
          >
            <input
              id={id}
              className={styles.LabeledInput__Input}
              placeholder={placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setTouched(true);
                setIsFocused(false);
              }}
            />
            {isFocused && value && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setValue('')}
                className={styles.LabeledInput__ClearButton}
              >
                <IconClose size={12} color="white" />
              </button>
            )}
          </div>
          {confirmMsg && !errorMsg && (
            <span className={styles.LabeledInput__SuccessMsg}>{confirmMsg}</span>
          )}
          {errorMsg && touched && <span className={styles.LabeledInput__ErrorMsg}>{errorMsg}</span>}
        </div>
        {showButton && (
          <button
            type="button"
            disabled={Boolean(errorMsg)}
            className={styles.LabeledInput__Button}
            onClick={onClick}
          >
            확인
          </button>
        )}
      </div>
    </div>
  );
}
