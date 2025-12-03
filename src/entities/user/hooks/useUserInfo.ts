import { useSuspenseQuery } from '@tanstack/react-query';

import { getUserInfo } from '../api/userApi';

/**
 * 유저 기본 정보를 가져오는 React Query 훅
 */
export function useUserInfo() {
  return useSuspenseQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });
}
