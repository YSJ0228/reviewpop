import Image from 'next/image';
import styles from './style.module.scss';

interface CampaignCardProps {
  thumbnail: string;
  brand: string;
  title: string;
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  statusLabel?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function CampaignCard({
  thumbnail,
  brand,
  title,
  topContent,
  bottomContent,
  statusLabel,
  onClick,
  className,
}: CampaignCardProps) {
  return (
    <article className={`${styles.CampaignCard} ${className || ''}`} onClick={onClick}>
      {statusLabel && statusLabel}
      <header className={styles.CampaignCard__TopSection}>
        <div className={styles.CampaignCard__ImageWrapper}>
          <Image
            src={thumbnail}
            alt={`${brand} 체험 이미지`}
            fill
            sizes="(max-width: 768px) 88px, 88px"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <section className={styles.CampaignCard__Content}>
          {topContent}
          <h3 className={styles.CampaignCard__Brand}>{brand}</h3>
          <p className={styles.CampaignCard__Title}>{title}</p>
          {bottomContent}
        </section>
      </header>
    </article>
  );
}
