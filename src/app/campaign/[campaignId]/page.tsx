'use client';

import { use, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { ImageGallery, ImageViewer } from '@shared/components/ImageViewer';
import { CampaignStatusBar } from '@features/campaign/components/CampaignStatusBar';
import { CampaignContents } from '@features/campaign/components/CampaignContents';
import { CampaignValue } from '@features/campaign/components/CampaignValue';
import { CampaignInfoSection } from '@features/campaign/components/CampaignInfoSection';
import ReviewSection from '@features/campaign/components/ReviewSection';
import { CampaignScheduleSection } from '@features/campaign/components/CampaignScheduleSection';
import { CampaignRequirementsSection } from '@features/campaign/components/CampaignRequirementsSection';
import { CampaignVisitReservation } from '@features/campaign/components/CampaignVisitReservation';
import { CampaignAdditionalNotice } from '@features/campaign/components/CampaignAdditionalNotice';
import { useCampaignDetails } from '@entities/campaign/hooks/useCampaignDetails';
import { CampaignDetailPageProps } from '@entities/campaign/types/page.types';
import { usePageHeader } from '@shared/hooks/usePageHeader';

import styles from './page.module.scss';

export default function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { campaignId } = use(params);
  const router = useRouter();
  const { data: campaign, isLoading, error } = useCampaignDetails(campaignId);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  usePageHeader({
    showBackButton: true,
  });

  const images = useMemo(() => {
    if (!campaign) return [];
    if (campaign.detailImages && campaign.detailImages.length > 0) {
      return campaign.detailImages;
    }
    return [campaign.thumbnail];
  }, [campaign]);

  const handleImageClick = (index: number) => {
    setViewerIndex(index);
  };

  const handleViewAllClick = () => {
    router.push(`/campaign/${campaignId}/images`);
  };

  const handleCloseViewer = () => {
    setViewerIndex(null);
  };

  if (isLoading) {
    return (
      <div className={styles.Page}>
        <div className={styles.Page__Loading}>
          <p>체험 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className={styles.Page}>
        <div className={styles.Page__Error}>
          <p>체험 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.Page}>
      <div className={styles.Page__ImageSection}>
        <ImageGallery
          images={images}
          maxDisplay={4}
          onImageClick={handleImageClick}
          onViewAllClick={handleViewAllClick}
        />
      </div>

      {viewerIndex !== null && (
        <ImageViewer
          images={images}
          initialIndex={viewerIndex}
          isOpen={true}
          onClose={handleCloseViewer}
        />
      )}

      <div className={styles.Page__StatusBarSection}>
        <CampaignStatusBar campaign={campaign} />
      </div>

      <CampaignContents campaign={campaign} />

      <div className={styles.Page__ValueSection}>
        <CampaignValue campaign={campaign} />
      </div>

      {campaign.status === 'completed' && <ReviewSection campaignId={campaign.id} />}

      <CampaignInfoSection campaign={campaign} />

      <CampaignScheduleSection campaign={campaign} />

      <CampaignRequirementsSection campaign={campaign} />

      <CampaignVisitReservation campaign={campaign} />

      {/* 방문 및 예약 추가 안내사항 (종료된 캠페인이 아닐 때만 표시) */}
      {(() => {
        const notice =
          campaign.status !== 'completed' &&
          campaign.status !== 'closed' &&
          campaign.visitReservation?.visitReservationNotice
            ? campaign.visitReservation.visitReservationNotice
            : null;
        return notice && <CampaignAdditionalNotice content={notice} />;
      })()}

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

      {/* 후기 미션 안내 추가 안내사항 */}
      {campaign.reviewMissionNotice && (
        <CampaignAdditionalNotice content={campaign.reviewMissionNotice} />
      )}

      {/* 제공 내역 */}
      <section className={styles.Page__Section}>
        <h2 className={styles.Page__SectionTitle}>제공 내역</h2>
        <p className={styles.Page__ListItem}>{campaign.providedItem}</p>
      </section>

      {/* 주의사항 */}
      {campaign.precautions && campaign.precautions.length > 0 && (
        <section className={`${styles.Page__Section} ${styles['Page__Section--Notice']}`}>
          <h2 className={styles.Page__SectionTitle}>주의사항</h2>
          <ul className={styles.Page__List}>
            {campaign.precautions.map((notice, index) => (
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
