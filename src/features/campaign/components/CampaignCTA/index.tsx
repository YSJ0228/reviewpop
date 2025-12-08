import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

import { Button, Modal, toast } from '@shared/components';
import { useUserInfo } from '@entities/user/hooks/useUserInfo';
import { CampaignDetail } from '@entities/campaign/types/campaign.types';
import { useDeleteMyCampaign } from '@entities/history/hooks/useMyCampaigns';
import { useApplicationDetails } from '@entities/application/hooks/useApplicationDetails';

import styles from './style.module.scss';

/**
 * - 'Cancel': 체험단 신청 취소하기
 * - 'Closed': 아쉽지만 종료된 체험이에요
 * - 'Apply': 체험단 신청하기
 * - 'Reserve': 체험단에 선정되었어요! 체험 방문할 날짜를 설정해주세요
 * - 'Review': 체험 후기 등록
 * - 'CancelReservation': 예약 취소 (당일)
 * - 'ChangeReservation': 예약 날짜 변경 / 예약 취소 (당일 아님)
 */
type Cta =
  | 'Cancel'
  | 'Closed'
  | 'Apply'
  | 'Reserve'
  | 'Review'
  | 'CancelReservation'
  | 'ChangeReservation';

export default function CampaignCTA({ campaign }: { campaign: CampaignDetail }) {
  const { data: user } = useUserInfo();
  const { data: application } = useApplicationDetails(campaign.id, user?.id || '');

  const { mutateAsync: deleteMyCampaign } = useDeleteMyCampaign();

  const handleCancelApplication = async () => {
    try {
      await deleteMyCampaign(campaign.id);
      toast.success('신청이 취소되었습니다.');
    } catch (error) {
      toast.error('신청 취소에 실패했습니다.');
      console.error('체험 신청 취소에 실패했습니다.', error);
    }
  };

  const router = useRouter();
  if (!user) return null;

  const getCtaStatus = (): Cta => {
    if (application?.status === 'pending') return 'Cancel';

    if (application?.status === 'selected') {
      if (!application.isReservated) return 'Reserve';
      if (application.reviewStatus) return 'Review';

      // 예약 당일인지 확인
      const isToday = dayjs(application.reservationDate).isSame(dayjs(), 'day');
      if (isToday) return 'CancelReservation';

      return 'ChangeReservation';
    }

    if (campaign.status === 'recruiting') return 'Apply';

    return 'Closed';
  };

  const CTA_STATUS = getCtaStatus();

  return (
    <div className={styles.CTA__Container}>
      {CTA_STATUS === 'Reserve' && <span>🎉 체험단에 선정되었어요!</span>}

      <div className={styles.CTA__ButtonWrapper}>
        {CTA_STATUS === 'Apply' && (
          <Link href={`/campaign/${campaign.id}/apply`} className={styles.CTA__Link}>
            <Button
              fullWidth
              className={styles.CTA}
              onClick={() => router.push(`/campaign/${campaign.id}/apply`)}
            >
              체험단 신청하기
            </Button>
          </Link>
        )}

        {CTA_STATUS === 'Cancel' && (
          <Modal
            variant="confirm"
            onConfirm={handleCancelApplication}
            trigger={
              <Button fullWidth variant="outline" className={styles.CTA}>
                체험단 신청 취소하기
              </Button>
            }
          />
        )}

        {CTA_STATUS === 'Reserve' && (
          <Link href={`/campaign/${campaign.id}/reserve`} className={styles.CTA__Link}>
            <Button
              fullWidth
              className={styles.CTA}
              onClick={() => router.push(`/campaign/${campaign.id}/reserve`)}
            >
              체험 방문할 날짜를 설정해주세요
            </Button>
          </Link>
        )}

        {CTA_STATUS === 'ChangeReservation' && (
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <Button
              fullWidth
              variant="outline"
              className={styles.CTA}
              onClick={() => router.push(`/campaign/${campaign.id}/reserve`)}
            >
              예약 날짜 변경
            </Button>
            <Modal
              variant="outline"
              onConfirm={handleCancelApplication}
              trigger={
                <Button fullWidth className={styles.CTA} onClick={handleCancelApplication}>
                  예약 취소
                </Button>
              }
            />
          </div>
        )}

        {CTA_STATUS === 'CancelReservation' && (
          <Modal
            variant="outline"
            onConfirm={handleCancelApplication}
            trigger={
              <Button fullWidth className={styles.CTA} onClick={handleCancelApplication}>
                예약 취소
              </Button>
            }
          />
        )}

        {CTA_STATUS === 'Review' && (
          <Button
            fullWidth
            className={styles.CTA}
            onClick={() => router.push(`/campaign/${campaign.id}/review/write`)}
          >
            체험 후기 등록
          </Button>
        )}

        {CTA_STATUS === 'Closed' && (
          <Button fullWidth disabled className={styles.CTA}>
            아쉽지만 종료된 체험이에요
          </Button>
        )}
      </div>
    </div>
  );
}
