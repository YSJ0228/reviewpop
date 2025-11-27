'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { NAV_ITEMS } from './constants';

import styles from './style.module.scss';

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.BottomNavigation}>
      {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
        const isActive = pathname === path;
        const iconColor = isActive ? 'var(--gray-900)' : 'var(--gray-400)';

        const itemClassName = [
          styles.BottomNavigation__Item,
          isActive ? styles['BottomNavigation__Item--Active'] : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <Link key={path} href={path} className={itemClassName}>
            <Icon size={28} color={iconColor} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
