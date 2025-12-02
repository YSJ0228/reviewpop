'use client';

import { useUserProfile } from '@entities/user/hooks/useUserProfile';

import { MyCurrentCampaignList } from '../MyCurrentCampaignList';
import { ProfileInfo } from '../ProfileInfo';

import styles from './style.module.scss';

export function MyProfile() {
  const { data: userProfile } = useUserProfile();

  return (
    <div>
      <ProfileInfo
        name={userProfile?.name ?? ''}
        review={userProfile?.enrolledReviews ?? 0}
        campaign={userProfile?.participatedCampaigns ?? 0}
      />
      <div className={styles.MyProfile__DividingLine}>{''}</div>
      <MyCurrentCampaignList campaigns={userProfile?.campaigns ?? []} />
    </div>
  );
}
