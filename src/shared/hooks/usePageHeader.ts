import { useEffect } from 'react';
import { useHeaderStore } from '@shared/store/useHeaderStore';
import { ReactNode } from 'react';

interface PageHeaderConfig {
  title?: string;
  showBackButton?: boolean;
  showXButton?: boolean;
  rightAction?: ReactNode;
  onBack?: () => void;
  onX?: () => void;
  isVisible?: boolean;
}

export function usePageHeader(config: PageHeaderConfig = {}) {
  const setHeader = useHeaderStore((state) => state.setHeader);
  const resetHeader = useHeaderStore((state) => state.resetHeader);

  useEffect(() => {
    setHeader(config);

    return () => {
      resetHeader();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.title, config.showBackButton, config.showXButton, config.isVisible]);
}
