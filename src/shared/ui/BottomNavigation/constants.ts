import { IconHome, IconSales, IconUser } from '@pop-ui/foundation';

export const NAV_ITEMS = [
  { label: '홈', path: '/', icon: IconHome },
  { label: '내 체험', path: '/my', icon: IconSales },
  { label: '프로필', path: '/profile', icon: IconUser },
] as const;
