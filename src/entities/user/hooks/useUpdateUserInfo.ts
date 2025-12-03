import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { User } from '../types/user.types';
import { updateUserInfo } from '../api/userApi';

export function useUpdateUserInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserInfo,
    onSuccess: (updatedUser: User) => {
      queryClient.setQueryData(['user'], updatedUser);
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });
}
