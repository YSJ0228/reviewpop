import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { User } from '../types/user.types';

interface UpdateUserPayload {
  name?: string;
  phoneNumber?: string;
  blogAddress?: string;
}

interface UpdateUserResponse {
  data: User;
  success: boolean;
}

export async function updateUserInfo(payload: UpdateUserPayload): Promise<User> {
  const response = await fetch('/api/auth/me', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('사용자 정보를 수정할 수 없습니다.');
  }

  const json: UpdateUserResponse = await response.json();
  return json.data;
}

export function useUpdateUserInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserInfo,

    // 성공하면 캐시에 반영
    onSuccess: (updatedUser: User) => {
      queryClient.setQueryData(['user'], updatedUser);
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });
}
