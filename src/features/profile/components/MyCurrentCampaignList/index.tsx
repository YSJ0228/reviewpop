'use client';
import { EmptyState } from '@shared/components';
import { MyCurrentCampaignCard } from '../MyCurrentCampaignCard';
import styles from './style.module.scss';
import { MyCurrentCampaignListProps } from './types';
export function MyCurrentCampaignList({ campaigns }: MyCurrentCampaignListProps) {
  return (
    <div>
      <h2 className={styles.MyCurrentCampaignList__Title}>내 체험단 현황</h2>
      <div className={styles.MyCurrentCampaignList__CampaignCards}>
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <MyCurrentCampaignCard
              brand={campaign.brand}
              providedItems={campaign.providedItems}
              state="plan"
              key={campaign.id}
            />
          ))
        ) : (
          <EmptyState variant="no-applied" />
        )}
      </div>
    </div>
  );
}
