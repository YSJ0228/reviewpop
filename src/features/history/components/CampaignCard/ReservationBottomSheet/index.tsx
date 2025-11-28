import { IconCalendar } from '@pop-ui/foundation';

import { HISTORY_MESSAGES, HISTORY_UI } from '@features/history/constants';
import { useIsTodayReservation } from '@features/history/hooks/useIsTodayReservation';
import { Colors } from '@shared/styles/colors';
import { BottomSheet } from '@shared/components/BottomSheet';
import { Modal } from '@shared/components';

import type { ReservationBottomSheetProps } from './type';

import styles from './style.module.scss';

/**
 * 예약 관리 BottomSheet 컴포넌트
 * 예약 날짜 변경 및 예약 취소 기능을 제공합니다.
 */
export function ReservationBottomSheet({
  appliedAt,
  isOpen,
  onClose,
  onDateChange,
  onCancel,
}: ReservationBottomSheetProps) {
  // 체험 예약일이 당일인지 확인
  const isToday = useIsTodayReservation(appliedAt);

  // 예약 관리 메뉴 높이 계산
  const bottomSheetHeight = isToday
    ? HISTORY_UI.RESERVATION_MENU_TODAY
    : HISTORY_UI.RESERVATION_MENU_HEIGHT;

  // 예약 취소 확인 핸들러
  const handleCancelReservationClick = async () => {
    await onCancel();
  };

  return (
    <BottomSheet
      opened={isOpen}
      onClose={onClose}
      height={bottomSheetHeight}
      withCloseButton={false}
      aria-label="예약 관리 메뉴"
    >
      <div className={styles.ReservationBottomSheet__Menu}>
        {/* 당일이 아닐 때만 날짜 변경 버튼 표시 */}
        {!isToday && (
          <div className={styles.ReservationBottomSheet__Divider}>
            <button
              type="button"
              onClick={onDateChange}
              className={styles.ReservationBottomSheet__MenuButton}
            >
              <span className={styles.ReservationBottomSheet__MenuButtonText}>
                {HISTORY_MESSAGES.CHANGE_RESERVATION_DATE}
              </span>
              <IconCalendar size={24} color={Colors.COLOR_GRAY_900} />
            </button>
          </div>
        )}

        <div className={styles.ReservationBottomSheet__Divider}>
          <Modal
            variant="outline"
            trigger={
              <button
                type="button"
                className={`${styles.ReservationBottomSheet__MenuButton} ${styles['ReservationBottomSheet__MenuButton--Danger']}`}
              >
                <span className={styles.ReservationBottomSheet__MenuButtonDangerText}>
                  {HISTORY_MESSAGES.CANCEL_RESERVATION}
                </span>
                <IconCalendar size={24} color={Colors.COLOR_RED_500} />
              </button>
            }
            onConfirm={handleCancelReservationClick}
          />
        </div>

        {/* 당일일 때만 경고 메시지 표시 */}
        {isToday && (
          <div className={styles.ReservationBottomSheet__WarningMessage}>
            {HISTORY_MESSAGES.CANCEL_RESERVATION_TODAY_NOT_ALLOWED}
          </div>
        )}
      </div>
    </BottomSheet>
  );
}
