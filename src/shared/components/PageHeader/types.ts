import { ReactNode } from 'react';

export interface PageHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showXButton?: boolean;
  onBack?: () => void;
  onX?: () => void;
  rightAction?: ReactNode;
}
