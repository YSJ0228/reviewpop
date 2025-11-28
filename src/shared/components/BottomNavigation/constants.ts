import { IconHome, IconUser } from '@pop-ui/foundation';
import { IconNote } from './IconNote';

export const NAV_ITEMS = [
  { label: '홈', path: '/', icon: IconHome },
  { label: '나의 체험', path: '/my', icon: IconNote },
  { label: '프로필', path: '/profile', icon: IconUser },
] as const;
