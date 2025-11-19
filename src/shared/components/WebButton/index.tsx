import { useId } from 'react';
import Image from 'next/image';
import { IconCopy } from '@pop-ui/foundation';

import { BUTTON_CONFIG, TEXT } from './constants';

import { WebButtonProps } from './types';

import styles from './style.module.scss';

/**
 * WebButton 컴포넌트
 *
 * 프로젝트에서 사용하는 input 안에 버튼이 있는 형태의 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <WebButton
 *    buttonType="connect"
 *    label="블로그 주소"
 *    text=""
 *    onClick={() => setIsModal(true)}
 *  />
 * <WebButton
 *    buttonType="copy"
 *    label="키워드"
 *    text="키워드1, 키워드2, 키워드3"
 *    onClick={() => setIsModal(true)}
 *  />
 *
 * <WebButton
 *    buttonType="edit"
 *    label="블로그 주소"
 *    text="/blog.naver.com"
 *    onClick={() => setIsModal(true)}
 *  />
 * ```
 */

export function WebButton({
  buttonType,
  onClick,
  text = '',
  label,
  isConnected = false,
}: WebButtonProps) {
  const id = useId();
  return (
    <div>
      <div className={styles.WebButton__LabelBox}>
        <label className={styles.WebButton__Label} htmlFor={id}>
          {label}
        </label>
        {isConnected && <span className={styles.WebButton__Connect}>{TEXT.connectedLabel}</span>}
      </div>
      <div className={styles.WebButton__InputBox}>
        <div className={styles.WebButton__ImageInput}>
          {BUTTON_CONFIG[buttonType].image && (
            <Image
              src={BUTTON_CONFIG[buttonType].image}
              alt="blog image"
              width={20}
              height={20}
              style={{ borderRadius: '4px' }}
            />
          )}
          <input
            id={id}
            className={styles.WebButton__Input}
            placeholder={TEXT.placeholder}
            value={text}
            readOnly
          />
        </div>
        <button
          onClick={onClick}
          className={`${styles.WebButton__Button} ${styles[BUTTON_CONFIG[buttonType].class]}`}
        >
          {buttonType === 'copy' && <IconCopy size={16} />}
          {BUTTON_CONFIG[buttonType].label}
        </button>
      </div>
    </div>
  );
}
