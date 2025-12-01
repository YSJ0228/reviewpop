import Image from 'next/image';

import { BlogReview } from '@entities/review/types/review.types';

import styles from './style.module.scss';

export default function ReviewCard({ review }: { review: BlogReview }) {
  return (
    <li className={styles.ReviewCard}>
      <a href={review.url} target="_blank" rel="noopener noreferrer">
        <div className={styles.ReviewCard__ThumbnailWrapper}>
          <Image src={review.thumbnail} fill alt={`${review.title}의 후기 이미지`} />
        </div>
        <span>{review.title}</span>
        <p>{review.article}</p>
      </a>
    </li>
  );
}
