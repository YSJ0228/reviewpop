import { BottomNavigation } from '@shared/components/BottomNavigation';
import { Gnb } from '@shared/components/Gnb';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Gnb />
      <div style={{ paddingBottom: 'calc(60px + env(safe-area-inset-bottom))' }}>{children}</div>
      <BottomNavigation />
    </>
  );
}
