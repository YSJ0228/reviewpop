export interface MyCurrentCampaignCardProps {
  brand: string;
  providedItems: string;
  state: 'reservation' | 'plan' | 'review';
  visit?: string;
}
