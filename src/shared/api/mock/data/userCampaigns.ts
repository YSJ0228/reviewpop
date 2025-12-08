import { mockCampaigns } from '@entities/campaign/lib';
import { UserCampaigns } from '@entities/user/types/user.types';

export const mockUserCampaigns: UserCampaigns = {
  name: '박민수',
  participatedCampaigns: 10,
  enrolledReviews: 10,
  campaigns: [
    {
      applicationId: 'app-1',
      campaign: mockCampaigns[0],
      status: 'plan',
      date: '2025-12-05T14:00:00',
    },
    { applicationId: 'app-2', campaign: mockCampaigns[1], status: 'reservation' },
    { applicationId: 'app-3', campaign: mockCampaigns[2], status: 'review' },
  ],
};
