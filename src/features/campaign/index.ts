/**
 * Campaign Feature Public API
 *
 * 체험 관련 기능을 외부에 노출하는 Public API입니다.
 */

// Components
export { BeforeRecruitingCampaignList } from './components/CampaignList/BeforeRecruitingCampaignList';
export { RecruitingCampaignList } from './components/CampaignList/RecruitingCampaignList';
export { CompletedCampaignList } from './components/CampaignList/CompletedCampaignList';
export { CampaignContents } from './components/CampaignContents';
export { CampaignValue } from './components/CampaignValue';
export { CampaignInfoSection } from './components/CampaignInfoSection';
export { CampaignScheduleSection } from './components/CampaignScheduleSection';
export { CampaignRequirementsSection } from './components/CampaignRequirementsSection';

// Hooks
export { useCampaigns } from '@entities/campaign/hooks/useCampaigns';
export { useCampaignDetails } from '@entities/campaign/hooks/useCampaignDetails';

// Types
export type {
  Campaign,
  CampaignStatus,
  CampaignDetail,
} from '@entities/campaign/types/campaign.types';
export type { CampaignCardProps } from './components/CampaignCard/types';
export type { CampaignListProps } from './components/CampaignList/types';
export type { CampaignContentsProps } from './components/CampaignContents';
export type { CampaignValueProps } from './components/CampaignValue';
export type { CampaignInfoSectionProps } from './components/CampaignInfoSection';
export type { CampaignScheduleSectionProps } from './components/CampaignScheduleSection';
export type { CampaignRequirementsSectionProps } from './components/CampaignRequirementsSection';
