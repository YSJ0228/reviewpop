import type { Campaign } from '../../types/campaign.types';
import { STATUS_LABELS } from '../../types/campaign.types';
import styles from './CampaignCard.module.scss';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <article className={styles.card} aria-label={`${campaign.brand} ${campaign.title}`}>
      <div className={styles.imageWrapper}>
        <img
          src={campaign.imageUrl}
          alt={`${campaign.brand} ${campaign.title} 캠페인 이미지`}
          loading="lazy"
        />
        <div className={styles.badge} aria-label={`상태: ${STATUS_LABELS[campaign.status]}`}>
          {STATUS_LABELS[campaign.status]}
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.brand}>{campaign.brand}</p>
        <h3 className={styles.title}>{campaign.title}</h3>
        <div className={styles.meta}>
          <time dateTime={campaign.applicationDate}>
            신청일: {formatDate(campaign.applicationDate)}
          </time>
          {campaign.deadline && (
            <time dateTime={campaign.deadline}>마감: {formatDate(campaign.deadline)}</time>
          )}
        </div>
        {campaign.category && (
          <div className={styles.tags}>
            <span className={styles.tag}>{campaign.category}</span>
            {campaign.points && (
              <span className={styles.points}>{campaign.points.toLocaleString()}P</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
