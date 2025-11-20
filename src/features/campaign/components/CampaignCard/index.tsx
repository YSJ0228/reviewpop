import Link from 'next/link';
import Image from 'next/image';
import { IconArrowRight } from '@pop-ui/foundation';

import { diff, formatDate, now } from '@shared/lib/date';

import type { CampaignCardProps } from './types';

import { CampaignCountdown } from './CampaignCountdown';

import styles from './style.module.scss';

export function CampaignCard({ campaign }: CampaignCardProps) {
  const givenTime = campaign.schedule.applicationSchedule[1];
  const currentTime = now();
  const diffInDays = Math.max(0, diff(givenTime, currentTime, 'day'));
  const applicationSchedule = campaign.schedule.applicationSchedule.map((d) =>
    formatDate(d, 'MMDD_DDD_SHORT'),
  );

  return (
    <Link href={`/campaign/${campaign.id}`} className={styles.CampaignCard__Link}>
      <article className={styles.CampaignCard} aria-label={`${campaign.brand} ${campaign.title}`}>
        <Image
          src={campaign.imageUrl}
          alt={`${campaign.brand} ${campaign.title} 체험 이미지`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.CampaignCard__Badge} aria-label={`상태: ${campaign.location}`}>
          {campaign.location}
        </div>
        <div className={styles.CampaignCard__Wrapper}>
          <div className={styles.CampaignCard__Header}>
            <span className={styles.CampaignCard__Brand}>{campaign.brand}</span>
            <h3 className={styles.CampaignCard__Title}>{campaign.title}</h3>
            <p className={styles.CampaignCard__Items}>{campaign.providedItems.join(' + ')}</p>
          </div>
          {campaign.status === 'in_progress' && (
            <div className={styles.CampaignCard__Content__Active}>
              <div>
                <div className={styles.CampaignCard__Recruitment}>
                  <span>
                    <b>{diffInDays}일 남음</b>
                  </span>
                  <span>
                    <b>{`신청 ${campaign.currentRecruitment}명`}</b>
                    {`/${campaign.maxRecruitment}명`}
                  </span>
                </div>
                <div className={styles.CampaignCard__Meta}>
                  <span>체험단 모집</span>
                  <time dateTime={campaign.schedule.applicationSchedule[0]}>
                    {applicationSchedule.join(' ~ ')}
                  </time>
                </div>
              </div>
              <div className={styles.CampaignCard__Button} aria-hidden={true}>
                <IconArrowRight color="white" />
              </div>
            </div>
          )}
          {campaign.status === 'before_recruiting' && (
            <div className={styles.CampaignCard__Content__Before}>
              <span>오픈까지</span>
              <CampaignCountdown targetDate={campaign.schedule.applicationSchedule[0]} />
            </div>
          )}
          {campaign.status === 'closed' && (
            <div className={styles.CampaignCard__Content__Closed}>
              <span>종료된 체험</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
