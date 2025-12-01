import { ColorAqua500, IconCheckCircle } from '@pop-ui/foundation';
import { formatDate } from '@shared/lib/date';

import styles from './ReserveCompleteText.module.scss';

const COMPLTETE_TEXT = '체험단 방문 예약이 완료 되었어요!';

export function ReserveCompleteText({ date }: { date: string }) {
  return (
    <div className={styles.ReserveCompleteText}>
      <IconCheckCircle size={48} color={ColorAqua500} />
      <div className={styles.ReserveCompleteText__Content}>
        <h2>{COMPLTETE_TEXT}</h2>
        <p>
          {formatDate(date, 'MMDD_DDDD_LONG')} {formatDate(date, 'TIME_WITH_AMPM')}
        </p>
      </div>
    </div>
  );
}
