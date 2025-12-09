import { STATUS_REVIEW } from '@features/history/constants';

import { CampaignCardWrapper } from '@features/history/components/CampaignCardWrapper';
import { CampaignStatusLabel } from '@features/history/components/CampaignStatusLabel';
import { useCampaignCardData } from '@entities/history/hooks/useCampaignCardData';

import { CampaignReviewedCardFooter } from '../CampaignReviewedCard/CampaignReviewedCardFooter';

import type { CampaignCompletedCardProps } from './types';

import styles from './style.module.scss';

/**
 * 체험 완료 카드 컴포넌트 (후기 상태 = reviewed)
 * @param application - 체험 신청 정보
 */
export function CampaignCompletedCard({ application }: CampaignCompletedCardProps) {
  const { campaign } = useCampaignCardData(application);

  // Top Content: 후기 상태 라벨
  const topContent = application.reviewStatus ? (
    <div className={styles.CampaignCompletedCard__StatusLabel} aria-label="후기 상태 라벨">
      <span>{STATUS_REVIEW[application.reviewStatus]}</span>
    </div>
  ) : undefined;

  return (
    <>
      <CampaignCardWrapper
        campaign={campaign}
        isSelected={true}
        statusLabel={
          <CampaignStatusLabel
            type="completed"
            visitStatus={undefined}
            reviewStatus={application.reviewStatus}
            reservationDate={application.reservationDate}
            campaignStatus={campaign.status}
          />
        }
        topContent={topContent}
      />
      {application.reviewStatus && (
        <CampaignReviewedCardFooter
          reviewStatus={application.reviewStatus}
          campaignStatus={campaign.status}
          reviewUrl={application.reviewUrl}
        />
      )}
    </>
  );
}
