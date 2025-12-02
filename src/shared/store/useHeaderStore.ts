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
  ownerId: string | null;
}

interface HeaderActions {
  setHeader: (config: Partial<HeaderState>, ownerId?: string) => void;
  resetHeader: (ownerId?: string) => void;
  hideHeader: () => void;
}

const initialState: HeaderState = {
  title: '',
  showBackButton: true,
  showXButton: false,
  isVisible: false,
  showBottomNavigation: true,
  rightAction: null,
  onBack: null,
  onX: null,
  ownerId: null,
};

export const useHeaderStore = create<HeaderState & HeaderActions>((set) => ({
  ...initialState,

  setHeader: (config, ownerId) =>
    set((state) => ({
      ...state,
      ...config,
      isVisible: true,
      ownerId: ownerId ?? null,
    })),

  resetHeader: (ownerId) =>
    set((state) => {
      if (ownerId && state.ownerId !== ownerId) {
        return state;
      }
      return initialState;
    }),

  hideHeader: () => set({ isVisible: false }),
}));
