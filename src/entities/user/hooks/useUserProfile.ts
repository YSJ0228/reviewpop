import { useQuery } from '@tanstack/react-query';
import { UserCampaigns } from '../types/user.types';

interface UserCampaignResponse {
  data: UserCampaigns;
  success: boolean;
}

/**
 * 유저 프로필 정보를 가져오는 React Query 훅
 */
export function useUserProfile() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<UserCampaigns> => {
      const response = await fetch('/api/auth/profile', { credentials: 'include' });
      if (!response.ok) {
        throw new Error('유저 프로필 정보를 가져올 수 없습니다.');
      }
      const json: UserCampaignResponse = await response.json();
      return json.data;
    },
  });
}
