import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useReservationStore } from '@features/reserve/store/reservationStore';
import { mockReservationData } from '@features/reserve/store/mockReservationData';
import styles from './style.module.scss';

export function ReserveConfirm({ campaignId }: { campaignId: string }) {
  const router = useRouter();
  const setReservationData = useReservationStore((state) => state.setReservationData);
  const reservationData = useReservationStore((state) => state.reservationData);

  useEffect(() => {
    setReservationData(mockReservationData);
  }, [reservationData, campaignId, router]);

  if (!reservationData) return null;

  return (
    <div className={styles.ReserveConfirm}>
      <div className={styles.ReserveConfirm__Info}>
        <h3>배송지 정보</h3>
        <p>
          <strong>받는 분:</strong> {reservationData.bookerName}
        </p>
        <p>
          <strong>연락처:</strong> {reservationData.bookerPhone}
        </p>
        <p>
          <strong>주소:</strong> {reservationData.address}
        </p>
        <p>
          <strong>방문 인원:</strong> {reservationData.visitorCounter}
        </p>
        <p>
          <strong>방문 날짜:</strong> {reservationData.visitDate}
        </p>
        <p>
          <strong>방문 시간:</strong> {reservationData.visitTime}
        </p>
      </div>
      <div>
        <h3>예약 유의 사항</h3>
        {reservationData.precautions.map((precaution, index) => (
          <p key={index}>{precaution}</p>
        ))}
      </div>
      <div>
        <button onClick={() => alert('예약 확정 API 호출 예정')}>예약 확정하기</button>
      </div>
    </div>
  );
}
