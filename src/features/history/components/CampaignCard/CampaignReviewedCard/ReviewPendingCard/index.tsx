import { Button } from '@shared/components';

import { HISTORY_UI, HISTORY_MESSAGES } from '@features/history/constants';

import styles from './style.module.scss';

interface IReviewPendingCardProps {
  reviewUrl?: string;
}

/**
 * 후기 검토 중 상태 카드 컴포넌트 (reviewPending 상태일 때 버튼 표시)
 * @param reviewUrl - 후기 URL
 * @returns 후기 검토 중 상태의 카드 컴포넌트
 */
export function ReviewPendingCard({ reviewUrl }: IReviewPendingCardProps) {
  const handleMyReviewClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (reviewUrl) {
      window.open(reviewUrl, '_blank');
    }
  };

  return (
    <div className={styles.ReviewPendingCard}>
      <div className={styles.ReviewPendingCard__Content}>
        <Button
          variant="secondary"
          fullWidth
          radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM}
          size="small"
          onClick={handleMyReviewClick}
        >
          <span className={styles['ReviewPendingCard__ButtonText--Secondary']}>
            {HISTORY_MESSAGES.MY_REVIEW}
          </span>
        </Button>
      </div>
    </div>
  );
}
