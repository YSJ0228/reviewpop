import Image from 'next/image';

import { ReservationData } from '@features/reserve/store/reservationStore';
import { CampaignDetail } from '@entities/campaign/types/campaign.types';
import { Application } from '@entities/application/types/application.types';
import { handleNaverMapClick } from '@shared/lib/naverMap';
import { formatDate } from '@shared/lib/date';

import styles from './ReserveInfo.module.scss';

interface ReserveInfoProps {
  campaign: CampaignDetail;
  application: Application;
  reservation: ReservationData;
}

export function ReserveInfo({ campaign, application, reservation }: ReserveInfoProps) {
  return (
    <div className={styles.ReserveInfo}>
      <div className={styles.ReserveInfo__Title}>
        <Image src={campaign.thumbnail} alt="예약한 체험 이미지" width={88} height={88} priority />
        <div className={styles.ReserveInfo__Title__Text}>
          <h3>{campaign.brand}</h3>
          <p>{campaign.providedItem}</p>
        </div>
      </div>
      <div className={`${styles.ReserveInfo__Address} ${styles.BorderBottom}`}>
        <span>주소</span>
        <div className={styles.ReserveInfo__Address__Detail}>
          <p>{campaign.address}</p>
          <button
            type="button"
            onClick={() => handleNaverMapClick(campaign.address)}
            aria-label="네이버 지도에서 위치 보기"
          >
            <Image src="/images/NaverMap.png" alt="네이버 맵" width={20} height={20} />
          </button>
        </div>
      </div>
      <div className={`${styles.ReserveInfo__Content} ${styles.BorderBottom}`}>
        <span>날짜</span>
        <p>{formatDate(reservation.date, 'SHORT')}</p>
        <p>{formatDate(reservation.date, 'TIME')}</p>
      </div>
      <div className={`${styles.ReserveInfo__Content} ${styles.BorderBottom}`}>
        <span>방문 인원</span>
        <p>{reservation.personCount} 명</p>
      </div>
      <div className={styles.ReserveInfo__Content}>
        <span>예약자 정보</span>
        <p>{application.name}</p>
        <p>{application.phoneNumber}</p>
      </div>
    </div>
  );
}
