'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { IconCheckCircle, IconWarningCircle } from '@pop-ui/foundation';

import type { IToastOptions, TToastInput, ToastProviderProps } from './types';

import styles from './style.module.scss';

type IToast = IToastOptions & { id: string };

interface ToastContextType {
  toasts: IToast[];
  showToast: (toast: IToast) => void;
  updateToast: (id: string, toast: Partial<IToast>) => void;
  hideToast: (id: string) => void;
  cleanToasts: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

let toastContextRef: ToastContextType | null = null;

/**
 * Toast Provider 컴포넌트
 * 앱 전체에서 토스트를 사용할 수 있도록 컨텍스트를 제공합니다.
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<IToast[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const clearTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  const hideToast = useCallback(
    (id: string) => {
      clearTimer(id);
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    },
    [clearTimer],
  );

  const showToast = useCallback((toast: IToast) => {
    setToasts((prev) => {
      const filtered = prev.filter((t) => t.id !== toast.id);
      return [...filtered, toast];
    });
  }, []);

  const updateToast = useCallback((id: string, updates: Partial<IToast>) => {
    setToasts((prev) =>
      prev.map((toast) => {
        if (toast.id === id) {
          return { ...toast, ...updates };
        }
        return toast;
      }),
    );
  }, []);

  const cleanToasts = useCallback(() => {
    clearAllTimers();
    setToasts([]);
  }, [clearAllTimers]);

  const contextValue: ToastContextType = useMemo(
    () => ({
      toasts,
      showToast,
      updateToast,
      hideToast,
      cleanToasts,
    }),
    [toasts, showToast, updateToast, hideToast, cleanToasts],
  );

  useEffect(() => {
    toastContextRef = contextValue;
    return () => {
      toastContextRef = null;
    };
  }, [contextValue]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

/**
 * Toast Container 컴포넌트
 * 실제 토스트들을 렌더링하는 컨테이너입니다.
 */
function ToastContainer() {
  const context = useContext(ToastContext);
  if (!context) {
    console.warn('ToastContainer: context가 없습니다');
    return null;
  }

  const { toasts } = context;

  if (toasts.length === 0) return null;

  return (
    <div className={styles.ToastContainer}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

/**
 * 개별 Toast 아이템 컴포넌트
 */
function ToastItem({ toast }: { toast: IToast }) {
  const context = useContext(ToastContext);
  const [isExiting, setIsExiting] = useState(false);

  const handleRemove = useCallback(() => {
    if (!context) return;
    setIsExiting(true);
    setTimeout(() => {
      context.hideToast(toast.id);
    }, 300);
  }, [context, toast.id]);

  useEffect(() => {
    if (!context) return;
    // autoClose가 명시적으로 false가 아니면 기본 4초
    if (toast.autoClose !== false) {
      const autoCloseTime = toast.autoClose || 4000;
      const timer = setTimeout(() => {
        handleRemove();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.autoClose, handleRemove, context]);

  if (!context) return null;

  return (
    <div
      className={`${styles.Toast} ${isExiting ? styles['Toast--Exiting'] : ''} ${
        toast.fitContent ? styles['Toast--FitContent'] : ''
      }`}
    >
      {toast.icon && <div className={styles.Toast__Icon}>{toast.icon}</div>}
      <div className={styles.Toast__Message}>{toast.message}</div>
    </div>
  );
}

/**
 * 전역 toast 함수
 */
export const toast = ((input: TToastInput): void => {
  if (!toastContextRef) {
    console.warn(
      'ToastProvider가 설정되지 않았습니다. toast 함수를 사용하려면 ToastProvider로 앱을 감싸주세요.',
    );
    return;
  }

  const options: IToastOptions = typeof input === 'string' ? { message: input } : input;
  const { message, id, icon, autoClose, fitContent } = options;

  const toastId = id || `toast-${Date.now()}-${Math.random()}`;

  const finalAutoClose = autoClose !== undefined ? autoClose : 4000;

  // id가 명시된 경우 fitContent를 기본적으로 true로 설정
  const finalFitContent =
    fitContent !== undefined ? fitContent : id !== undefined ? true : undefined;

  toastContextRef.showToast({
    id: toastId,
    message,
    icon,
    autoClose: finalAutoClose,
    fitContent: finalFitContent,
  });
}) as {
  (input: TToastInput): void;
  success: (message: string, options?: Omit<IToastOptions, 'message' | 'icon'>) => void;
  error: (message: string, options?: Omit<IToastOptions, 'message' | 'icon'>) => void;
  update: (id: string, input: TToastInput) => void;
  hide: (id: string) => void;
  clean: () => void;
};

toast.update = (id: string, input: TToastInput): void => {
  if (!toastContextRef) {
    console.warn('ToastProvider가 설정되지 않았습니다.');
    return;
  }

  const options: IToastOptions = typeof input === 'string' ? { message: input } : input;
  const { message, icon, autoClose, fitContent } = options;

  const finalAutoClose = autoClose !== undefined ? autoClose : 4000;

  // icon이 명시되지 않았을 때 자동으로 IconCheckCircle 추가
  const finalIcon = icon !== undefined ? icon : <IconCheckCircle size={24} color="#0FD3D8" />;

  toastContextRef.updateToast(id, {
    message,
    icon: finalIcon,
    autoClose: finalAutoClose,
    fitContent: fitContent !== undefined ? fitContent : true,
  });
};

toast.success = (message: string, options?: Omit<IToastOptions, 'message' | 'icon'>): void => {
  if (!toastContextRef) {
    console.warn('ToastProvider가 설정되지 않았습니다.');
    return;
  }

  const toastId = options?.id || `toast-${Date.now()}-${Math.random()}`;
  const finalAutoClose = options?.autoClose !== undefined ? options.autoClose : 4000;

  toastContextRef.showToast({
    id: toastId,
    message,
    icon: <IconCheckCircle size={24} color="#0FD3D8" />,
    autoClose: finalAutoClose,
  });
};

toast.error = (message: string, options?: Omit<IToastOptions, 'message' | 'icon'>): void => {
  if (!toastContextRef) {
    console.warn('ToastProvider가 설정되지 않았습니다.');
    return;
  }

  const toastId = options?.id || `toast-${Date.now()}-${Math.random()}`;
  const finalAutoClose = options?.autoClose !== undefined ? options.autoClose : 4000;

  toastContextRef.showToast({
    id: toastId,
    message,
    icon: <IconWarningCircle size={24} color="#FF922B" />,
    autoClose: finalAutoClose,
  });
};

toast.hide = (id: string): void => {
  if (!toastContextRef) {
    console.warn('ToastProvider가 설정되지 않았습니다.');
    return;
  }
  toastContextRef.hideToast(id);
};

toast.clean = (): void => {
  if (!toastContextRef) {
    console.warn('ToastProvider가 설정되지 않았습니다.');
    return;
  }
  toastContextRef.cleanToasts();
};

/**
 * useToast Hook
 * 컴포넌트 내에서 toast 함수를 사용할 때 사용합니다.
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return toast;
}

export default toast;
