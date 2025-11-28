import { useQuery } from '@tanstack/react-query';
import { User } from '../types/user.types';

interface UserResponse {
  data: User;
  success: boolean;
}

/**
 * 유저 기본 정보를 가져오는 React Query 훅
 */
export function useUserInfo() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async (): Promise<User> => {
      const response = await fetch('/api/auth/me', { credentials: 'include' });
      if (!response.ok) {
        throw new Error('유저 정보를 가져올 수 없습니다.');
      }
      const json: UserResponse = await response.json();
      return json.data;
    },
  });
}
