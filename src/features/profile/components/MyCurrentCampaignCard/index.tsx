import { IconChevronRight } from '@pop-ui/foundation';

import { MyCampaignState } from '../MyCampaignState';

import { MyCurrentCampaignCardProps } from './types';

import styles from './style.module.scss';

export function MyCurrentCampaignCard({
  brand,
  providedItems,
  state,
  visit,
}: MyCurrentCampaignCardProps) {
  return (
    <div className={styles.MyCurrentCampaignCard}>
      <div className={styles.MyCurrentCampaignCard__BrandInfo}>
        <div
          style={{ width: 60, height: 60, backgroundColor: 'var(--gray-100)', borderRadius: 8 }}
        ></div>{' '}
        {/* 이미지로 변환 */}
        <div className={styles.MyCurrentCampaignCard__Text}>
          <span className={styles.MyCurrentCampaignCard__Brand}>{brand}</span>
          <span className={styles.MyCurrentCampaignCard__Items}>{providedItems}</span>
        </div>
      </div>
      <div className={styles.MyCurrentCampaignCard__Line}></div>
      <div className={styles.MyCurrentCampaignCard__State}>
        <MyCampaignState type={state} />
        {state === 'plan' ? (
          <span>{visit}</span>
        ) : (
          <IconChevronRight color="var(--gray-400)" size={16} />
        )}
      </div>
    </div>
  );
}
