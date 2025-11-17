import type { ReactNode } from 'react';

export interface IToastOptions {
  message: string;
  id?: string;
  icon?: ReactNode;
  autoClose?: number | false;
  fitContent?: boolean;
}

export type TToastInput = string | IToastOptions;

export interface ToastProviderProps {
  children: ReactNode;
}
