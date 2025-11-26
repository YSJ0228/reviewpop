import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useReservationStore } from '@features/reserve/store/reservationStore';
import { mockReservationData } from '@features/reserve/store/mockReservationData';

import { ReserveInfo } from './ReserveInfo';
import { ReservePrecautions } from './ReservePrecautions';
import { ReserveAgreement } from './ReserveAgreement';

import styles from './style.module.scss';

export function ReserveConfirm({ campaignId }: { campaignId: string }) {
  const router = useRouter();
  const setReservationData = useReservationStore((state) => state.setReservationData);
  const reservationData = useReservationStore((state) => state.reservationData);

  useEffect(() => {
    setReservationData(mockReservationData);
  }, [reservationData, campaignId, router, setReservationData]);

  if (!reservationData) return null;

  return (
    <div className={styles.ReserveConfirm}>
      <ReserveInfo reservationData={reservationData} />
      <ReservePrecautions precautions={reservationData.precautions} />
      <ReserveAgreement onConfirm={() => alert('예약 확정 API 호출 예정')} />
    </div>
  );
}
