import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useReservationStore } from '@features/reserve/store/reservationStore';
import { mockReservationData } from '@features/reserve/store/mockReservationData';
import { useReserve } from '@features/reserve/hooks/useReserve';

import { ReserveInfo } from './ReserveInfo';
import { ReservePrecautions } from './ReservePrecautions';
import { ReserveAgreement } from './ReserveAgreement';

import styles from './style.module.scss';

export function ReserveConfirm({ campaignId }: { campaignId: string }) {
  const router = useRouter();
  const setReservationData = useReservationStore((state) => state.setReservationData);
  const reservationData = useReservationStore((state) => state.reservationData);

  const { mutate: createReservation } = useReserve();

  useEffect(() => {
    setReservationData(mockReservationData);
  }, [reservationData, campaignId, router, setReservationData]);

  if (!reservationData) return null;

  const handleConfirm = () => {
    createReservation({
      campaignId: reservationData.campaignId,
      userId: reservationData.userId,
      visitors: reservationData.visitorCounter,
      booker: reservationData.bookerName,
      phoneNumber: reservationData.bookerPhone,
      reservedAt: {
        date: reservationData.visitDate,
        hour: reservationData.visitTime,
      },
      precautions: reservationData.precautions,
    });
  };

  if (!reservationData) return null;

  return (
    <div className={styles.ReserveConfirm}>
      <div className={styles.ReserveConfirm__Content}>
        <ReserveInfo reservationData={reservationData} />
        <ReservePrecautions precautions={reservationData.precautions} />
      </div>
      <ReserveAgreement onConfirm={handleConfirm} />
    </div>
  );
}
