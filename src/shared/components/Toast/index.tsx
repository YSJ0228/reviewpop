'use client';

import { toast as popUiToast } from '@pop-ui/core';
import {
  ColorAqua500,
  ColorOrange500,
  IconCheckCircle,
  IconWarningCircle,
} from '@pop-ui/foundation';

import type { IToastOptions } from './types';

const ICON_SIZE = 24 as const;

/**
 * Toast 함수
 * pop-ui/core의 toast를 확장하여 success와 error 메서드를 추가합니다.
 */
const toast = popUiToast as typeof popUiToast & {
  success: (message: string, options?: Omit<IToastOptions, 'message' | 'icon'>) => void;
  error: (message: string, options?: Omit<IToastOptions, 'message' | 'icon'>) => void;
};

/**
 * 성공 토스트를 표시합니다
 * @param message - 표시할 메시지
 * @param options - 추가 옵션 (id, autoClose 등)
 */
toast.success = (message: string, options?: Omit<IToastOptions, 'message' | 'icon'>): void => {
  popUiToast({
    message,
    icon: <IconCheckCircle size={ICON_SIZE} color={ColorAqua500} />,
    ...options,
  });
};

/**
 * 에러 토스트를 표시합니다
 * @param message - 표시할 메시지
 * @param options - 추가 옵션 (id, autoClose 등)
 */
toast.error = (message: string, options?: Omit<IToastOptions, 'message' | 'icon'>): void => {
  popUiToast({
    message,
    icon: <IconWarningCircle size={ICON_SIZE} color={ColorOrange500} />,
    ...options,
  });
};

export { toast };
