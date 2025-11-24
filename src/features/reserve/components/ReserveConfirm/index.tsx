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
  }, [reservationData, campaignId, router, setReservationData]);

  if (!reservationData) return null;

  return (
    <div className={styles.ReserveConfirm}>
      <div className={styles.ReserveConfirm__Info}>
        <div className={styles.ReserveConfirm__Info__Title}>
          <img
            src={reservationData.thumbnailUrl}
            alt="예약한 체험 이미지"
            width={150}
            height={150}
          />
          <div className={styles.ReserveConfirm__Info__Title__Text}>
            <h3>{reservationData.brand}</h3>
            <p>{reservationData.providedItem}</p>
          </div>
        </div>
        <div className={styles.ReserveConfirm__Info__Address}>
          <span>주소</span>
          <p>{reservationData.address}</p>
          <p>{reservationData.bookerPhone}</p>
          <button>네이버 블로그</button>
        </div>
        <div className={styles.ReserveConfirm__Info__Booker}>
          <span>예약자 정보</span>
          <p>{reservationData.bookerName}</p>
        </div>
        <div className={styles.ReserveConfirm__Info__Visitor}>
          <span>방문 인원</span>
          <p>{reservationData.visitorCounter}</p>
        </div>
        <div className={styles.ReserveConfirm__Info__Date}>
          <span>날짜</span>
          <p>{reservationData.visitDate}</p>
          <p>{reservationData.visitTime}</p>
        </div>
      </div>
      <div className={styles.ReserveConfirm__Precautions}>
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
