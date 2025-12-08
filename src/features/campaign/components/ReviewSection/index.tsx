'use client';

import Link from 'next/link';

import { Button } from '@shared/components';
import { Campaign } from '@entities/campaign/types/campaign.types';
import { useBlogReviews } from '@features/review/hooks/useBlogReviews';

import styles from './style.module.scss';
import ReviewCard from '@entities/review/ui/ReviewCard';

export default function ReviewSection({ campaignId }: { campaignId: Campaign['id'] }) {
  const { data: blogReviews } = useBlogReviews(campaignId);

  if (blogReviews.length === 0) return null;

  return (
    <section className={styles.ReviewSection}>
      <h2>체험단 후기</h2>
      <ul>
        {blogReviews.slice(0, 4).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ul>

      {blogReviews.length > 4 && (
        <Link href={`/campaign/${campaignId}/review`}>
          <Button variant="secondary" size="medium" className={styles.ReviewSection__Button}>
            전체 후기
          </Button>
        </Link>
      )}
    </section>
  );
}
