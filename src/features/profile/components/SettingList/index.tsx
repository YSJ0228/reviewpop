import { useRouter } from 'next/navigation';
import { IconChevronRight } from '@pop-ui/foundation';

import { SettingListProps } from './types';

import styles from './style.module.scss';

export function SettingList({
  title,
  path,
  titleColor = 'var(--gray-900)',
  isIcon = true,
  onClick,
}: SettingListProps) {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick(e);
    else if (path) {
      router.push(path);
    }
  };
  return (
    <div className={styles.SettingList} onClick={handleClick}>
      <span className={styles.SettingList__Title} style={{ color: titleColor }}>
        {title}
      </span>
      {isIcon && <IconChevronRight color="var(--gray-400)" size={16} />}
    </div>
  );
}
