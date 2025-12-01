'use client';

import { useHeaderStore } from '@shared/store/useHeaderStore';
import { Gnb } from '@shared/components/Gnb';
import { BottomNavigation } from '@shared/components/BottomNavigation';

export function GlobalMainNavigation({ children }: { children: React.ReactNode }) {
  const showBottomNavigation = useHeaderStore((state) => state.showBottomNavigation);

  return (
    <>
      {showBottomNavigation && <Gnb />}
      <div
        style={{
          paddingBottom: showBottomNavigation ? 'calc(60px + env(safe-area-inset-bottom))' : 0,
        }}
      >
        {children}
      </div>
      {showBottomNavigation && <BottomNavigation />}
    </>
  );
}
