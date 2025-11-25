import type { ReactNode } from 'react';

export interface IToastOptions {
  message: string;
  id?: string;
  icon?: ReactNode;
  autoClose?: number | false;
}

export type TToastInput = string | IToastOptions;
