import Link from 'next/link';
import { Button } from '@shared/components';
import { EMPTY_STATE_MAP } from './constants';
import { EmptyStateProps } from './types';
import styles from './style.module.scss';

export function EmptyState({ variant }: EmptyStateProps) {
  const config = EMPTY_STATE_MAP[variant];
  const stateType = config.showButton ? 'WithButton' : 'NoButton';
  const classNames = [styles.EmptyState, styles[`EmptyState--${stateType}`]]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {config.title && <h2 className={styles.EmptyState__Title}>{config.title}</h2>}
      <p className={styles.EmptyState__Description}>{config.description}</p>

      {config.showButton && config.buttonText && (
        <Link href="/">
          <Button variant="secondary" size="small">
            {config.buttonText}
          </Button>
        </Link>
      )}
    </div>
  );
}
