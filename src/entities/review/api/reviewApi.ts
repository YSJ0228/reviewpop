import { apiClient } from '@shared/api/client';

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
