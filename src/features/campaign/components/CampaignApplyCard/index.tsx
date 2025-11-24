import { CampaignApplyCardProps } from './types';

import styles from './style.module.scss';

export function CampaignApplyCard({ size = 'sm', brand, providedItems }: CampaignApplyCardProps) {
  const styleCard =
    size === 'sm'
      ? { height: 52, paddingTop: 8, paddingLeft: 16 }
      : { height: 103, justifyContent: 'center', alignItems: 'center', gap: 8 };

  const styleBrand =
    size === 'sm'
      ? { fontSize: 12, fontWeight: 600, color: 'var(--gray-900)', lineHeight: '18px' }
      : { fontSize: 16, fontWeight: 700, color: 'var(--gray-800)' };
  const styleItems =
    size === 'sm'
      ? { fontSize: 12, fontWeight: 500, color: 'var(--gray-600)', lineHeight: '18px' }
      : { fontSize: 14, fontWeight: 500, color: 'var(--gray-800)' };

  return (
    <div className={styles.CampaignApplyCard} style={styleCard}>
      <span style={styleBrand}>{brand}</span>
      <span style={styleItems}>{providedItems}</span>
    </div>
  );
}
