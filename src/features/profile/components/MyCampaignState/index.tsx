import { MyCampaignStateProps } from './types';

import styles from './style.module.scss';

export function MyCampaignState({ type }: MyCampaignStateProps) {
  const text = type === 'review' ? '후기 등록' : type === 'reservation' ? '방문 예약' : '방문 예정';
  const style =
    type === 'review'
      ? { backgroundColor: 'var(--color-red-50)', color: 'var(--color-red-500)' }
      : type === 'reservation'
        ? { backgroundColor: 'var(--color-blue-50)', color: 'var(--color-blue-500)' }
        : { backgroundColor: 'var(--gray-50)', color: 'var(--gray-600)' };
  return (
    <div className={styles.MyCampaignState} style={style}>
      {text}
    </div>
  );
}
