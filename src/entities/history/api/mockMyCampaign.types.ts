import { Application } from '@entities/application/types/application.types';

export interface IMyCampaignsResponse {
  data: Application[];
  success: boolean;
}
