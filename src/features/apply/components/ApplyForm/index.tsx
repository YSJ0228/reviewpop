'use client';
import { Form } from '@shared/components/Form';
import { useCampaignDetails } from '@features/history';
import { usePageHeader } from '@shared/hooks/usePageHeader';

import { CampaignApplyCard } from '../CampaignApplyCard';

import { ApplyFormProps } from './types';

export function ApplyForm({ campaignId }: ApplyFormProps) {
  const { data: campaign } = useCampaignDetails(campaignId);
  usePageHeader({
    showBackButton: true,
    title: '체험단 신청',
  });

  return (
    <div>
      <CampaignApplyCard
        size="sm"
        brand={campaign?.brand ?? ''}
        providedItems={campaign?.providedItem ?? ''}
      />
      <Form buttonText="다음" />
    </div>
  );
}
