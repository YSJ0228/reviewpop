import Image from 'next/image';
import styles from './ReserveInfo.module.scss';
import { ReservationData } from '@features/reserve/store/reservationStore';

interface ReserveInfoProps {
  reservationData: ReservationData;
}

export function ReserveInfo({ reservationData }: ReserveInfoProps) {
  return (
    <div className={styles.ReserveInfo}>
      <div className={styles.ReserveInfo__Title}>
        <Image src={reservationData.thumbnailUrl} alt="예약한 체험 이미지" width={88} height={88} />
        <div className={styles.ReserveInfo__Title__Text}>
          <h3>{reservationData.brand}</h3>
          <p>{reservationData.providedItem}</p>
        </div>
      </div>
      <div className={`${styles.ReserveInfo__Address} ${styles.BorderBottom}`}>
        <span>주소</span>
        <div className={styles.ReserveInfo__Address__Detail}>
          <p>{reservationData.address}</p>
          <button>
            <Image src="/images/NaverMap.png" alt="네이버 맵" width={20} height={20} />
          </button>
        </div>
      </div>
      <div className={`${styles.ReserveInfo__Date} ${styles.BorderBottom}`}>
        <span>날짜</span>
        <p>{reservationData.visitDate}</p>
        <p>{reservationData.visitTime}</p>
      </div>
      <div className={`${styles.ReserveInfo__Visitor} ${styles.BorderBottom}`}>
        <span>방문 인원</span>
        <p>{reservationData.visitorCounter} 명</p>
      </div>
      <div className={styles.ReserveInfo__Booker}>
        <span>예약자 정보</span>
        <p>{reservationData.bookerName}</p>
        <p>{reservationData.bookerPhone}</p>
      </div>
    </div>
  );
}
