import { STATUS_REVIEW } from '@features/history/constants';

import { CampaignCardWrapper } from '@features/history/components/CampaignCardWrapper';
import { CampaignStatusLabel } from '@features/history/components/CampaignStatusLabel';
import { useCampaignCardData } from '@features/history/hooks/useCampaignCardData';

import { CampaignReviewedCardFooter } from './CampaignReviewedCardFooter';

import type { Application } from '@entities/application';

import styles from './style.module.scss';

interface CampaignReviewedCardProps {
  application: Application;
}

/**
 * REVIEWED 타입 전용 카드 컴포넌트 (나의 체험 - 리뷰 탭)
 * @param application - 체험 신청 정보
 */
export function CampaignReviewedCard({ application }: CampaignReviewedCardProps) {
  const { campaign } = useCampaignCardData(application);

  // Top Content: 후기 상태 라벨
  const topContent = application.reviewStatus ? (
    <div className={styles.CampaignReviewedCard__StatusLabel} aria-label="후기 상태 라벨">
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
            type="reviewed"
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
          campaignId={campaign.id}
          applicationId={application.id}
        />
      )}
    </>
  );
}
