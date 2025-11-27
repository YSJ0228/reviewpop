import Link from 'next/link';
import Image from 'next/image';

import dayjs from 'dayjs';

import { calculateAnnouncementDate } from '@entities/history/hooks/useMyCampaigns';
import { STATUS_VISIT } from '@entities/history/types/myCampaign.types';

import { CampaignAppliedCard } from './CampaignAppliedCard';
import { CampaignRejectedCard } from './CampaignRejectedCard';
import { CampaignSelectedCard } from './CampaignSelectedCard';

import type { MyCampaignCardProps } from './types';

import styles from './style.module.scss';
import { HISTORY_MESSAGES } from '@features/history/constants';

export function CampaignCard({ campaign, type }: MyCampaignCardProps) {
  const announcementStatus = calculateAnnouncementDate(campaign.announcementDate);

  return (
    <>
      <Link
        href={`/campaign/${campaign.id}`}
        className={`${styles.CampaignCard__Link} ${type === 'selected' ? styles['CampaignCard__Link--NoBorder'] : ''}`}
      >
        <article className={styles.CampaignCard} aria-label={`${campaign.brand}`}>
          {type === 'selected' && campaign.visitStatus && (
            <div className={styles.CampaignCard__StatusLabel}>
              <p>{STATUS_VISIT[campaign.visitStatus]}</p>
            </div>
          )}
          <header className={styles.CampaignCard__TopSection}>
            <div className={styles.CampaignCard__ImageWrapper}>
              <Image
                src={campaign.imageUrl}
                alt={`${campaign.brand} 체험 이미지`}
                fill
                sizes="(max-width: 768px) 88px, 88px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <section className={styles.CampaignCard__Content}>
              {/* applied 타입 */}
              {type === 'applied' && (
                <CampaignAppliedCard announcementStatus={announcementStatus} />
              )}

              {/* selected 타입 */}
              {type === 'selected' && (
                <>
                  {campaign.visitStatus === 'scheduled' && (
                    <span className={styles.CampaignCard__VisitDate}>
                      {campaign.appliedAt &&
                        dayjs(`${campaign.appliedAt[0]} ${campaign.appliedAt[1]}`).format(
                          'M월 D일 dddd A h:mm',
                        )}
                    </span>
                  )}
                  {campaign.visitStatus === 'before' && (
                    <span className={styles.CampaignCard__SelectedText}>
                      {HISTORY_MESSAGES.SELECTED}
                    </span>
                  )}
                </>
              )}

              <h3 className={styles.CampaignCard__Brand}>{campaign.brand}</h3>
              <p className={styles.CampaignCard__Title}>{campaign.providedItems}</p>

              {/* rejected 타입 */}
              {type === 'rejected' && (
                <CampaignRejectedCard
                  recruitmentSchedule={campaign.recruitmentSchedule}
                  maxRecruitment={campaign.maxRecruitment}
                />
              )}
            </section>
          </header>

          {/* TODO: 추후 조건(applied, selected, registered, completed) 관련해 논의 후 추가 필요 (구조 변경 가능성 높음) */}
        </article>
      </Link>

      {/* selected 타입 - Link 밖으로 분리*/}
      {type === 'selected' && campaign.visitStatus && (
        <CampaignSelectedCard campaign={campaign} visitStatus={campaign.visitStatus} />
      )}
    </>
  );
}
