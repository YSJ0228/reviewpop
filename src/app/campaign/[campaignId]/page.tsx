'use client';

import { use } from 'react';

import { PageHeader } from '@shared/components/PageHeader';
import { useCampaignDetails } from '@entities/campaign/hooks/useCampaignDetails';
import { CAMPAIGN_STATUS_LABELS } from '@entities/campaign/types/campaign.types';
import styles from './page.module.scss';
interface CampaignDetailPageProps {
  params: Promise<{
    campaignId: string;
  }>;
}

export default function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { campaignId } = use(params);
  const { data: campaign, isLoading, error } = useCampaignDetails(campaignId);

  if (isLoading) {
    return (
      <div className={styles.Page}>
        <PageHeader showBackButton />
        <div className={styles.Page__Loading}>
          <p>체험 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className={styles.Page}>
        <PageHeader showBackButton />
        <div className={styles.Page__Error}>
          <p>체험 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.Page}>
      <PageHeader showBackButton />

      {/* 메인 이미지 */}
      <div className={styles.Page__ImageWrapper}>
        <img src={campaign.imageUrl} alt={`${campaign.brand} ${campaign.title}`} />
        <div
          className={styles.Page__Badge}
          aria-label={`상태: ${CAMPAIGN_STATUS_LABELS[campaign.status]}`}
        >
          {CAMPAIGN_STATUS_LABELS[campaign.status]}
        </div>
      </div>

      {/* 기본 정보 */}
      <section className={styles.Page__Section}>
        <p className={styles.Page__Brand}>{campaign.brand}</p>
        <h1 className={styles.Page__Title}>{campaign.title}</h1>

        <div className={styles.Page__Meta}>
          <div className={styles.Page__MetaItem}>
            <span className={styles.Page__MetaLabel}>신청일</span>
            <span className={styles.Page__MetaValue}>
              {formatDate(campaign.schedule.applicationSchedule[0])}
            </span>
          </div>
          <div className={styles.Page__MetaItem}>
            <span className={styles.Page__MetaLabel}>마감일</span>
            <span className={styles.Page__MetaValue}>
              {formatDate(campaign.schedule.applicationSchedule[1])}
            </span>
          </div>
          <div className={styles.Page__MetaItem}>
            <span className={styles.Page__MetaLabel}>카테고리</span>
            <span className={styles.Page__MetaValue}>{campaign.category}</span>
          </div>
        </div>

        {/* 모집 인원 */}
        <div className={styles.Page__Recruitment}>
          <div className={styles.Page__RecruitmentBar}>
            <div
              className={styles.Page__RecruitmentProgress}
              style={{
                width: `${(campaign.currentRecruitment / campaign.maxRecruitment) * 100}%`,
              }}
            />
          </div>
          <p className={styles.Page__RecruitmentText}>
            <strong>{campaign.currentRecruitment}</strong> / {campaign.maxRecruitment}명 신청
          </p>
        </div>
      </section>

      {/* 체험 소개 */}
      <section className={styles.Page__Section}>
        <h2 className={styles.Page__SectionTitle}>체험 소개</h2>
        <p className={styles.Page__Description}>{campaign.description}</p>
      </section>

      {/* 리뷰 미션 */}
      <section className={styles.Page__Section}>
        <h2 className={styles.Page__SectionTitle}>리뷰 미션</h2>
        <ul className={styles.Page__List}>
          {campaign.reviewMission.map((mission, index) => (
            <li key={index} className={styles.Page__ListItem}>
              {mission}
            </li>
          ))}
        </ul>
      </section>

      {/* 제공 내역 */}
      <section className={styles.Page__Section}>
        <h2 className={styles.Page__SectionTitle}>제공 내역</h2>
        <p className={styles.Page__ListItem}>{campaign.providedItems}</p>
      </section>

      {/* 배송 정보 */}
      {campaign.deliveryInfo && (
        <section className={styles.Page__Section}>
          <h2 className={styles.Page__SectionTitle}>배송 정보</h2>
          <div className={styles.Page__DeliveryInfo}>
            {campaign.deliveryInfo.shippingDate && (
              <p>
                <strong>발송 예정일:</strong> {formatDate(campaign.deliveryInfo.shippingDate)}
              </p>
            )}
            {campaign.deliveryInfo.trackingNumber && (
              <p>
                <strong>운송장 번호:</strong> {campaign.deliveryInfo.trackingNumber}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 신청 조건 */}
      {campaign.requirements && campaign.requirements.length > 0 && (
        <section className={styles.Page__Section}>
          <h2 className={styles.Page__SectionTitle}>신청 조건</h2>
          <ul className={styles.Page__List}>
            {campaign.requirements.map((requirement, index) => (
              <li key={index} className={styles.Page__ListItem}>
                {requirement}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 주의사항 */}
      {campaign.experiencePrecautions && campaign.experiencePrecautions.length > 0 && (
        <section className={`${styles.Page__Section} ${styles['Page__Section--Notice']}`}>
          <h2 className={styles.Page__SectionTitle}>주의사항</h2>
          <ul className={styles.Page__List}>
            {campaign.experiencePrecautions.map((notice, index) => (
              <li key={index} className={styles.Page__ListItem}>
                {notice}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
