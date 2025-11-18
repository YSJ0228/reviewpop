import Image from 'next/image';
import { IconCopy } from '@pop-ui/foundation';

import { BUTTON_LABEL } from './constants';

import { WebButtonType } from './types';

import styles from './style.module.scss';

export function WebButton({
  buttonType,
  onClick,
  text = '',
  label,
  isConnected = false,
}: WebButtonType) {
  const buttonClass = `Button--${buttonType.charAt(0).toUpperCase()}${buttonType.slice(1)}`;
  const isImage = ['edit', 'connect'].includes(buttonType);

  return (
    <div>
      <div className={styles.WebButton__LabelBox}>
        <label className={styles.WebButton__Label} htmlFor="web-button">
          {label}
        </label>
        {isConnected && <span className={styles.WebButton__Connect}>연결됨</span>}
      </div>
      <div className={styles.WebButton__InputBox}>
        <div className={styles.WebButton__ImageInput}>
          {isImage && (
            <Image
              src="/images/BlogLogo.svg"
              alt="blog image"
              width={20}
              height={20}
              style={{ borderRadius: '4px' }}
            />
          )}
          <input
            id="web-button"
            className={styles.WebButton__Input}
            placeholder="블로그를 연결해주세요"
            value={text}
            readOnly
          />
        </div>
        <button
          onClick={onClick}
          disabled
          className={`${styles.WebButton__Button} ${styles[`WebButton__${buttonClass}`]}`}
        >
          {buttonType === 'copy' && <IconCopy size={16} />}
          {BUTTON_LABEL[buttonType]}
        </button>
      </div>
    </div>
  );
}
