import Link from 'next/link';
import { Button } from '@shared/components';
import { EMPTY_STATE_MAP } from './constants';
import { EmptyStateProps } from './types';
import styles from './style.module.scss';

export function EmptyState(props: EmptyStateProps) {
  const variantConfig = EMPTY_STATE_MAP[props.variant ?? 'default'];

  const config = {
    title: props.title ?? variantConfig.title,
    description: props.description ?? variantConfig.description,
    buttonText: props.buttonText ?? variantConfig.buttonText,
    buttonLink: props.buttonLink ?? variantConfig.buttonLink ?? '',
  };

  const classNames = [styles.EmptyState, config.buttonText && styles['EmptyState--hasButton']]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {config.title && <h2 className={styles.EmptyState__Title}>{config.title}</h2>}
      <p className={styles.EmptyState__Description}>{config.description}</p>

      {config.buttonText && (
        <Link href={config.buttonLink}>
          <Button variant="secondary" size="small">
            {config.buttonText}
          </Button>
        </Link>
      )}
    </div>
  );
}
