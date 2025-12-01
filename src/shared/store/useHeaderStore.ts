import { create } from 'zustand';
import { ReactNode } from 'react';

interface HeaderState {
  title: string;
  showBackButton: boolean;
  showXButton: boolean;
  isVisible: boolean;
  rightAction: ReactNode | null;
  onBack: (() => void) | null;
  onX: (() => void) | null;
}

interface HeaderActions {
  setHeader: (config: Partial<HeaderState>) => void;
  resetHeader: () => void;
  hideHeader: () => void;
}

const initialState: HeaderState = {
  title: '',
  showBackButton: true,
  showXButton: false,
  isVisible: false, // 기본적으로 숨김 (Main 페이지 등에서 안 보이게)
  rightAction: null,
  onBack: null,
  onX: null,
};

export const useHeaderStore = create<HeaderState & HeaderActions>((set) => ({
  ...initialState,

  setHeader: (config) =>
    set((state) => ({
      ...state,
      ...config,
      isVisible: true, // 설정하면 자동으로 보임
    })),

  resetHeader: () => set(initialState),

  hideHeader: () => set({ isVisible: false }),
}));
