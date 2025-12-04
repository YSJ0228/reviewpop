import { Application } from '@entities/application/types/application.types';

/**
 * MyCampaignList 내 체험 정보
 */
export interface IMyCampaignList {
  applications: Application[];
}
