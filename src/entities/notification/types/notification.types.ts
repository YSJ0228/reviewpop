export type NotificationType = 'default' | 'schedule' | 'edit';

export interface Notification {
  id: string;
  campaignId: string;
  isWatched: boolean;
  title: string;
  content: string;
  type: NotificationType;
  createdAt: string;
}
