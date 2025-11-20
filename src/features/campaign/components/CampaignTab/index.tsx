'use client';

import { useState } from 'react';
import Image from 'next/image';

import styles from './style.module.scss';

export function CampaignTab() {
  const [selected, setSelected] = useState('recruiting');

  const TABS = {
    recruiting: '지금 모집중인 체험',
    before_recruiting: '공개 예정',
    completed: '지난 체험',
  };

  const ICONS = {
    recruiting: '/images/icons/IcoNotice.svg',
    before_recruiting: '/images/icons/IcoTime.svg',
    completed: '/images/icons/IcoList.svg',
  };

  function handleSelect(status) {
    setSelected(status);
  }

  return (
    <div className={styles.CampaignTab__Wrapper}>
      {Object.entries(TABS).map(([status, label]) => (
        <button
          className={styles.CampaignTab}
          data-selected={status === selected}
          key={status}
          onClick={() => handleSelect(status)}
        >
          <Image src={ICONS[status]} width={20} height={20} alt={`${label} 아이콘`} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
