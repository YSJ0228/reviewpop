import { CampaignInfoList } from '@shared/components';
import { CampaignDetail } from '@entities/campaign/types/campaign.types';
import { Application } from '@entities/application/types/application.types';
import { ReservationData } from '@features/reserve/store/reservationStore';

import { ReserveCompleteText } from './ReserveCompleteText';
import { ReserveCompleteAction } from './ReserveCompleteAction';

import styles from './style.module.scss';

interface IReserveCompleteProps {
  campaign: CampaignDetail;
  application: Application;
  reservation: ReservationData;
}

export function ReserveComplete({ campaign, application, reservation }: IReserveCompleteProps) {
  return (
    <div className={styles.ReserveComplete}>
      <ReserveCompleteText date={reservation.date} />
      <CampaignInfoList.Main>
        <CampaignInfoList.Header
          thumbnail={campaign.thumbnail}
          brand={campaign.brand}
          title={campaign.providedItem}
        />
        <CampaignInfoList.AddressItem address={campaign.address} />
        <CampaignInfoList.Item label="방문 인원">
          <p>{reservation.personCount} 명</p>
        </CampaignInfoList.Item>
        <CampaignInfoList.Item label="예약자 정보" isLast>
          <p>{application.name}</p>
          <p>{application.phoneNumber}</p>
        </CampaignInfoList.Item>
      </CampaignInfoList.Main>

      <ReserveCompleteAction campaignId={campaign.id} />
    </div>
  );
}
