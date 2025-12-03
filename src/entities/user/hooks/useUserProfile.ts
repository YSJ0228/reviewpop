import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../api/userApi';

/**
 * 유저 프로필 정보를 가져오는 React Query 훅
 */
export function useUserProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: getUserProfile,
  });
}
