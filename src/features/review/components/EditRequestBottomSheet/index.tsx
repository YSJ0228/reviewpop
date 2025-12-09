import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { BottomSheet } from '@shared/components/BottomSheet';
import { Button, LoadingSpinner } from '@shared/components';
import { useReviewEditRequest } from '@entities/review';

import styles from './style.module.scss';

import { EditRequestBottomSheetProps } from './types';

export function EditRequestBottomSheet({
  opened,
  onClose,
  reviewId,
  campaignId,
  applicationId,
}: EditRequestBottomSheetProps) {
  const { data: reviewEditRequest, isLoading, error } = useReviewEditRequest(reviewId, opened);
  const router = useRouter();

  return (
    <BottomSheet
      opened={opened}
      onClose={onClose}
      title="수정 요청 내용"
      footer={
        <Button
          variant="primary"
          fullWidth
          onClick={() =>
            router.push(
              `/campaign/${campaignId}/review/write?applicationId=${applicationId}&reviewId=${reviewId}`,
            )
          }
        >
          후기 재등록
        </Button>
      }
    >
      {isLoading && <LoadingSpinner />}
      {error && <div>데이터를 불러올 수 없습니다.</div>}
      {reviewEditRequest && (
        <div className={styles.EditRequestBottomSheet}>
          {reviewEditRequest.image && (
            <div style={{ width: '100%', height: 200, position: 'relative' }}>
              <Image
                src={reviewEditRequest.image}
                alt="수정 요청"
                fill
                style={{ objectFit: 'cover', borderRadius: 10 }}
              />
            </div>
          )}
          <div className={styles.EditRequestBottomSheet__EditRequest}>
            <h3 className={styles.EditRequestBottomSheet__SubTitle}>수정 요청</h3>
            <span className={styles.EditRequestBottomSheet__Content}>
              {reviewEditRequest.content}
            </span>
          </div>
          <div className={styles.EditRequestBottomSheet__Line}></div>
          <div>
            <h3 className={styles.EditRequestBottomSheet__SubTitle}>유의 사항</h3>
            <ul className={styles.EditRequestBottomSheet__Caution}>
              {reviewEditRequest.precaution.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
