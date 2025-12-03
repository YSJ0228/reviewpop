import { Form } from '@shared/components/Form';
import { useCampaignDetails } from '@features/history';

import { CampaignApplyCard } from '../CampaignApplyCard';

import { ApplyFormProps } from './types';

export function ApplyForm({ campaignId }: ApplyFormProps) {
  const { data: campaign } = useCampaignDetails(campaignId);

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
