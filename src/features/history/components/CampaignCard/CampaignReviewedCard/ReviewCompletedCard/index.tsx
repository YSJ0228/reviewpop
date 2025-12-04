import { Button } from '@shared/components';

import { HISTORY_UI, HISTORY_MESSAGES } from '@features/history/constants';

import styles from './style.module.scss';

/**
 * 후기 등록 완료 상태 카드 컴포넌트 (후기 상태 = reviewed)
 * @returns 후기 등록 완료 상태의 카드 컴포넌트
 */
export function ReviewCompletedCard() {
  return (
    <div className={styles.ReviewCompletedCard}>
      <div className={styles.ReviewCompletedCard__Content}>
        {/* TODO: 내 블로그 후기 버튼 클릭 시 */}
        <Button variant="secondary" fullWidth radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM} size="small">
          <span className={styles['ReviewCompletedCard__ButtonText--Secondary']}>
            {HISTORY_MESSAGES.MY_BLOG_REVIEW}
          </span>
        </Button>
      </div>
    </div>
  );
}
