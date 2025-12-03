import { CARD_TYPES } from '@features/history/constants';

import { CampaignCompletedCard } from './CampaignCompletedCard';
import { CampaignPendingCard } from './CampaignPendingCard';
import { CampaignRejectedCard } from './CampaignRejectedCard';
import { CampaignReviewedCard } from './CampaignReviewedCard';
import { CampaignSelectedCard } from './CampaignSelectedCard';

import type { IMyCampaignCardProps } from './types';

/**
 * CampaignCard 메인 컴포넌트
 * 타입에 따라 적절한 카드 컴포넌트를 렌더링하는 라우터 역할
 * @param application - 체험 신청 정보
 * @param type - 카드 타입 (pending, selected, rejected, reviewed, completed)
 */
export function CampaignCard({ application, type }: IMyCampaignCardProps) {
  if (type === CARD_TYPES.PENDING) {
    return <CampaignPendingCard application={application} />;
  }

  if (type === CARD_TYPES.SELECTED) {
    return <CampaignSelectedCard application={application} />;
  }

  if (type === CARD_TYPES.REJECTED) {
    return <CampaignRejectedCard application={application} />;
  }

  if (type === CARD_TYPES.REVIEWED) {
    return <CampaignReviewedCard application={application} />;
  }

  if (type === CARD_TYPES.COMPLETED) {
    return <CampaignCompletedCard application={application} />;
  }

  return null;
}
