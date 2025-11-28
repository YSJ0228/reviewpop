import type { ReactNode } from 'react';

export interface ToastOptions {
  message: string;
  id?: string;
  icon?: ReactNode;
  autoClose?: number | false;
}

export type ToastInput = string | ToastOptions;
