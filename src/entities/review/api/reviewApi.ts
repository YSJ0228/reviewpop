import { apiClient } from '@shared/api/client';
import { BlogReviews } from '../types/review.types';
import { ReviewRequest } from '../types/review.types';

interface ReviewModificationRequestResponse {
  data: ReviewRequest;
  success: boolean;
}

export async function getReviewModificationRequest(reviewId: string) {
  const response = await apiClient.get<ReviewModificationRequestResponse>(
    `/reviews/${reviewId}/modification-request`,
    {
      withCredentials: true,
    },
  );
  return response.data.data;
}

export const reviewApi = {
  getReviews: async (params: { campaignId?: string; page?: number; size?: number }) => {
    const response = await apiClient.get<BlogReviews>('/reviews', { params });
    return response.data;
  },
};
