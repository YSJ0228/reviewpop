import { Textarea } from '@mantine/core';

import { TextAreaProps } from './types';

import styles from './style.module.scss';
export function TextArea({ label, maxTextCount, placeholder, text, setText }: TextAreaProps) {
  return (
    <div>
      <Textarea
        label={label}
        labelProps={{
          style: {
            color: 'var(--gray-900)',
            fontWeight: 600,
            fontSize: '14px',
          },
        }}
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        radius={10}
        styles={{
          label: {
            marginBottom: 8,
          },
          input: { height: 120 },
        }}
      />
      <div className={styles.TextArea__Count}>
        <span className={styles.TextArea__CurrentCount}>{text.length}</span>
        <span className={styles.TextArea__MaxCount}>/{maxTextCount}</span>
      </div>
    </div>
  );
}
