import { ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  /** 에러 발생 시 표시할 폴백 UI (선택사항) */
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
