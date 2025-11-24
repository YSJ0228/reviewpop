import { ReactNode } from 'react';

export interface BottomSheetProps {
  onClose: () => void;
  opened: boolean;
  title?: string;
  children?: ReactNode;
  titleSize?: number;
  height?: number;
  withCloseButton?: boolean;
}
