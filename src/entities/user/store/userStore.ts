/**
 * User Store (Zustand)
 *
 * 사용자 정보와 인증 상태를 관리하는 전역 store입니다.
 *
 * @example
 * ```tsx
 * import { useUserStore } from '@entities/user/store/userStore';
 *
 * function MyComponent() {
 *   const user = useUserStore((state) => state.user);
 *   const setUser = useUserStore((state) => state.setUser);
 *
 *   return <div>{user?.name}</div>;
 * }
 * ```
 */

import { create } from 'zustand';
import { User } from '../types/user.types';
import { storage } from '@shared/lib/storage';
import { CONSTANTS } from '@shared/config/constants';

interface UserState {
  /** 현재 로그인한 사용자 정보 */
  user: User | null;
  /** 로딩 상태 */
  isLoading: boolean;
}

interface UserActions {
  /** 사용자 정보 설정 */
  setUser: (user: User | null) => void;
  /** 로그인 */
  login: (user: User, token: string) => void;
  /** 로그아웃 */
  logout: () => void;
  /** 로컬 스토리지에서 사용자 정보 복원 */
  restoreUser: () => void;
}

type UserStore = UserState & UserActions;

/**
 * User Store
 */
export const useUserStore = create<UserStore>((set) => ({
  // 초기 상태
  user: null,
  isLoading: true,

  // Actions
  setUser: (user) => set({ user }),

  login: (user, token) => {
    // 상태 업데이트
    set({ user });

    // localStorage에 저장
    storage.set(CONSTANTS.STORAGE_KEYS.USER, user);
    storage.set(CONSTANTS.STORAGE_KEYS.AUTH_TOKEN, token);
  },

  logout: () => {
    // 상태 초기화
    set({ user: null });

    // localStorage 정리
    storage.remove(CONSTANTS.STORAGE_KEYS.USER);
    storage.remove(CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
  },

  restoreUser: () => {
    // localStorage에서 사용자 정보 복원
    const user = storage.get<User>(CONSTANTS.STORAGE_KEYS.USER);
    set({ user, isLoading: false });
  },
}));
