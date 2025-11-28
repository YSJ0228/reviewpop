import { useReserve } from '@features/reserve/hooks/useReserve';
import { useReservationStore } from '@features/reserve/store/reservationStore';
import { mockReservationData } from '@features/reserve/store/mockReservationData';
import { useCampaignDetails } from '@entities/campaign/hooks/useCampaignDetails';
import { useApplicationDetails } from '@entities/application/hooks/useApplicationDetails';
import { useUserInfo } from '@entities/user/hooks/useUserInfo';
import { LoadingSpinner } from '@shared/components';

import { ReserveInfo } from './ReserveInfo';
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
        <ReserveInfo campaign={campaign} application={application} reservation={reservationData} />
        <ReservePrecautions precautions={campaign.reservationPrecaution} />
      </div>
      <ReserveAgreement onConfirm={handleConfirm} />
    </div>
  );
}
