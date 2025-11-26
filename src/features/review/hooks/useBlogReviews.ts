import { useState, useEffect } from 'react';
import { BlogReview } from '@entities/review/types/review.types';
import { mockBlogReviews } from '@entities/campaign/lib/mockBlogReviews';

export function useBlogReviews(campaignId: string) {
  const [reviews, setReviews] = useState<BlogReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const filteredReviews = mockBlogReviews.filter((review) => review.campaignId === campaignId);
    function handleReview() {
      setReviews(filteredReviews);
      setIsLoading(false);
    }
    handleReview();
  }, [campaignId]);

  return { data: reviews, isLoading };
}
