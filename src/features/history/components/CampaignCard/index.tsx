import Link from 'next/link';
import Image from 'next/image';

import dayjs from 'dayjs';

import type { MyCampaignCardProps } from './types';

import styles from './style.module.scss';

export function CampaignCard({ campaign }: MyCampaignCardProps) {
  return (
    <Link href={`/campaign/${campaign.id}`} className={styles.CampaignCard__Link}>
      <article className={styles.CampaignCard} aria-label={`${campaign.brand} ${campaign.title}`}>
        <figure className={styles.CampaignCard__ImageWrapper}>
          <Image
            src={campaign.imageUrl}
            alt={`${campaign.brand} ${campaign.title} 체험 이미지`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </figure>
        <div className={styles.CampaignCard__Content}>
          <p className={styles.CampaignCard__Brand}>{campaign.brand}</p>

          <p className={styles.CampaignCard__Title}>{campaign.title}</p>

          {campaign.status === 'rejected' && (
            <div className={styles.CampaignCard__Date}>
              <time dateTime={`${campaign.applicationDate}/${campaign.deadline}`}>
                모집 {dayjs(campaign.applicationDate).format('MM.DD')} ~{' '}
                {dayjs(campaign.deadline).format('MM.DD')}
              </time>
              <span className={styles.CampaignCard__MaxRecruitment}>
                {campaign.maxRecruitment ?? 16}명 선정
              </span>
            </div>
          )}
          {/* TODO: 추후 조건(applied, selected, registered, completed) 관련해 논의 후 추가 필요 (구조 변경 가능성 높음) */}
        </div>
      </article>
    </Link>
  );
}
