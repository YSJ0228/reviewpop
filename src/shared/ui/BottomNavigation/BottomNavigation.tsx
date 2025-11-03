'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IconHome, IconSales, IconUser } from '@pop-ui/foundation';
import styles from './BottomNavigation.module.scss';

const NAV_ITEMS = [
  { label: '홈', path: '/', icon: IconHome },
  { label: '내 체험', path: '/my', icon: IconSales },
  { label: '프로필', path: '/profile', icon: IconUser },
] as const;

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.navigation}>
      {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
        const isActive = pathname === path;
        const iconColor = isActive ? 'var(--primary-500)' : 'var(--gray-500)';

        return (
          <Link
            key={path}
            href={path}
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <Icon size={24} color={iconColor} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
