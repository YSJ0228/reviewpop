'use client';

import { useBlogReviews } from '@features/review/hooks/useBlogReviews';

import styles from './page.module.scss';
import { use } from 'react';
import ReviewCard from '@entities/review/ui/ReviewCard';

interface CampaignDetailPageProps {
  params: Promise<{
    campaignId: string;
  }>;
}

export default function ReviewSection({ params }: CampaignDetailPageProps) {
  const { campaignId } = use(params);
  const { data: blogReviews } = useBlogReviews(campaignId);
  return (
    <section className={styles.ReviewSection}>
      <ul>
        {blogReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
}
