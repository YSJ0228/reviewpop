import { IconWarningCircle } from '@pop-ui/foundation';

import { Colors } from '@shared/styles/colors';
import { Button } from '@shared/components';
import { HISTORY_MESSAGES, HISTORY_UI } from '@features/history/constants';

import styles from './style.module.scss';
import { ReservationBeforeCardProps } from './types';

/**
 * 방문 전 상태 카드 컴포넌트 (before 상태(방문 전)일 때 버튼 표시)
 * @param onReservationClick - 예약 설정 버튼 클릭 핸들러
 */
export function ReservationBeforeCard({ onReservationClick }: ReservationBeforeCardProps) {
  return (
    <>
      <Button
        variant="primary"
        fullWidth
        radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM}
        onClick={onReservationClick}
      >
        <span className={styles.ReservationBeforeCard__PrimaryText}>
          {HISTORY_MESSAGES.SET_VISIT_DATE}
        </span>
      </Button>
      <div className={styles.ReservationBeforeCard__WarningWrapper}>
        <IconWarningCircle color={Colors.COLOR_GRAY_400} size={HISTORY_UI.WARNING_ICON_SIZE} />
        <span className={styles.ReservationBeforeCard__WarningText}>
          {HISTORY_MESSAGES.RESERVATION_WARNING}
        </span>
      </div>
    </>
  );
}
