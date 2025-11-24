import { Button } from '@pop-ui/core';
import { IconWarningCircle } from '@pop-ui/foundation';

import { Colors } from '@shared/styles/colors';
import { HISTORY_MESSAGES } from '@features/history/constants';
import type { CampaignSelectedCardProps } from './types';

import styles from './style.module.scss';

/**
 * 선정된 체험 카드의 액션 영역 컴포넌트
 * @param visitStatus - 방문 상태 (before: 방문 전, scheduled: 방문 예정)
 * @param onReservationClick - 예약 날짜 설정 버튼 클릭 핸들러
 * @param onReviewMissionClick - 리뷰 미션 버튼 클릭 핸들러
 */
export function CampaignSelectedCard({
  visitStatus,
  onReservationClick,
  onReviewMissionClick,
}: CampaignSelectedCardProps) {
  // 방문 전 상태: 예약 날짜 설정 버튼 + 경고 메시지
  if (visitStatus === 'before') {
    return (
      <footer className={styles.CampaignSelectedCard__ContentWrapper}>
        <Button
          variant="primary"
          fullWidth
          radius={8}
          onClick={() => {
            onReservationClick?.();
          }}
        >
          <span className={styles.CampaignSelectedCard__PrimaryText}>
            {HISTORY_MESSAGES.SET_VISIT_DATE}
          </span>
        </Button>
        <div className={styles.CampaignSelectedCard__WarningWrapper}>
          <IconWarningCircle color={Colors.COLOR_GRAY_400} size={12} />
          <span className={styles.CampaignSelectedCard__WarningText}>
            {HISTORY_MESSAGES.RESERVATION_WARNING}
          </span>
        </div>
      </footer>
    );
  }

  // 방문 예정 상태: 리뷰 미션 버튼
  if (visitStatus === 'scheduled') {
    return (
      <Button
        variant="basic"
        fullWidth
        radius={8}
        onClick={() => {
          onReviewMissionClick?.();
        }}
      >
        <span className={styles.CampaignSelectedCard__BasicText}>
          {HISTORY_MESSAGES.REVIEW_MISSION}
        </span>
      </Button>
    );
  }

  return null;
}
