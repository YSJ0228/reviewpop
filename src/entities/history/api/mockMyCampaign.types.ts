import { Application } from '@entities/application/types/application.types';

export interface MyCampaignsResponse {
  data: Application[];
  success: boolean;
}
