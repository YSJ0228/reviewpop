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

export function CampaignCard({ campaign, type }: MyCampaignCardProps) {
  const announcementStatus = calculateAnnouncementDate(campaign.announcementDate);

  return (
    <Link href={`/campaign/${campaign.id}`} className={styles.CampaignCard__Link}>
      <header className={styles.CampaignCard__StatusLabel}>
        <span>status label</span>
      </header>
      <article className={styles.CampaignCard} aria-label={`${campaign.brand}`}>
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
            {/* applied 타입: develop 브랜치의 CampaignAppliedCard 사용 */}
            {type === 'applied' && <CampaignAppliedCard announcementStatus={announcementStatus} />}

            {/* selected 타입: HEAD 브랜치의 로직 유지 */}
            {type === 'selected' && (
              <>
                {campaign.visitStatus && (
                  <span className={styles.CampaignCard__VisitDate}>
                    {/* TODO: 실제 방문 날짜 데이터로 교체 필요 (예: campaign.visitDate) */}
                    9월 18일 수요일 오후 1:00
                  </span>
                )}
                {!campaign.visitStatus && (
                  <span className={styles.CampaignCard__SelectedText}>체험단에 선정되었어요🎉</span>
                )}
              </>
            )}

            <h3 className={styles.CampaignCard__Brand}>{campaign.brand}</h3>
            <p className={styles.CampaignCard__Title}>{campaign.providedItems}</p>

            {/* rejected 타입: 양쪽 브랜치 모두 비슷하므로 하나로 통합 */}
            {type === 'rejected' && campaign.deadline && (
              <div className={styles.CampaignCard__Date}>
                <time dateTime={campaign.applicationDate}>
                  모집 {dayjs(campaign.applicationDate).format('MM.DD')}
                </time>
                <span> ~ </span>
                <time dateTime={campaign.deadline}>{dayjs(campaign.deadline).format('MM.DD')}</time>
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
            {/* 선정된 체험이면서, 예약 상태가 아닌경우 (campaign.visitStatus === false) */}
            {!campaign.visitStatus && (
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
            {/* 선정된 체험이면서, 예약 상태 데이터가 있는 경우 (campaign.visitStatus === true) */}
            {campaign.visitStatus && (
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
