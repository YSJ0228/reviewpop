import { useQuery } from '@tanstack/react-query';
import { getApplicationById } from '../api/applicationApi';

export function useApplicationById(applicationId: string | null) {
  return useQuery({
    queryKey: ['application', applicationId],
    queryFn: () => getApplicationById(applicationId!),
    enabled: !!applicationId,
  });
}
