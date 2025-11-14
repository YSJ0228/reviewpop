/**
 * History Feature Public API
 *
 * 캠페인 히스토리 관련 기능을 외부에 노출하는 Public API입니다.
 */

// Components
export { CampaignCard } from './components/CampaignCard';
export { CampaignList } from './components/CampaignList';
export { CampaignTabs } from './components/CampaignTabs';

// Hooks
export { useCampaigns } from '@entities/campaign/hooks/useCampaigns';
export { useCampaignDetails } from '@entities/campaign/hooks/useCampaignDetails';

// Types
export type {
  MyCampaign,
  MyCampaignStatus,
  MyCampaignDetail,
  TabKey,
} from '@entities/history/types/myCampaign.types';
export {
  STATUS_LABELS,
  STATUS_DESCRIPTIONS,
  TAB_CONFIG,
} from '@entities/history/types/myCampaign.types';
export type { MyCampaignCardProps } from './components/CampaignCard/types';
export type { MyCampaignListProps } from './components/CampaignList/types';
