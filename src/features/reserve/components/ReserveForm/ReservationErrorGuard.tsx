import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@shared/components';

interface ReservationErrorGuardProps {
  message: string;
  onReset: () => void; // 스토어 초기화
}

export function ReservationErrorGuard({ message, onReset }: ReservationErrorGuardProps) {
  const router = useRouter();
  const isExecuted = useRef(false);

  useEffect(() => {
    // Strict Mode(Dev)에서 두 번 실행되는 것을 방지
    if (process.env.NODE_ENV === 'development') {
      if (isExecuted.current) return;
      isExecuted.current = true;
    }

    toast.error(message);

    onReset();

    setTimeout(() => {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push('/');
      }
    }, 0);
  }, [message, onReset, router]);

  return null;
}
