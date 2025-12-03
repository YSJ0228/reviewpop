import { Button } from '@shared/components';

import { HISTORY_UI, HISTORY_MESSAGES } from '@features/history/constants';

import styles from './style.module.scss';

/**
 * 후기 검토 중 상태 카드 컴포넌트 (reviewPending 상태일 때 버튼 표시)
 * @returns 후기 검토 중 상태의 카드 컴포넌트
 */
export function ReviewPendingCard() {
  return (
    <div className={styles.ReviewPendingCard}>
      <div className={styles.ReviewPendingCard__Content}>
        {/* TODO: 내가 작성한 후기 버튼 클릭 시 */}
        <Button variant="secondary" fullWidth radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM} size="small">
          <span className={styles['ReviewPendingCard__ButtonText--Secondary']}>
            {HISTORY_MESSAGES.MY_REVIEW}
          </span>
        </Button>
      </div>
    </div>
  );
}
