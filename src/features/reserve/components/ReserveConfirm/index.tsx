import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
          <Image
            src={reservationData.thumbnailUrl}
            alt="예약한 체험 이미지"
            width={88}
            height={88}
          />
          <div className={styles.ReserveConfirm__Info__Title__Text}>
            <h3>{reservationData.brand}</h3>
            <p>{reservationData.providedItem}</p>
          </div>
        </div>
        <div className={(styles.ReserveConfirm__Info__Address, styles.BorderBottom)}>
          <span>주소</span>
          <div className={styles.ReserveConfirm__Info__Address__Detail}>
            <p>{reservationData.address}</p>
            <button>
              <Image src="/images/NaverMap.png" alt="네이버 맵" width={20} height={20} />
            </button>
          </div>
        </div>
        <div className={(styles.ReserveConfirm__Info__Date, styles.BorderBottom)}>
          <span>날짜</span>
          <p>{reservationData.visitDate}</p>
          <p>{reservationData.visitTime}</p>
        </div>
        <div className={(styles.ReserveConfirm__Info__Visitor, styles.BorderBottom)}>
          <span>방문 인원</span>
          <p>{reservationData.visitorCounter} 명</p>
        </div>
        <div className={styles.ReserveConfirm__Info__Booker}>
          <span>예약자 정보</span>
          <p>{reservationData.bookerName}</p>
          <p>{reservationData.bookerPhone}</p>
        </div>
      </div>
      <div className={styles.ReserveConfirm__Precautions}>
        <div className={styles.ReserveConfirm__Precautions__Title}>
          <button type="button">
            <Image src="/images/CheckCircle.svg" alt="체크" width={18} height={18} />
          </button>
          <h3>예약 유의 사항</h3>
        </div>
        <div
          className={styles.ReserveConfirm__Precautions__Text}
          dangerouslySetInnerHTML={{ __html: reservationData.precautions || '' }}
        />
      </div>
      <div>
        <button onClick={() => alert('예약 확정 API 호출 예정')}>예약 확정하기</button>
      </div>
    </div>
  );
}
