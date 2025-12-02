import { mockCampaigns } from '@entities/campaign/lib';
import { UserCampaigns } from '@entities/user/types/user.types';

export const mockUserCampaigns: UserCampaigns = {
  name: '박민수',
  participatedCampaigns: 10,
  enrolledReviews: 10,
  campaigns: [
    { campaign: mockCampaigns[0], status: 'plan', date: '2025-12-05T14:00:00' },
    { campaign: mockCampaigns[1], status: 'reservation' },
    { campaign: mockCampaigns[2], status: 'review' },
  ],
};
