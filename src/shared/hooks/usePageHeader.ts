import { useEffect, useId, ReactNode } from 'react';

import { useHeaderStore } from '@shared/store/useHeaderStore';

export interface PageHeaderConfig {
  title?: string;
  showBackButton?: boolean;
  showXButton?: boolean;
  rightAction?: ReactNode;
  onBack?: () => void;
  onX?: () => void;
  isVisible?: boolean;
  showBottomNavigation?: boolean;
}

export function usePageHeader(config: PageHeaderConfig = {}) {
  const setHeader = useHeaderStore((state) => state.setHeader);
  const resetHeader = useHeaderStore((state) => state.resetHeader);
  const ownerId = useId();

  useEffect(() => {
    setHeader(config, ownerId);

    return () => {
      resetHeader(ownerId);
    };
  }, [config, setHeader, resetHeader, ownerId]);
}
