import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@shared/lib/date';
import type { CampaignCardProps } from './types';
import styles from './style.module.scss';

export function CampaignCard({ campaign }: CampaignCardProps) {
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
          <div className={styles.CampaignCard__Badge} aria-label={`상태: ---`}>
            전국
          </div>
        </div>
        <div className={styles.CampaignCard__Content}>
          <p className={styles.CampaignCard__Brand}>{campaign.brand}</p>
          <h3 className={styles.CampaignCard__Title}>{campaign.title}</h3>
          <p className={styles.CampaignCard__Brand}>{campaign.description}</p>
          <div className={styles.CampaignCard__Meta}>
            <time dateTime={campaign.schedule.applicationSchedule[0]}>
              신청일: {formatDate(campaign.schedule.applicationSchedule[0], 'SHORT')}
            </time>
            <time dateTime={campaign.schedule.applicationSchedule[1]}>
              마감: {formatDate(campaign.schedule.applicationSchedule[1], 'SHORT')}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}
