import Image from 'next/image';

import { Button } from '@shared/components';

import { HISTORY_UI } from '@features/history/constants';

import type { CampaignReviewedCardProps } from './type';

import styles from './style.module.scss';

/**
 * 후기 탭 카드 컴포넌트
 * @param reviewStatus - 리뷰 상태
 * @param campaignStatus - 캠페인 상태 (체험 상태)
 * @returns 후기 탭 카드 컴포넌트 (후기 등록 전, 후기 검토 중, 후기 수정 요청, 후기 등록 완료)
 */
export function CampaignReviewedCard({ reviewStatus, campaignStatus }: CampaignReviewedCardProps) {
  // 체험이 종료되었지만 후기 미등록인 경우 (특별 케이스)
  const isClosedNotReviewed = campaignStatus === 'closed' && reviewStatus === 'notReviewed';

  return (
    <div className={styles.CampaignReviewedCard}>
      <div
        className={`${styles.CampaignReviewedCard__Content} ${
          isClosedNotReviewed ? styles['CampaignReviewedCard__Content--Column'] : ''
        }`}
      >
        {/* 후기 등록 전 */}
        {reviewStatus === 'notReviewed' && (
          <>
            <div className={styles.CampaignReviewedCard__Buttons}>
              <Button
                variant="secondary"
                fullWidth
                radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM}
                size="small"
              >
                <span className={styles['CampaignReviewedCard__ButtonText--BlogTip']}>
                  <span className={styles['CampaignReviewedCard__ButtonText--Secondary']}>
                    블로그 후기 예시
                  </span>
                  <Image
                    src={'/images/icons/IcoBlogTip.svg'}
                    width={21}
                    height={16}
                    alt="블로그 후기 예시"
                  />
                </span>
              </Button>
              <Button
                variant="primary"
                fullWidth
                radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM}
                size="small"
              >
                <span className={styles['CampaignReviewedCard__ButtonText--Primary']}>
                  후기등록
                </span>
              </Button>
            </div>
            {/* 체험이 종료되었지만 후기 미등록인 경우 경고 메시지 표시 */}
            {isClosedNotReviewed && (
              <p className={styles.CampaignReviewedCard__Warning}>
                후기 작성이 안되면 다음 체험 참여가 불가능 해요
              </p>
            )}
          </>
        )}

        {/* 후기 검토 중 */}
        {reviewStatus === 'reviewPending' && (
          <Button
            variant="secondary"
            fullWidth
            radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM}
            size="small"
          >
            <span className={styles['CampaignReviewedCard__ButtonText--Secondary']}>
              내가 작성한 후기
            </span>
          </Button>
        )}

        {/* 후기 수정 요청 */}
        {reviewStatus === 'requiredForEditing' && (
          <>
            <Button
              variant="secondary"
              fullWidth
              radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM}
              size="small"
            >
              <span className={styles['CampaignReviewedCard__ButtonText--Secondary']}>
                수정 요청 내용
              </span>
            </Button>
            <Button
              variant="primary"
              fullWidth
              radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM}
              size="small"
            >
              <span className={styles['CampaignReviewedCard__ButtonText--Primary']}>
                후기 재등록
              </span>
            </Button>
          </>
        )}

        {/* 후기 등록 완료 */}
        {reviewStatus === 'reviewed' && (
          <Button
            variant="secondary"
            fullWidth
            radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM}
            size="small"
          >
            <span className={styles['CampaignReviewedCard__ButtonText--Secondary']}>
              내 블로그 후기
            </span>
          </Button>
        )}
      </div>
    </div>
  );
}
