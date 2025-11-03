import { BottomNavigation } from '@shared/ui/BottomNavigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div style={{ paddingBottom: 'calc(60px + env(safe-area-inset-bottom))' }}>{children}</div>
      <BottomNavigation />
    </>
  );
}
