import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useReservationStore } from '@features/reserve/store/reservationStore';
import { mockReservationData } from '@features/reserve/store/mockReservationData';
import { useReserve } from '@features/reserve/hooks/useReserve';
import { useCampaignDetails } from '@entities/campaign/hooks/useCampaignDetails';
import { useApplicationDetails } from '@entities/application/hooks/useApplicationDetails';
import { useUserInfo } from '@entities/user/hooks/useUserInfo';

import { ReserveInfo } from './ReserveInfo';
import { ReservePrecautions } from './ReservePrecautions';
import { ReserveAgreement } from './ReserveAgreement';

import styles from './style.module.scss';

export function ReserveConfirm({ campaignId }: { campaignId: string }) {
  const router = useRouter();
  const setReservationData = useReservationStore((state) => state.setReservationData);
  const reservationData = useReservationStore((state) => state.reservationData);

  const { mutate: createReservation } = useReserve();
  const { data: campaign } = useCampaignDetails(campaignId);
  const { data: user } = useUserInfo();
  const { data: application } = useApplicationDetails(campaignId, user?.id ?? '');

  useEffect(() => {
    setReservationData(mockReservationData);
  }, [reservationData, campaignId, router, setReservationData]);

  if (!reservationData || !campaign || !application) return null;

  const handleConfirm = () => {
    createReservation({
      campaignId: reservationData.campaignId,
      applicationId: reservationData.applicationId,
      personCount: reservationData.personCounter,
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
