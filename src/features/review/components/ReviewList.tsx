/**
 * ReviewList 컴포넌트
 *
 * 리뷰 목록을 표시하는 컴포넌트입니다.
 * useReviews 훅을 사용하여 데이터를 가져옵니다.
 *
 * @example
 * ```tsx
 * import { ReviewList } from '@features/review/components/ReviewList';
 *
 * function ReviewPage() {
 *   return (
 *     <div>
 *       <h1>리뷰 목록</h1>
 *       <ReviewList />
 *     </div>
 *   );
 * }
 * ```
 */

'use client';

import { useReviews } from '../hooks/useReviews';
import { ReviewCard } from './ReviewCard';
import styles from './ReviewList.module.scss';

export function ReviewList() {
  const { data: reviews, isLoading, error } = useReviews();

  if (isLoading) {
    return (
      <div className={styles['ReviewList--Loading']}>
        <p>리뷰를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['ReviewList--Error']}>
        <p>리뷰를 불러오는데 실패했습니다.</p>
        <p className={styles.ReviewList__ErrorMessage}>{error.message}</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className={styles['ReviewList--Empty']}>
        <p>아직 작성된 리뷰가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.ReviewList}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
