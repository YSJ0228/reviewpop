import Image from 'next/image';

import { ISharedCampaignCardProps } from './type';
import styles from './style.module.scss';

export function SharedCampaignCard({
  thumbnail,
  brand,
  title,
  topContent,
  bottomContent,
  statusLabel,
  onClick,
  className,
  titleClassName,
  contentClassName,
  brandClassName,
  topSectionClassName,
}: ISharedCampaignCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article
      className={`${styles.SharedCampaignCard} ${className || ''} ${onClick ? styles['SharedCampaignCard--Clickable'] : ''}`}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`${brand} 체험 카드`}
    >
      {statusLabel && statusLabel}
      <header className={`${styles.SharedCampaignCard__TopSection} ${topSectionClassName || ''}`}>
        <div className={styles.SharedCampaignCard__ImageWrapper}>
          <Image
            src={thumbnail}
            alt={`${brand} 체험 이미지`}
            fill
            sizes="(max-width: 768px) 88px, 88px"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <section className={`${styles.SharedCampaignCard__Content} ${contentClassName || ''}`}>
          {topContent}
          <h3 className={`${styles.SharedCampaignCard__Brand} ${brandClassName || ''}`}>{brand}</h3>
          <p className={`${styles.SharedCampaignCard__Title} ${titleClassName || ''}`}>{title}</p>
          {bottomContent}
        </section>
      </header>
    </article>
  );
}
