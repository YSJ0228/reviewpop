import NotificationsContent from './NotificationsContent';
import { requireAuth } from '@shared/lib/auth.server';

export default async function NotificationsPage() {
  await requireAuth('/notifications');

  return <NotificationsContent />;
}
