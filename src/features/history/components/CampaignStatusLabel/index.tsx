import dayjs from '@shared/lib/dayjs.config';

import {
  CARD_TYPES,
  STATUS_REVIEW_TITLES,
  STATUS_VISIT,
  HISTORY_MESSAGES,
  REVIEW_STATUS,
  CAMPAIGN_STATUS,
} from '@features/history/constants';
import { DATE_FORMATS } from '@shared/lib/date';

import type { CampaignStatusLabelProps } from './types';

import styles from './style.module.scss';

/**
 *
 * @param type - 카드 타입
 * @param visitStatus - 방문 상태
 * @param reviewStatus - 후기 상태
 * @param reservationDate - 예약 날짜
 * @param campaignStatus - 캠페인 상태 (체험의 상태)
 * @returns
 */
export function CampaignStatusLabel({
  type,
  visitStatus,
  reviewStatus,
  reservationDate,
  campaignStatus,
}: CampaignStatusLabelProps) {
  // SELECTED 타입일 때 방문 상태 라벨 표시
  if (type === CARD_TYPES.SELECTED && visitStatus) {
    return (
      <div className={styles.CampaignStatusLabel} aria-label="방문 상태 라벨">
        <p>{STATUS_VISIT[visitStatus]}</p>
      </div>
    );
  }

  // REVIEWED 또는 COMPLETED 타입일 때 후기 상태 및 방문 날짜 표시
  // reviewStatus가 옵셔널이므로 타입 가드 추가
  if (
    (type === CARD_TYPES.REVIEWED || type === CARD_TYPES.COMPLETED) &&
    reviewStatus !== undefined
  ) {
    // 체험이 종료되었지만 후기 미등록인 경우 "체험 종료" 표시
    const statusTitle =
      reviewStatus === REVIEW_STATUS.NOT_REVIEWED && campaignStatus === CAMPAIGN_STATUS.CLOSED
        ? STATUS_REVIEW_TITLES.closed
        : STATUS_REVIEW_TITLES[reviewStatus];

    return (
      <div className={styles['CampaignStatusLabel--Reviewed']} aria-label="체험 완료 상태 라벨">
        <span>{statusTitle}</span>
        <span className={styles.CampaignStatusLabel__ReservationDate}>
          {reservationDate
            ? `${dayjs(reservationDate).format(DATE_FORMATS.RESERVATION_DATE_SHORT)} ${HISTORY_MESSAGES.VISITED}`
            : ' '}
        </span>
      </div>
    );
  }

  return null;
}
