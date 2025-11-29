'use client';

import { use } from 'react';

import ReviewCard from '@entities/review/ui/ReviewCard';
import { useBlogReviews } from '@features/review/hooks/useBlogReviews';

import { CampaignDetailPageProps } from '@entities/campaign/types/page.types';

import styles from './page.module.scss';

export default function CampaignReviewPage({ params }: CampaignDetailPageProps) {
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
