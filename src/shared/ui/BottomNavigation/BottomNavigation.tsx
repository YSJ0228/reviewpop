'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './BottomNavigation.module.scss';

const NAV_ITEMS = [
  { label: '홈', path: '/' },
  { label: '내 체험', path: '/my' },
  { label: '프로필', path: '/profile' },
] as const;

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.navigation}>
      {NAV_ITEMS.map(({ label, path }) => (
        <Link
          key={path}
          href={path}
          className={`${styles.navItem} ${pathname === path ? styles.active : ''}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
