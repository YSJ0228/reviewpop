import { apiClient } from '@shared/api/client';

import { ReviewRequest } from '../types/review.types';
import { ApiResponse, unwrapApiResponse } from '@shared/api/types/common.types';

export async function getReviewModificationRequest(reviewId: string) {
  const response = await apiClient.get<ApiResponse<ReviewRequest>>(
    `/reviews/${reviewId}/edit-request`,
    {
      withCredentials: true,
    },
  );
  return unwrapApiResponse(response.data);
}
