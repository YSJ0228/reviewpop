import { Button } from '@shared/components';

import { ButtonBarProps } from './types';

import styles from './style.module.scss';

export function ButtonBar({ variant, onClick, text, disabled }: ButtonBarProps) {
  return (
    <div className={styles.ButtonBar}>
      <Button variant={variant} onClick={onClick} disabled={disabled} fullWidth>
        {text}
      </Button>
    </div>
  );
}
