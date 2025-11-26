import { Campaign } from '@entities/campaign/types/campaign.types';
import { User } from '@entities/user';

export interface ApplyFormProps {
  campaign?: Campaign;
  user?: User;
}
