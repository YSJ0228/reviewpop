import { useQuery } from '@tanstack/react-query';

import { Application } from '../types/application.types';
import { findApplicationByUserAndCampaign } from '@shared/api/mock/data/applications';

export function useApplicationDetails(campaignId: string, userId: string) {
  return useQuery({
    queryKey: ['applications', campaignId, userId],
    queryFn: async (): Promise<Application> => {
      // Mock data simulation
      const application = findApplicationByUserAndCampaign(userId, campaignId);
      if (!application) {
        throw new Error('Application not found');
      }
      return application;
    },
    enabled: !!campaignId && !!userId,
  });
}
