import type { Application, ApplicationStatus } from '@entities/application';

export interface IMyCampaignCardProps {
  application: Application;
  type: ApplicationStatus;
}
