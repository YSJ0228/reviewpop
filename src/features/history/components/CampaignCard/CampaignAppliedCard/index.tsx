import { Modal } from '@shared/components';
import { useDeleteMyCampaign } from '@entities/history/hooks/useMyCampaigns';

import { CampaignAppliedCardProps } from './type';

import styles from './style.module.scss';

export function CampaignAppliedCard({ announcementStatus, campaignId }: CampaignAppliedCardProps) {
  const { mutate: deleteMyCampaign } = useDeleteMyCampaign(campaignId);

  const handleCancelApplication = () => {
    deleteMyCampaign();
  };

  return (
    <div className={styles.CampaignAppliedTitle} aria-label="신청 탭 개별 카드 타이틀">
      <p role="status" aria-live="polite">
        {announcementStatus}
      </p>
      <Modal
        variant="outline"
        onConfirm={handleCancelApplication}
        trigger={
          <span
            role="button"
            className={styles.CampaignAppliedTitle__Button}
            aria-label="체험 신청 취소"
          >
            신청취소
          </span>
        }
      />
    </div>
  );
}
