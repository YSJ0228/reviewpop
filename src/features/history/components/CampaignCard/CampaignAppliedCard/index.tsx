import { Modal, toast } from '@shared/components';
import { useDeleteMyCampaign } from '@entities/history/hooks/useMyCampaigns';

import type { ICampaignAppliedCardProps } from './type';

import styles from './style.module.scss';

export function CampaignAppliedCard({ announcementStatus, campaignId }: ICampaignAppliedCardProps) {
  const { mutateAsync: deleteMyCampaign } = useDeleteMyCampaign();

  const handleCancelApplication = async () => {
    try {
      await deleteMyCampaign(campaignId);
      toast.success('신청이 취소되었습니다.');
    } catch (error) {
      toast.error('신청 취소에 실패했습니다.');
      console.error('체험 신청 취소에 실패했습니다.', error);
    }
  };

  return (
    <div className={styles.CampaignAppliedTitle} aria-label="신청 탭 개별 카드 타이틀">
      <p role="status" aria-live="polite">
        {announcementStatus}
      </p>
      <Modal
        variant="confirm"
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
