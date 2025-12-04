import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@shared/components';

import { HISTORY_UI, HISTORY_MESSAGES, BLOG_REVIEW_EXAMPLE_URL } from '@features/history/constants';

import type { ReviewNotRegisteredCardProps } from './types';

import styles from './style.module.scss';

/**
 * 후기 미등록 상태 카드 컴포넌트 (notReviewed & visited 상태일 때 버튼 표시)
 * @param campaignStatus - 캠페인 상태 (체험 상태)
 * @param campaignId - 캠페인 ID
 * @param applicationId - 신청 ID
 * @returns 후기 등록 전 상태의 카드 컴포넌트
 */
export function ReviewNotRegisteredCard({
  campaignStatus,
  campaignId,
  applicationId,
}: ReviewNotRegisteredCardProps) {
  // 체험이 종료되었지만 후기 미등록인 경우 (특별 케이스)
  const isClosedNotReviewed = campaignStatus === 'closed';
  const router = useRouter();

  return (
    <div className={styles.ReviewNotRegisteredCard}>
      <div
        className={`${styles.ReviewNotRegisteredCard__Content} ${
          isClosedNotReviewed ? styles['ReviewNotRegisteredCard__Content--Column'] : ''
        }`}
      >
        <div className={styles.ReviewNotRegisteredCard__Buttons}>
          {/* TODO: 블로그 후기 예시 버튼 클릭 시 */}
          <Button
            variant="secondary"
            fullWidth
            radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM}
            size="small"
            onClick={() => {
              window.open(BLOG_REVIEW_EXAMPLE_URL, '_blank', 'noopener,noreferrer');
            }}
          >
            <span className={styles['ReviewNotRegisteredCard__ButtonText--BlogTip']}>
              <span className={styles['ReviewNotRegisteredCard__ButtonText--Secondary']}>
                {HISTORY_MESSAGES.BLOG_REVIEW_EXAMPLE}
              </span>
              <Image
                src={'/images/icons/IcoBlogTip.svg'}
                width={21}
                height={16}
                alt="블로그 후기 예시"
              />
            </span>
          </Button>

          {/* 후기 등록 버튼 클릭 시 후기 등록 페이지로 이동 */}
          <Button
            variant="primary"
            fullWidth
            radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM}
            size="small"
            onClick={() =>
              router.push(`/campaign/${campaignId}/review/write?applicationId=${applicationId}`)
            }
          >
            <span className={styles['ReviewNotRegisteredCard__ButtonText--Primary']}>
              {HISTORY_MESSAGES.REGISTER_REVIEW}
            </span>
          </Button>
        </div>

        {/* 체험이 종료되었지만 후기 미등록인 경우 경고 메시지 표시 */}
        {isClosedNotReviewed && (
          <p className={styles.ReviewNotRegisteredCard__Warning}>
            {HISTORY_MESSAGES.REVIEW_NOT_REGISTERED_WARNING}
          </p>
        )}
      </div>
    </div>
  );
}
