import { IconCheckCircle } from '@pop-ui/foundation';

import { Colors } from '@shared/styles/colors';

import { MAIN_MESSAGES } from './constants';
import { formatDateForConfirmationCard } from './util';

import type { ConfirmationCardProps } from './type';

import styles from './style.module.scss';

/**
 *  ConfirmationCard 컴포넌트
 *
 *  체험단 방문 예약 또는 신청 완료 상태를 나타내는 확인 카드 컴포넌트입니다.
 *  체크 아이콘(@pop-ui/foundation)과 함께 타입별 메시지와 날짜/시간을 자동으로 포맷팅하여 표시합니다.
 *  이때 date는 DateInput 타입으로 받으며, 날짜 포맷팅은 dayjs를 사용하여 자동으로 처리합니다.
 *
 * @example
 *
 * // type: 'reservation' (예약 완료 카드)
 * <ConfirmationCard
 *   date={new Date('2024-09-18T13:00:00')}
 *   type="reservation"
 * />
 *
 * // type: 'application' (신청 완료 카드)
 * <ConfirmationCard
 *   date={new Date('2024-12-23')}
 *   type="application"
 * />
 */

export function ConfirmationCard({ date, type }: ConfirmationCardProps) {
  const { dateText, resultText } = formatDateForConfirmationCard(date, type);

  return (
    <article className={styles.ConfirmationCard}>
      <IconCheckCircle color={Colors.COLOR_AQUA_500} size={48} />
      <div className={styles.ConfirmationCard__Content}>
        <h2 className={styles.ConfirmationCard__Message}>{MAIN_MESSAGES[type]}</h2>
        <p className={styles.ConfirmationCard__SubMessage}>
          {dateText}
          {resultText && <span className={styles.ConfirmationCard__ResultText}>{resultText}</span>}
        </p>
      </div>
    </article>
  );
}
