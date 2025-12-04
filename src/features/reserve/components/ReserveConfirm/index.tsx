import { LoadingSpinner, CampaignInfoList } from '@shared/components';
import { formatDate } from '@shared/lib/date';
import { useReserve } from '@entities/reservation';
import { useReservationStore } from '@features/reserve/store/reservationStore';
import { mockReservationData } from '@features/reserve/store/mockReservationData';
import { useCampaignDetails } from '@entities/campaign/hooks/useCampaignDetails';
import { useApplicationDetails } from '@entities/application/hooks/useApplicationDetails';
import { useUserInfo } from '@entities/user/hooks/useUserInfo';

import { ReservePrecautions } from './ReservePrecautions';
import { ReserveAgreement } from './ReserveAgreement';

import styles from './style.module.scss';

export function ReserveConfirm({ campaignId }: { campaignId: string }) {
  const reservationData = useReservationStore(
    (state) => state.reservationData ?? mockReservationData,
  );
  const { mutate: createReservation } = useReserve(campaignId);
  const { data: campaign, isLoading: isCampaignLoading } = useCampaignDetails(campaignId);
  const { data: user, isLoading: isUserLoading } = useUserInfo();
  const { data: application, isLoading: isApplicationLoading } = useApplicationDetails(
    campaignId,
    user?.id ?? '',
    {
      enabled: !!user?.id,
    },
  );

  if (isCampaignLoading || isUserLoading || isApplicationLoading) {
    return <LoadingSpinner />;
  }

  if (!reservationData || !campaign || !application)
    return <div>필요한 정보를 불러올 수 없습니다.</div>;

  const handleConfirm = () => {
    createReservation({
      campaignId: reservationData.campaignId,
      applicationId: reservationData.applicationId,
      personCount: reservationData.personCount,
      date: reservationData.date,
    });
  };

  return (
    <div className={styles.ReserveConfirm}>
      <div className={styles.ReserveConfirm__Content}>
        <CampaignInfoList.Main>
          <CampaignInfoList.Header
            thumbnail={campaign.thumbnail}
            brand={campaign.brand}
            title={campaign.providedItem}
          />
          <CampaignInfoList.AddressItem address={campaign.address} />
          <CampaignInfoList.Item label="날짜">
            <p>{formatDate(reservationData.date, 'SHORT')}</p>
            <p>{formatDate(reservationData.date, 'TIME')}</p>
          </CampaignInfoList.Item>
          <CampaignInfoList.Item label="방문 인원">
            <p>{reservationData.personCount} 명</p>
          </CampaignInfoList.Item>
          <CampaignInfoList.Item label="예약자 정보" isLast>
            <p>{application.name}</p>
            <p>{application.phoneNumber}</p>
          </CampaignInfoList.Item>
        </CampaignInfoList.Main>
        <ReservePrecautions precautions={campaign.reservationPrecaution} />
      </div>
      <ReserveAgreement onConfirm={handleConfirm} />
    </div>
  );
}
