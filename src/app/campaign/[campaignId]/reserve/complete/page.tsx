'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { LoadingSpinner, PageHeader } from '@shared/components';
import { useReservationStore } from '@features/reserve/store/reservationStore';
import { mockReservationData } from '@features/reserve/store/mockReservationData';
import { useCampaignDetails } from '@entities/campaign/hooks/useCampaignDetails';
import { useApplicationDetails } from '@entities/application/hooks/useApplicationDetails';
import { useUserInfo } from '@entities/user/hooks/useUserInfo';
import { ReserveComplete } from '@features/reserve/components/ReserveComplete';

import styles from './page.module.scss';

/**
 * 예약 완료 페이지
 * - 하단 탭: X
 * - 예약 완료 메시지 및 예약 정보 확인
 */

interface ReserveCompletePageProps {
  params: Promise<{ campaignId: string }>;
}

export default function ReserveCompletePage({ params }: ReserveCompletePageProps) {
  const router = useRouter();
  const { campaignId } = use(params);
  const reservationData = useReservationStore(
    (state) =>
      state.reservationData ??
      (process.env.NODE_ENV === 'development' ? mockReservationData : null),
  );
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

  if (!reservationData || !campaign || !application) {
    return (
      <div className={styles.ReserveCompletePage__Error}>
        <p>예약 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const handleXButton = () => {
    router.push('/my?tab=selected');
  };

  return (
    <main className={styles.ReserveCompletePage}>
      <ErrorBoundary>
        <PageHeader showBackButton={false} showXButton handleXButton={handleXButton} />
        <ReserveComplete
          campaign={campaign}
          application={application}
          reservation={reservationData}
        />
      </ErrorBoundary>
    </main>
  );
}
