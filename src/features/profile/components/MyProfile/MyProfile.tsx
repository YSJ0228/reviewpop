'use client';

import { useUserProfile } from '@entities/user/hooks/useUserProfile';

import { MyCurrentCampaignList } from '../MyCurrentCampaignList';
import { ProfileInfo } from '../ProfileInfo';

import styles from './style.module.scss';

import { MyProfileProps } from './types';

export function MyProfile({ user }: MyProfileProps) {
  const { data: userProfile } = useUserProfile();
  return (
    <div>
      <ProfileInfo
        name={user.name}
        review={userProfile?.enrolledReviews ?? 0}
        campaign={userProfile?.participatedCampaigns ?? 0}
      />
      <div className={styles.MyProfile__DividingLine}>{''}</div>
      <MyCurrentCampaignList campaigns={userProfile?.campaigns ?? []} />
    </div>
  );
}
