import Link from 'next/link';
import Image from 'next/image';
import { IconArrowRight } from '@pop-ui/foundation';

import { diffDate, formatDate, now } from '@shared/lib/date';

import type { CampaignCardProps } from './types';

import styles from './style.module.scss';

export function RecruitingCard({ campaign }: CampaignCardProps) {
  const givenTime = campaign.schedule.application.end;
  const currentTime = now();
  const diffInDays = Math.max(0, diffDate(givenTime, currentTime));
  const applicationSchedule = [
    campaign.schedule.application.start,
    campaign.schedule.application.end,
  ].map((d) => formatDate(d, 'MMDD_DDD_SHORT'));

  return (
    <Link href={`/campaign/${campaign.id}`} className={styles.CampaignCard__Link}>
      <article className={styles.CampaignCard} aria-label={`${campaign.brand} ${campaign.title}`}>
        <Image
          src={campaign.thumbnail}
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
            <p className={styles.CampaignCard__Items}>{campaign.providedItem}</p>
          </div>
          <div className={styles.CampaignCard__Content__Active}>
            <div className={styles.CampaignCard__MetaWrapper}>
              <div className={styles.CampaignCard__Recruitment}>
                <span>
                  <b>{diffInDays ? `${diffInDays}일 남음` : '오늘 마감'}</b>
                </span>
                <span>
                  <b>{`신청 ${campaign.currentRecruitment}명`}</b>
                  {`/${campaign.maxRecruitment}명`}
                </span>
              </div>
              <div className={styles.CampaignCard__Meta}>
                <span>체험단 모집</span>
                <time dateTime={campaign.schedule.application.start}>
                  {applicationSchedule.join(' ~ ')}
                </time>
              </div>
            </div>
            <div className={styles.CampaignCard__Button} aria-hidden={true}>
              <IconArrowRight color="white" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
