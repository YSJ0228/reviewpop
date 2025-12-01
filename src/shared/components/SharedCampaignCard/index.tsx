import Image from 'next/image';
import styles from './style.module.scss';

interface SharedCampaignCardProps {
  thumbnail: string;
  brand: string;
  title: string;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  statusLabel?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function SharedCampaignCard({
  thumbnail,
  brand,
  title,
  topContent,
  bottomContent,
  statusLabel,
  onClick,
  className,
}: SharedCampaignCardProps) {
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
      <header className={styles.SharedCampaignCard__TopSection}>
        <div className={styles.SharedCampaignCard__ImageWrapper}>
          <Image
            src={thumbnail}
            alt={`${brand} 체험 이미지`}
            fill
            sizes="(max-width: 768px) 88px, 88px"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <section className={styles.SharedCampaignCard__Content}>
          {topContent}
          <h3 className={styles.SharedCampaignCard__Brand}>{brand}</h3>
          <p className={styles.SharedCampaignCard__Title}>{title}</p>
          {bottomContent}
        </section>
      </header>
    </article>
  );
}
