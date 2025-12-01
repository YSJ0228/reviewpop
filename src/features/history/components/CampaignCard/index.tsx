import Link from 'next/link';
import { SharedCampaignCard } from '@shared/components';

import dayjs from 'dayjs';

import { useDisclosure } from '@mantine/hooks';
import { IconKebap } from '@pop-ui/foundation';

import { calculateAnnouncementDate } from '@entities/history/hooks/useMyCampaigns';
import { CARD_TYPES, STATUS_VISIT } from '@features/history/constants';

import { HISTORY_MESSAGES } from '@features/history/constants';
import { useReservationActions } from '@features/history/hooks/useReservationActions';

import { Colors } from '@shared/styles/colors';

import { CampaignAppliedCard } from './CampaignAppliedCard';
import { CampaignRejectedCard } from './CampaignRejectedCard';
import { CampaignSelectedCard } from './CampaignSelectedCard';
import { ReservationBottomSheet } from './ReservationBottomSheet';

import type { IMyCampaignCardProps } from './types';

import styles from './style.module.scss';

export function CampaignCard({ application, type }: IMyCampaignCardProps) {
  const { campaign } = application;
  const { schedule } = campaign;

  const announcementDate = schedule.winnerAnnouncement.start;
  const announcementStatus = calculateAnnouncementDate(announcementDate);

  const visitStatus = application.isReservated ? 'scheduled' : 'before';

  const appliedAt = application.reservationDate
    ? ([
        dayjs(application.reservationDate).format('YYYY-MM-DD'),
        dayjs(application.reservationDate).format('HH:mm'),
      ] as [string, string])
    : undefined;

  const recruitmentSchedule = [schedule.application.start, schedule.application.end] as [
    string,
    string,
  ];

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

  // Top Content 렌더링 함수
  const getTopContent = () => {
    if (type === CARD_TYPES.PENDING) {
      return <CampaignAppliedCard announcementStatus={announcementStatus} />;
    }

    if (type === CARD_TYPES.SELECTED && visitStatus === 'scheduled') {
      return (
        <div className={styles.CampaignCard__VisitDateWrapper}>
          <span className={styles.CampaignCard__VisitDate}>
            {appliedAt && dayjs(`${appliedAt[0]} ${appliedAt[1]}`).format('M월 D일 dddd A h:mm')}
          </span>
          <button
            type="button"
            onClick={handleKebapClick}
            className={styles.CampaignCard__KebapButton}
            aria-label="예약 관리 메뉴 열기"
            aria-expanded={isOpen}
            aria-haspopup="dialog"
          >
            <IconKebap size={20} color={Colors.COLOR_GRAY_600} />
          </button>
        </div>
      );
    }

    if (type === CARD_TYPES.SELECTED && visitStatus === 'before') {
      return <span className={styles.CampaignCard__SelectedText}>{HISTORY_MESSAGES.SELECTED}</span>;
    }

    return undefined;
  };

  return (
    <>
      <Link
        href={`/campaign/${campaign.id}`}
        className={`${styles.CampaignCard__Link} ${type === CARD_TYPES.SELECTED ? styles['CampaignCard__Link--NoBorder'] : ''}`}
      >
        <SharedCampaignCard
          thumbnail={campaign.thumbnail}
          brand={campaign.brand}
          title={campaign.providedItem}
          className={`${styles.CampaignCard} ${type === CARD_TYPES.SELECTED ? styles['CampaignCard--NoBorder'] : ''}`}
          statusLabel={
            type === CARD_TYPES.SELECTED && visitStatus ? (
              <div className={styles.CampaignCard__StatusLabel}>
                <p>{STATUS_VISIT[visitStatus]}</p>
              </div>
            ) : undefined
          }
          topContent={getTopContent()}
          bottomContent={
            type === CARD_TYPES.REJECTED ? (
              <CampaignRejectedCard
                recruitmentSchedule={recruitmentSchedule}
                maxRecruitment={campaign.maxRecruitment}
              />
            ) : undefined
          }
        />
      </Link>

      {/* selected 타입 - Link 밖으로 분리*/}
      {type === CARD_TYPES.SELECTED && visitStatus && (
        <CampaignSelectedCard campaign={campaign} visitStatus={visitStatus} />
      )}

      {/* 예약 옵션 BottomSheet */}
      {type === CARD_TYPES.SELECTED && visitStatus === 'scheduled' && (
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
