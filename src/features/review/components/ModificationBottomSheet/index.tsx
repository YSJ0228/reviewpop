import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Loader } from '@mantine/core';

import { BottomSheet } from '@shared/components/BottomSheet';
import { Button } from '@shared/components';
import { useReviewModificationRequest } from '@entities/review';

import styles from './style.module.scss';

import { ModificationBottomSheetProps } from './types';

export function ModificationBottomSheet({
  opened,
  onClose,
  reviewId,
  campaignId,
  applicationId,
}: ModificationBottomSheetProps) {
  const {
    data: reviewModification,
    isLoading,
    error,
  } = useReviewModificationRequest(reviewId, opened);
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
      {isLoading && <Loader />}
      {error && <div>데이터를 불러올 수 없습니다.</div>}
      {reviewModification && (
        <div className={styles.ModificationBottomSheet}>
          {reviewModification.image && (
            <Image
              src={reviewModification.image}
              alt="수정 요청"
              height={200}
              width={328}
              style={{ borderRadius: 10 }}
            />
          )}
          <div className={styles.ModificationBottomSheet__EditRequest}>
            <h3 className={styles.ModificationBottomSheet__SubTitle}>수정 요청</h3>
            <span className={styles.ModificationBottomSheet__Content}>
              {reviewModification.content}
            </span>
          </div>
          <div className={styles.ModificationBottomSheet__Line}></div>
          <div>
            <h3 className={styles.ModificationBottomSheet__SubTitle}>유의 사항</h3>
            <ul className={styles.ModificationBottomSheet__Caution}>
              {reviewModification.precaution.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
