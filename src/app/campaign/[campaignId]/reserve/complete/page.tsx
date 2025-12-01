'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';

import { Button } from '@shared/components';
import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { LoadingSpinner } from '@shared/components';
import { useReservationStore } from '@features/reserve/store/reservationStore';
import { mockReservationData } from '@features/reserve/store/mockReservationData';
import { useCampaignDetails } from '@entities/campaign/hooks/useCampaignDetails';
import { useApplicationDetails } from '@entities/application/hooks/useApplicationDetails';
import { useUserInfo } from '@entities/user/hooks/useUserInfo';
import { ReserveComplete } from '@features/reserve/components/ReserveComplete';
import { usePageHeader } from '@shared/hooks/usePageHeader';

import styles from './page.module.scss';

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

  const handleXButton = () => {
    router.push('/my?tab=selected');
  };

  usePageHeader({
    showBackButton: false,
    showXButton: true,
    onX: handleXButton,
  });

  if (isCampaignLoading || isUserLoading || isApplicationLoading) {
    return <LoadingSpinner />;
  }

  if (!reservationData || !campaign || !application) {
    return (
      <div className={styles.ReserveCompletePage__Error}>
        <p>예약 정보를 불러올 수 없습니다.</p>
        <p>페이지를 새로고침하거나 다시 시도해 주세요.</p>
        <Button onClick={() => router.push('/my?tab=selected')}>내 예약 목록으로 이동</Button>
      </div>
    );
  }

  return (
    <main className={styles.ReserveCompletePage}>
      <ErrorBoundary>
        <ReserveComplete
          campaign={campaign}
          application={application}
          reservation={reservationData}
        />
      </ErrorBoundary>
    </main>
  );
}
