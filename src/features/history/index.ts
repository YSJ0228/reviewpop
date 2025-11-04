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
export { useCampaigns } from './hooks/useCampaigns';
export { useCampaignDetail } from './hooks/useCampaignDetail';

// Types
export type { Campaign, CampaignStatus, CampaignDetail, TabKey } from './types/campaign.types';
export { STATUS_LABELS, STATUS_DESCRIPTIONS, TAB_CONFIG } from './types/campaign.types';
export type { CampaignCardProps } from './components/CampaignCard/types';
export type { CampaignListProps } from './components/CampaignList/types';
