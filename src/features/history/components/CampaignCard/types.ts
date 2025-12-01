import type { Application } from '@entities/application';
import type { TCardType } from '@features/history/constants';

export interface IMyCampaignCardProps {
  application: Application;
  type: TCardType;
}
