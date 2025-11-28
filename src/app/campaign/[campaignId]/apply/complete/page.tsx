'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { ConfirmationCard } from '@shared/components/ConfirmationCard';
import { CampaignApplyCard } from '@features/campaign/components/CampaignApplyCard';
import { useCampaignDetails } from '@features/campaign';
import { ButtonBar } from '@features/campaign/components/ButtonBar';

import styles from './page.module.scss';

/**
 * 체험 신청 완료 페이지
 * - 하단 탭: X
 * - 신청 완료 메시지 및 안내
 *
 * TODO:
 * 1. [ ] ApplyComplete 컴포넌트 구현 (@features/campaign/components/ApplyComplete)
 * 2. [ ] 신청 정보 요약 표시
 * 3. [ ] "나의 체험으로 이동" 버튼 추가
 * 4. [ ] "홈으로 이동" 버튼 추가
 */
interface CampaignApplyCompletePageProps {
  params: Promise<{
    campaignId: string;
  }>;
}

export default function CampaignApplyCompletePage({ params }: CampaignApplyCompletePageProps) {
  const { campaignId } = use(params);
  const { data: campaign } = useCampaignDetails(campaignId);

  const router = useRouter();
  const today = '2000-01-01';

  return (
    <main className={styles.CampaignApplyCompletePage}>
      <ErrorBoundary>
        {/* TODO: ApplyComplete 컴포넌트 추가 */}

        <ConfirmationCard
          type="application"
          date={new Date(campaign?.schedule.winnerAnnouncement.start ?? today)}
        />
        <CampaignApplyCard
          size="lg"
          brand={campaign?.brand ?? ''}
          providedItems={campaign?.providedItem ?? ''}
        />
        <ButtonBar
          text="신청 내역 보기"
          variant="secondary"
          onClick={() => {
            router.push('/my');
          }}
        />
      </ErrorBoundary>
    </main>
  );
}
