import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

import { Button } from '@shared/components';
import { ModificationBottomSheet } from '@features/review/components/ModificationBottomSheet';
import { HISTORY_UI, HISTORY_MESSAGES } from '@features/history/constants';

import styles from './style.module.scss';

interface ReviewEditRequestCardProps {
  campaignId?: string;
  reviewId?: string;
  applicationId?: string;
}

/**
 * 후기 수정 요청 상태 카드 컴포넌트 (requiredForEditing 상태일 때 버튼 표시)
 * @param campaignId - 캠페인 ID
 * @param reviewId - 후기 ID
 * @param applicationId - 신청 ID
 * @returns 후기 수정 요청 상태의 카드 컴포넌트
 */
export function ReviewEditRequestCard({
  campaignId = '1',
  reviewId = '1',
  applicationId,
}: ReviewEditRequestCardProps) {
  const [opened, { open, close }] = useDisclosure();
  const router = useRouter();

  // reviewId와 campaignId가 없으면 ModificationBottomSheet를 사용할 수 없음
  const canOpenModificationSheet = !!reviewId && !!campaignId;

  return (
    <>
      <div className={styles.ReviewEditRequestCard}>
        <div className={styles.ReviewEditRequestCard__Content}>
          <Button
            variant="secondary"
            fullWidth
            radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM}
            size="small"
            onClick={canOpenModificationSheet ? open : undefined}
          >
            <span className={styles['ReviewEditRequestCard__ButtonText--Secondary']}>
              {HISTORY_MESSAGES.EDIT_REQUEST_CONTENT}
            </span>
          </Button>

          {/* 후기 재등록 버튼 클릭 시 */}
          <Button
            variant="primary"
            fullWidth
            radius={HISTORY_UI.BUTTON_RADIUS_MEDIUM}
            size="small"
            onClick={() =>
              router.push(
                `/campaign/${campaignId}/review/write?applicationId=${applicationId}&reviewId=${reviewId}`,
              )
            }
          >
            <span className={styles['ReviewEditRequestCard__ButtonText--Primary']}>
              {HISTORY_MESSAGES.REREGISTER_REVIEW}
            </span>
          </Button>
        </div>
      </div>
      {canOpenModificationSheet && (
        <ModificationBottomSheet
          opened={opened}
          onClose={close}
          reviewId={reviewId}
          campaignId={campaignId}
          applicationId={applicationId}
        />
      )}
    </>
  );
}
