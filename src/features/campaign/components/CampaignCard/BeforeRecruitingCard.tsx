import Image from 'next/image';

import { CampaignCountdown } from './CampaignCountdown';

import type { CampaignCardProps } from './types';

import styles from './style.module.scss';

export function BeforeRecruitingCard({ campaign }: CampaignCardProps) {
  return (
    <div className={styles.CampaignCard__Link}>
      <article className={styles.CampaignCard} aria-label={`${campaign.brand} ${campaign.title}`}>
        <Image
          src={campaign.imageUrl}
          alt={`${campaign.brand} ${campaign.title} 체험 이미지`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.CampaignCard__Badge} aria-label={`상태: ${campaign.location}`}>
          {campaign.location ? `${campaign.location.sido} ${campaign.location.sigungu}` : '전국'}
        </div>
        <div className={styles.CampaignCard__Wrapper}>
          <div className={styles.CampaignCard__Header}>
            <span className={styles.CampaignCard__Brand}>{campaign.brand}</span>
            <h3 className={styles.CampaignCard__Title}>{campaign.title}</h3>
            <p className={styles.CampaignCard__Items}>{campaign.providedItems}</p>
          </div>
          <div className={styles.CampaignCard__Content__Before}>
            <CampaignCountdown targetDate={campaign.schedule.applicationSchedule[0]} />
          </div>
        </div>
      </article>
    </div>
  );
}
