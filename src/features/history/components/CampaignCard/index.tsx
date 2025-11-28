import Link from 'next/link';
import Image from 'next/image';

import dayjs from 'dayjs';

import { useDisclosure } from '@mantine/hooks';
import { IconCalendar, IconKebap } from '@pop-ui/foundation';

import { calculateAnnouncementDate } from '@entities/history/hooks/useMyCampaigns';
import { STATUS_VISIT } from '@entities/history/types/myCampaign.types';

import { HISTORY_MESSAGES } from '@features/history/constants';
import { useReservationActions } from '@features/history/hooks/useReservationActions';

import { Colors } from '@shared/styles/colors';
import { BottomSheet } from '@shared/components/BottomSheet';

import { CampaignAppliedCard } from './CampaignAppliedCard';
import { CampaignRejectedCard } from './CampaignRejectedCard';
import { CampaignSelectedCard } from './CampaignSelectedCard';

import type { MyCampaignCardProps } from './types';

import styles from './style.module.scss';

export function CampaignCard({ campaign, type }: MyCampaignCardProps) {
  const announcementStatus = calculateAnnouncementDate(campaign.announcementDate);
  const [isOpen, { open, close }] = useDisclosure(false);

  const { handleChangeDate, handleCancelReservation } = useReservationActions(campaign.id);

  // appliedAt이 당일인지 확인하는 로직
  const isToday = campaign.appliedAt ? dayjs(campaign.appliedAt[0]).isSame(dayjs(), 'day') : false;

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
  const handleCancelClick = () => {
    handleCancelReservation();
    close();
  };

  return (
    <>
      <Link
        href={`/campaign/${campaign.id}`}
        className={`${styles.CampaignCard__Link} ${type === 'selected' ? styles['CampaignCard__Link--NoBorder'] : ''}`}
      >
        <article className={styles.CampaignCard} aria-label={`${campaign.brand}`}>
          {type === 'selected' && campaign.visitStatus && (
            <div className={styles.CampaignCard__StatusLabel}>
              <p>{STATUS_VISIT[campaign.visitStatus]}</p>
            </div>
          )}
          <header className={styles.CampaignCard__TopSection}>
            <div className={styles.CampaignCard__ImageWrapper}>
              <Image
                src={campaign.imageUrl}
                alt={`${campaign.brand} 체험 이미지`}
                fill
                sizes="(max-width: 768px) 88px, 88px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <section className={styles.CampaignCard__Content}>
              {/* applied 타입 */}
              {type === 'applied' && (
                <CampaignAppliedCard announcementStatus={announcementStatus} />
              )}

              {/* selected 타입 */}
              {type === 'selected' && (
                <>
                  {campaign.visitStatus === 'scheduled' && (
                    <div className={styles.CampaignCard__VisitDateWrapper}>
                      <span className={styles.CampaignCard__VisitDate}>
                        {campaign.appliedAt &&
                          dayjs(`${campaign.appliedAt[0]} ${campaign.appliedAt[1]}`).format(
                            'M월 D일 dddd A h:mm',
                          )}
                      </span>
                      <button
                        type="button"
                        onClick={handleKebapClick}
                        className={styles.CampaignCard__KebapButton}
                      >
                        <IconKebap size={20} color={Colors.COLOR_GRAY_600} />
                      </button>
                    </div>
                  )}
                  {campaign.visitStatus === 'before' && (
                    <span className={styles.CampaignCard__SelectedText}>
                      {HISTORY_MESSAGES.SELECTED}
                    </span>
                  )}
                </>
              )}

              <h3 className={styles.CampaignCard__Brand}>{campaign.brand}</h3>
              <p className={styles.CampaignCard__Title}>{campaign.providedItems}</p>

              {/* rejected 타입 */}
              {type === 'rejected' && (
                <CampaignRejectedCard
                  recruitmentSchedule={campaign.recruitmentSchedule}
                  maxRecruitment={campaign.maxRecruitment}
                />
              )}
            </section>
          </header>

          {/* TODO: 추후 조건(applied, selected, registered, completed) 관련해 논의 후 추가 필요 (구조 변경 가능성 높음) */}
        </article>
      </Link>

      {/* selected 타입 - Link 밖으로 분리*/}
      {type === 'selected' && campaign.visitStatus && (
        <CampaignSelectedCard campaign={campaign} visitStatus={campaign.visitStatus} />
      )}

      {/* 예약 옵션 BottomSheet */}
      {type === 'selected' && campaign.visitStatus === 'scheduled' && (
        <BottomSheet opened={isOpen} onClose={close} height={200} withCloseButton={false}>
          <div className={styles.CampaignCard__BottomSheetMenu}>
            {/* 당일이 아닐 때만 날짜 변경 버튼 표시 */}
            {!isToday && (
              <div className={styles.CampaignCard__Divider}>
                <button
                  type="button"
                  onClick={handleChangeDateClick}
                  className={styles.CampaignCard__MenuButton}
                >
                  <span className={styles.CampaignCard__MenuButtonText}>
                    {HISTORY_MESSAGES.CHANGE_RESERVATION_DATE}
                  </span>
                  <IconCalendar size={24} color={Colors.COLOR_GRAY_900} />
                </button>
              </div>
            )}

            <div className={styles.CampaignCard__Divider}>
              <button
                type="button"
                onClick={handleCancelClick}
                className={`${styles.CampaignCard__MenuButton} ${styles['CampaignCard__MenuButton--Danger']}`}
              >
                <span className={styles.CampaignCard__MenuButtonDangerText}>
                  {HISTORY_MESSAGES.CANCEL_RESERVATION}
                </span>
                {/* TODO: 관련 컴포넌트 개발 예정 (예약 취소 아이콘 - popUI)) */}
                <IconCalendar size={24} color={Colors.COLOR_RED_500} />
              </button>
            </div>

            {/* 당일일 때만 경고 메시지 표시 */}
            {isToday && (
              <div className={styles.CampaignCard__WarningMessage}>
                {HISTORY_MESSAGES.CANCEL_RESERVATION_TODAY_NOT_ALLOWED}
              </div>
            )}
          </div>
        </BottomSheet>
      )}
    </>
  );
}
