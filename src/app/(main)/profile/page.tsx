import { requireAuth } from '@shared/lib/auth.server';
import { ROUTES } from '@shared/config/routes';
import { ProfileInfo } from '@features/profile/components/ProfileInfo';

import styles from './page.module.scss';
import { MyCurrentCampaignList } from '@features/profile/components/MyCurrentCampaignList';

export default async function ProfilePage() {
  // 인증 필수 - 미인증 시 로그인 페이지로 리다이렉트
  const user = await requireAuth(ROUTES.PROFILE);
  const campaigns = [
    { id: '1', brand: '', providedItems: '', state: 'plan' },
    { id: '2', brand: '', providedItems: '', state: 'plan' },
  ];

  return (
    <main style={{ padding: '16px' }}>
      <ProfileInfo name={user.name} review={10} campaign={10} />
      <div className={styles.ProfilePage__DividingLine}>{''}</div>
      <MyCurrentCampaignList campaigns={campaigns} />
    </main>
  );
}
