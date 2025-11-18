import Link from 'next/link';
import Image from 'next/image';
import { STATUS_LABELS } from '@entities/history/types/myCampaign.types';
import { formatDate } from '@shared/lib/date';
import type { MyCampaignCardProps } from './types';
import styles from './style.module.scss';

export function CampaignCard({ campaign }: MyCampaignCardProps) {
  return (
    <Link href={`/campaign/${campaign.id}`} className={styles.CampaignCard__Link}>
      <article className={styles.CampaignCard} aria-label={`${campaign.brand} ${campaign.title}`}>
        <div className={styles.CampaignCard__ImageWrapper}>
          <Image
            src={campaign.imageUrl}
            alt={`${campaign.brand} ${campaign.title} 체험 이미지`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
          <div
            className={styles.CampaignCard__Badge}
            aria-label={`상태: ${STATUS_LABELS[campaign.status]}`}
          >
            {STATUS_LABELS[campaign.status]}
          </div>
        </div>
        <div className={styles.CampaignCard__Content}>
          <p className={styles.CampaignCard__Brand}>{campaign.brand}</p>
          <h3 className={styles.CampaignCard__Title}>{campaign.title}</h3>
          <div className={styles.CampaignCard__Meta}>
            <time dateTime={campaign.applicationDate}>
              신청일: {formatDate(campaign.applicationDate, 'SHORT')}
            </time>
            {campaign.deadline && (
              <time dateTime={campaign.deadline}>
                마감: {formatDate(campaign.deadline, 'SHORT')}
              </time>
            )}
          </div>
          {campaign.category && (
            <div className={styles.CampaignCard__Tags}>
              <span className={styles.CampaignCard__Tag}>{campaign.category}</span>
              {campaign.points && (
                <span className={styles.CampaignCard__Points}>
                  {campaign.points.toLocaleString()}P
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
