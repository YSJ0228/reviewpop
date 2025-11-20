'use client';

import Image from 'next/image';

import { CampaignTabKey, CampaignTabs } from '@entities/campaign/types/campaign.types';
import { CampaignTabProps } from './types';

import styles from './style.module.scss';

export function CampaignTab({ onTabClick, selectedTab }: CampaignTabProps) {
  const ICONS: Record<CampaignTabKey, string> = {
    recruiting: '/images/icons/IcoNotice.svg',
    before_recruiting: '/images/icons/IcoTime.svg',
    completed: '/images/icons/IcoList.svg',
  };

  function handleSelect(status: CampaignTabKey) {
    onTabClick(status);
  }

  return (
    <div className={styles.CampaignTab__Wrapper}>
      {Object.entries(CampaignTabs).map(([status, label]) => {
        const key = status as CampaignTabKey;

        return (
          <button
            className={styles.CampaignTab}
            data-selected={status === selectedTab}
            key={key}
            onClick={() => handleSelect(key)}
          >
            <Image src={ICONS[key]} width={20} height={20} alt={`${label} 아이콘`} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
