'use client';

import { CAMPAIGN_STATUS_LABELS } from '@entities/campaign/types/campaign.types';
import { diff, now } from '@shared/lib/date';

import { CampaignCard } from '../CampaignCard';

import type { CampaignListProps } from './types';

import styles from './style.module.scss';

export function CampaignList({ status, filteredCampaigns }: CampaignListProps) {
  const thisTime = now();
  const statusTitle = CAMPAIGN_STATUS_LABELS[status];

  return (
    <div className={styles.CampaignList} role="feed" aria-label={`${statusTitle} 체험 목록`}>
      {status === 'before_recruiting' &&
        filteredCampaigns
          .sort((a, b) =>
            diff(a.schedule.applicationSchedule[0], b.schedule.applicationSchedule[0]),
          )
          .map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)}
      {status === 'completed' &&
        filteredCampaigns
          .sort((a, b) =>
            diff(
              b.schedule.winnerAnnouncementSchedule[1],
              a.schedule.winnerAnnouncementSchedule[1],
            ),
          )
          .map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)}

      {status === 'recruiting' &&
        (filteredCampaigns.length === 0 ? (
          // TODO: 이후 EmptyState로 수정
          <div
            className={styles['CampaignList--Empty']}
            role="status"
            aria-label={`체험이 없습니다`}
          >
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
            .map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)
        ))}
    </div>
  );
}
