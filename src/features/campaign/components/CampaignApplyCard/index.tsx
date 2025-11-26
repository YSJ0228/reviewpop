import { CampaignApplyCardProps } from './types';

import styles from './style.module.scss';

export function CampaignApplyCard({ size = 'sm', brand, providedItems }: CampaignApplyCardProps) {
  return (
    <div className={`${styles.CampaignApplyCard} ${size === 'sm' ? styles.Small : styles.Large}`}>
      <span className={styles.Brand}>{brand}</span>
      <span className={styles.Items}>{providedItems}</span>
    </div>
  );
}
