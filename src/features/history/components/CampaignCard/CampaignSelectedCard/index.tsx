import { useDisclosure } from '@mantine/hooks';
import { IconKebap } from '@pop-ui/foundation';

import { Colors } from '@shared/styles/colors';
import dayjs from '@shared/lib/dayjs.config';
import { DATE_FORMATS } from '@shared/lib/date';

import { HISTORY_MESSAGES } from '@features/history/constants';
import { CampaignCardWrapper } from '@features/history/components/CampaignCardWrapper';
import { CampaignStatusLabel } from '@features/history/components/CampaignStatusLabel';
import { ReservationBottomSheet } from '@features/history/components/ReservationBottomSheet';
import { useCampaignCardData } from '@features/history/hooks/useCampaignCardData';
import { useReservationActions } from '@features/history/hooks/useReservationActions';

import { CampaignSelectedCardFooter } from './CampaignSelectedCardFooter';

import type { Application } from '@entities/application';

import styles from './style.module.scss';

interface CampaignSelectedCardProps {
  application: Application;
}

/**
 * SELECTED 타입 전용 카드 컴포넌트 (나의 체험 - 선정탭)
 * @param application - 체험 신청 정보
 */
export function CampaignSelectedCard({ application }: CampaignSelectedCardProps) {
  const { campaign, visitStatus, appliedAt } = useCampaignCardData(application);

  const [isOpen, { open, close }] = useDisclosure(false);
  const { handleChangeDate, handleCancelReservation } = useReservationActions(campaign.id);

  // 카드 케밥 버튼 클릭 핸들러
  const handleKebapClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    open();
  };

  // 예약 날짜 변경 핸들러
  const handleChangeDateClick = () => {
    handleChangeDate();
    close();
  };

  // 예약 취소 핸들러
  const handleCancelReservationClick = async () => {
    await handleCancelReservation();
    close();
  };

  // Top Content 렌더링
  const getTopContent = () => {
    if (visitStatus === 'scheduled') {
      return (
        <div className={styles.CampaignSelectedCard__VisitDateWrapper}>
          <span className={styles.CampaignSelectedCard__VisitDate}>
            {appliedAt &&
              dayjs(`${appliedAt[0]} ${appliedAt[1]}`).format(
                DATE_FORMATS.MMDD_DDDD_LONG_WITH_TIME,
              )}
          </span>
          <button
            type="button"
            onClick={handleKebapClick}
            className={styles.CampaignSelectedCard__KebapButton}
            aria-label="예약 관리 메뉴 열기"
            aria-expanded={isOpen}
            aria-haspopup="dialog"
          >
            <IconKebap size={20} color={Colors.COLOR_GRAY_600} />
          </button>
        </div>
      );
    }

    if (visitStatus === 'before') {
      return (
        <span className={styles.CampaignSelectedCard__SelectedText}>
          {HISTORY_MESSAGES.SELECTED}
        </span>
      );
    }

    return undefined;
  };

  return (
    <>
      <CampaignCardWrapper
        campaign={campaign}
        isSelected={true}
        statusLabel={
          <CampaignStatusLabel
            type="selected"
            visitStatus={visitStatus}
            reviewStatus={application.reviewStatus}
            reservationDate={application.reservationDate}
            campaignStatus={campaign.status}
          />
        }
        topContent={getTopContent()}
      />
      <CampaignSelectedCardFooter campaign={campaign} visitStatus={visitStatus} />
      {visitStatus === 'scheduled' && (
        <ReservationBottomSheet
          appliedAt={appliedAt}
          isOpen={isOpen}
          onClose={close}
          onDateChange={handleChangeDateClick}
          onCancel={handleCancelReservationClick}
        />
      )}
    </>
  );
}
