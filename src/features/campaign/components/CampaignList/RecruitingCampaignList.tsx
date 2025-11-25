import { diff, now } from '@shared/lib/date';

import { RecruitingCard } from '../CampaignCard/RecruitingCard';

import type { CampaignListProps } from './types';

import styles from './style.module.scss';

export function RecruitingCampaignList({ filteredCampaigns }: Omit<CampaignListProps, 'status'>) {
  const thisTime = now();

  return (
    <div className={styles.CampaignList} role="feed" aria-label="진행 중인 체험 목록">
      {filteredCampaigns.length === 0 ? (
        <div className={styles['CampaignList--Empty']} role="status" aria-label="체험이 없습니다">
          <p>해당 체험이 없습니다.</p>
        </div>
      ) : (
        filteredCampaigns
          .filter((campaign) => {
            return campaign.schedule.applicationSchedule[1] > thisTime.toISOString();
          })
          .sort(
            (a, b) =>
              diff(a.schedule.applicationSchedule[1], b.schedule.applicationSchedule[1]) ||
              a.currentRecruitment - b.currentRecruitment ||
              b.maxRecruitment - a.maxRecruitment,
          )
          .map((campaign) => <RecruitingCard key={campaign.id} campaign={campaign} />)
      )}
    </div>
  );
}
