import { useQuery } from '@tanstack/react-query';

import { getReviewModificationRequest } from '../api/reviewApi';

export function useReviewModificationRequest(reviewId: string, enabled = true) {
  return useQuery({
    queryKey: ['review', 'modification', reviewId],
    queryFn: () => getReviewModificationRequest(reviewId),
    enabled: enabled && !!reviewId,
  });
}
