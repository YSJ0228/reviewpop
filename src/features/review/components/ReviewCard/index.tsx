/**
 * ReviewCard 컴포넌트
 *
 * 리뷰를 카드 형태로 표시하는 컴포넌트입니다.
 */

import Image from 'next/image';
import { formatDate } from '@shared/lib/date';
import type { ReviewCardProps } from './types';
import styles from './style.module.scss';

/**
 * 별점을 표시하는 함수
 */
function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={
        i < rating ? styles['ReviewCard__Star--Filled'] : styles['ReviewCard__Star--Empty']
      }
    >
      ★
    </span>
  ));
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className={styles.ReviewCard}>
      {/* 헤더 */}
      <div className={styles.ReviewCard__Header}>
        <div className={styles.ReviewCard__UserInfo}>
          <span className={styles.ReviewCard__UserName}>{review.user.name}</span>
          <span className={styles.ReviewCard__Date}>{formatDate(review.createdAt, 'LONG')}</span>
        </div>
        <div className={styles.ReviewCard__Rating}>{renderStars(review.rating)}</div>
      </div>

      {/* 본문 */}
      <div className={styles.ReviewCard__Body}>
        <h3 className={styles.ReviewCard__Title}>{review.title}</h3>
        <p className={styles.ReviewCard__Content}>{review.content}</p>
      </div>

      {/* 이미지 */}
      {review.images && review.images.length > 0 && (
        <div className={styles.ReviewCard__Images}>
          {review.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`리뷰 이미지 ${index + 1}`}
              width={200}
              height={200}
            />
          ))}
        </div>
      )}
    </article>
  );
}
