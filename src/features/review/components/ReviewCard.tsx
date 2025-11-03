/**
 * ReviewCard 컴포넌트
 *
 * 리뷰를 카드 형태로 표시하는 컴포넌트입니다.
 */

import Image from 'next/image';

import type { Review } from '../api/reviewApi';

import styles from './ReviewCard.module.scss';

interface ReviewCardProps {
  review: Review;
}

/**
 * 별점을 표시하는 함수
 */
function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
      ★
    </span>
  ));
}

/**
 * 날짜 포맷팅 함수
 */
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className={styles.card}>
      {/* 헤더 */}
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{review.user.name}</span>
          <span className={styles.date}>{formatDate(review.createdAt)}</span>
        </div>
        <div className={styles.rating}>{renderStars(review.rating)}</div>
      </div>

      {/* 본문 */}
      <div className={styles.body}>
        <h3 className={styles.title}>{review.title}</h3>
        <p className={styles.content}>{review.content}</p>
      </div>

      {/* 이미지 */}
      {review.images && review.images.length > 0 && (
        <div className={styles.images}>
          {review.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`리뷰 이미지 ${index + 1}`}
              width={200}
              height={200}
              className={styles.image}
            />
          ))}
        </div>
      )}
    </article>
  );
}
