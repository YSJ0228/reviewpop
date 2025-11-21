import Link from 'next/link';
import Image from 'next/image';

import dayjs from 'dayjs';

import { Button } from '@pop-ui/core';
import { IconWarningCircle } from '@pop-ui/foundation';

import { CONSTANTS } from '@shared/config/constants';
import { Colors } from '@shared/styles/colors';
import { calculateAnnouncementDate } from '@entities/history/hooks/useMyCampaigns';

import CampaignAppliedCard from './CampaignAppliedCard';
import type { MyCampaignCardProps } from './types';

import styles from './style.module.scss';
import { STATUS_VISIT } from '@entities/history/types/myCampaign.types';

export function CampaignCard({ campaign, type }: MyCampaignCardProps) {
  const announcementStatus = calculateAnnouncementDate(campaign.announcementDate);

  return (
    <Link href={`/campaign/${campaign.id}`} className={styles.CampaignCard__Link}>
      <article className={styles.CampaignCard} aria-label={`${campaign.brand}`}>
        {type === 'selected' && campaign.visitStatus && (
          <div className={styles.CampaignCard__StatusLabel}>
            <span>{STATUS_VISIT[campaign.visitStatus]}</span>
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
            {type === 'applied' && <CampaignAppliedCard announcementStatus={announcementStatus} />}

            {/* selected 타입 */}
            {type === 'selected' && (
              <>
                {campaign.visitStatus === 'scheduled' && (
                  <span className={styles.CampaignCard__VisitDate}>
                    {dayjs(campaign.recruitmentSchedule?.[0]).format('M월 D일 dddd A h:mm')}
                  </span>
                )}
                {campaign.visitStatus === 'before' && (
                  <span className={styles.CampaignCard__SelectedText}>체험단에 선정되었어요🎉</span>
                )}
              </>
            )}

            <h3 className={styles.CampaignCard__Brand}>{campaign.brand}</h3>
            <p className={styles.CampaignCard__Title}>{campaign.providedItems}</p>

            {/* rejected 타입 */}
            {type === 'rejected' && campaign.recruitmentSchedule && (
              <div className={styles.CampaignCard__Date}>
                <time dateTime={campaign.recruitmentSchedule?.[0]}>
                  모집 {dayjs(campaign.recruitmentSchedule?.[0]).format('MM.DD')}
                </time>
                <span> ~ </span>
                <time dateTime={campaign.recruitmentSchedule?.[1]}>
                  {dayjs(campaign.recruitmentSchedule?.[1]).format('MM.DD')}
                </time>
                <span className={styles.CampaignCard__MaxRecruitment}>
                  {campaign.maxRecruitment ?? CONSTANTS.DEFAULT_COUNT.MAX_RECRUITMENT}명 선정
                </span>
              </div>
            )}
          </section>
        </header>

        {/* selected 타입: HEAD 브랜치의 버튼 로직 유지 */}
        {type === 'selected' && (
          <>
            {/* 선정된 체험이면서, 예약 상태가 아닌경우 (campaign.visitStatus === before) */}
            {campaign.visitStatus === 'before' && (
              <footer className={styles.CampaignCard__ContentWrapper}>
                <Button
                  variant="primary"
                  fullWidth
                  radius={8}
                  onClick={() => {
                    // TODO: 구현 예정 (예약 페이지로 이동)
                  }}
                >
                  <span className={styles.CampaignCard__PrimaryText}>
                    체험 방문할 날짜를 설정해주세요.
                  </span>
                </Button>
                <div className={styles.CampaignCard__WarningWrapper}>
                  <IconWarningCircle color={Colors.COLOR_GRAY_400} size={12} />
                  <span className={styles.CampaignCard__WarningText}>
                    방문 가능 기간 내 예약을 안하면 선정이 취소돼요
                  </span>
                </div>
              </footer>
            )}
            {/* 선정된 체험이면서, 예약 상태 데이터가 있는 경우 (campaign.visitStatus === scheduled) */}
            {campaign.visitStatus === 'scheduled' && (
              <Button
                variant="basic"
                fullWidth
                radius={8}
                onClick={() => {
                  // TODO: 구현 예정 (체험 상세 페이지로 이동)
                }}
              >
                <span className={styles.CampaignCard__BasicText}>체험 정보 및 후기 미션</span>
              </Button>
            )}
          </>
        )}

        {/* TODO: 추후 조건(applied, selected, registered, completed) 관련해 논의 후 추가 필요 (구조 변경 가능성 높음) */}
      </article>
    </Link>
  );
}
