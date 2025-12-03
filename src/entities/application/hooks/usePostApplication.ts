import { useMutation } from '@tanstack/react-query';

import { applyCampaign } from '../api/applicationApi';

export function usePostApplication() {
  return useMutation({ mutationFn: applyCampaign });
}
