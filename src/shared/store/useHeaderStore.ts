import { create } from 'zustand';
import { ReactNode } from 'react';

interface HeaderState {
  title: string;
  showBackButton: boolean;
  showXButton: boolean;
  isVisible: boolean;
  showBottomNavigation: boolean;
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
  isVisible: false,
  showBottomNavigation: true, // 기본적으로 GNB 표시
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
      isVisible: true,
    })),

  resetHeader: () => set(initialState),

  hideHeader: () => set({ isVisible: false }),
}));
