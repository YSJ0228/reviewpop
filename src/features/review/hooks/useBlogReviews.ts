import { useState, useEffect } from 'react';
import { BlogReview } from '@entities/review/types/review.types';
import { reviewApi } from '@entities/review/api/reviewApi';

export function useBlogReviews(campaignId: string) {
  const [reviews, setReviews] = useState<BlogReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const data = await reviewApi.getReviews({ campaignId, size: 100 }); // 전체 리뷰를 가져오기 위해 넉넉하게 요청
        setReviews(data.reviews);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (campaignId) {
      fetchReviews();
    }
  }, [campaignId]);

  return { data: reviews, isLoading };
}
