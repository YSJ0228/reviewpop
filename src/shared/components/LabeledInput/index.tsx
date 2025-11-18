import { useState } from 'react';

import { isValid } from './validate';

import { LabeledInputProps } from './types';

import styles from './style.module.scss';

export function LabeledInput({
  placeholder,
  label,
  isText = false,
  isButton = true,
  text = '',
  setText,
  inputType,
}: LabeledInputProps) {
  const [result, setResult] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

  async function isUrlExists(url: string) {
    try {
      // const response = await fetch(url, { method: 'HEAD' });
      setResult(true);
    } catch (error) {
      setResult(false);
    }
  }
  const errorMsg = isValid(inputType, text);

  return (
    <div className={styles.LabeledInput}>
      <label className={styles.LabeledInput__Label}>{label}</label>
      {isText && (
        <div>
          <span className={styles.LabeledInput__BlogLink}>blog.naver.com/</span>
          <span className={styles.LabeledInput__BlogId}>{text}</span>
        </div>
      )}
      <div className={styles.LabeledInput__InputSection}>
        <div className={styles.LabeledInput__InputMessage}>
          <input
            className={styles.LabeledInput__Input}
            placeholder={placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          {result && !errorMsg && (
            <span className={styles.LabeledInput__SuccessMsg}>블로그 주소가 확인되었어요</span>
          )}
          {errorMsg && touched && <span className={styles.LabeledInput__ErrorMsg}>{errorMsg}</span>}
        </div>
        {isButton && (
          <button
            disabled={Boolean(errorMsg)}
            className={styles.LabeledInput__Button}
            onClick={() => isUrlExists('https://blog.naver.com/' + text)}
          >
            확인
          </button>
        )}
      </div>
    </div>
  );
}
