import Link from 'next/link';
import Image from 'next/image';

import dayjs from 'dayjs';

import { useDisclosure } from '@mantine/hooks';
import { IconKebap } from '@pop-ui/foundation';

import { calculateAnnouncementDate } from '@entities/history/hooks/useMyCampaigns';
import { STATUS_VISIT } from '@entities/history/types/myCampaign.types';

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

  return (
    <>
      <Link
        href={`/campaign/${campaign.id}`}
        className={`${styles.CampaignCard__Link} ${type === 'selected' ? styles['CampaignCard__Link--NoBorder'] : ''}`}
      >
        <article className={styles.CampaignCard} aria-label={`${campaign.brand}`}>
          {type === 'selected' && visitStatus && (
            <div className={styles.CampaignCard__StatusLabel}>
              <p>{STATUS_VISIT[visitStatus]}</p>
            </div>
          )}
          <header className={styles.CampaignCard__TopSection}>
            <div className={styles.CampaignCard__ImageWrapper}>
              <Image
                src={campaign.thumbnail}
                alt={`${campaign.brand} 체험 이미지`}
                fill
                sizes="(max-width: 768px) 88px, 88px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <section className={styles.CampaignCard__Content}>
              {/* applied 타입 */}
              {type === 'pending' && (
                <CampaignAppliedCard announcementStatus={announcementStatus} />
              )}

              {/* selected 타입 */}
              {type === 'selected' && (
                <>
                  {visitStatus === 'scheduled' && (
                    <div className={styles.CampaignCard__VisitDateWrapper}>
                      <span className={styles.CampaignCard__VisitDate}>
                        {appliedAt &&
                          dayjs(`${appliedAt[0]} ${appliedAt[1]}`).format('M월 D일 dddd A h:mm')}
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
                  )}
                  {visitStatus === 'before' && (
                    <span className={styles.CampaignCard__SelectedText}>
                      {HISTORY_MESSAGES.SELECTED}
                    </span>
                  )}
                </>
              )}

              <h3 className={styles.CampaignCard__Brand}>{campaign.brand}</h3>
              <p className={styles.CampaignCard__Title}>{campaign.providedItem}</p>

              {/* rejected 타입 */}
              {type === 'rejected' && (
                <CampaignRejectedCard
                  recruitmentSchedule={recruitmentSchedule}
                  maxRecruitment={campaign.maxRecruitment}
                />
              )}
            </section>
          </header>

          {/* TODO: 추후 조건(탭 별) 관련해 논의 후 추가 필요 (구조 변경 가능성 높음) */}
        </article>
      </Link>

      {/* selected 타입 - Link 밖으로 분리*/}
      {type === 'selected' && visitStatus && (
        <CampaignSelectedCard campaign={campaign} visitStatus={visitStatus} />
      )}

      {/* 예약 옵션 BottomSheet */}
      {type === 'selected' && visitStatus === 'scheduled' && (
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
