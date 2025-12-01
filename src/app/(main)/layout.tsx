import { GlobalMainNavigation } from '@shared/components';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <GlobalMainNavigation>{children}</GlobalMainNavigation>;
}
