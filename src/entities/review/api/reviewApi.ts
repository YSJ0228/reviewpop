import { apiClient } from '@shared/api/client';
import { ReviewRequest } from '../types/review.types';

interface ReviewModificationRequestResponse {
  data: ReviewRequest;
  success: boolean;
}

export async function getReviewModificationRequest() {
  const response = await apiClient.get<ReviewModificationRequestResponse>(
    '/review/:id/modification-request',
    {
      withCredentials: true,
    },
  );
  return response.data.data;
}
