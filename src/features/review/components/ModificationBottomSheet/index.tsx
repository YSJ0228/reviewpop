import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { BottomSheet } from '@shared/components/BottomSheet';
import { useReviewModificationRequest } from '@entities/review/hooks/useReviewModification';
import { ButtonBar } from '@features/campaign/components/ButtonBar';

import styles from './style.module.scss';

import { ModificationBottomSheetProps } from './types';

export function ModificationBottomSheet({
  opened,
  onClose,
  reviewId,
}: ModificationBottomSheetProps) {
  const { data: reviewModification } = useReviewModificationRequest(reviewId);
  const router = useRouter();
  //TODO: canpaignId, reviewId 어디서 받아오는지 결정
  console.log(reviewModification);
  return (
    <BottomSheet opened={opened} onClose={onClose} title="수정 요청 내용">
      <div className={styles.ModificationBottomSheet}>
        {reviewModification?.image && (
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
            {reviewModification?.content}
          </span>
        </div>
        <div className={styles.ModificationBottomSheet__Line}></div>
        <div>
          <h3 className={styles.ModificationBottomSheet__SubTitle}>유의 사항</h3>
          <ul className={styles.ModificationBottomSheet__Caution}>
            {reviewModification?.precaution.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      </div>
      <ButtonBar
        variant="primary"
        text="후기 재등록"
        onClick={() => router.push('/campaign/1/review/write')}
      />
    </BottomSheet>
  );
}
