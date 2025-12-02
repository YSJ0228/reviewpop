'use client';

import { useHeaderStore } from '@shared/store/useHeaderStore';
import { Gnb } from '@shared/components/Gnb';
import { BottomNavigation } from '@shared/components/BottomNavigation';

import styles from './style.module.scss';

export function GlobalMainNavigation({ children }: { children: React.ReactNode }) {
  const showBottomNavigation = useHeaderStore((state) => state.showBottomNavigation);

  return (
    <>
      {showBottomNavigation && <Gnb />}
      <div
        className={`${styles.Content} ${
          showBottomNavigation ? styles['Content--withNavigation'] : ''
        }`}
      >
        {children}
      </div>
      {showBottomNavigation && <BottomNavigation />}
    </>
  );
}
