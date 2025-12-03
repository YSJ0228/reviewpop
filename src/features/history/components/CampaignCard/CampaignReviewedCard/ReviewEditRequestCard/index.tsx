import { Button } from '@shared/components';

import { HISTORY_UI, HISTORY_MESSAGES } from '@features/history/constants';

import styles from './style.module.scss';

/**
 * 후기 수정 요청 상태 카드 컴포넌트 (requiredForEditing 상태일 때 버튼 표시)
 * @returns 후기 수정 요청 상태의 카드 컴포넌트
 */
export function ReviewEditRequestCard() {
  return (
    <div className={styles.ReviewEditRequestCard}>
      <div className={styles.ReviewEditRequestCard__Content}>
        {/* TODO: 수정 요청 내용 버튼 클릭 시 */}
        <Button variant="secondary" fullWidth radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM} size="small">
          <span className={styles['ReviewEditRequestCard__ButtonText--Secondary']}>
            {HISTORY_MESSAGES.EDIT_REQUEST_CONTENT}
          </span>
        </Button>

        {/* TODO: 후기 재등록 버튼 클릭 시 */}
        <Button variant="primary" fullWidth radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM} size="small">
          <span className={styles['ReviewEditRequestCard__ButtonText--Primary']}>
            {HISTORY_MESSAGES.REREGISTER_REVIEW}
          </span>
        </Button>
      </div>
    </div>
  );
}
