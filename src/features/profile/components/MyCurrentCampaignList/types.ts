type Campaign = {
  id: string;
  brand: string;
  providedItems: string;
  state: 'reservation' | 'plan' | 'review';
};

export interface MyCurrentCampaignListProps {
  campaigns: Campaign[];
}
