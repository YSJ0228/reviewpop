'use client';

import { use, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { ImageGallery, ImageViewer } from '@shared/components/ImageViewer';
import { BulletListSection } from '@features/campaign';
import { AddressMap } from '@shared/components';
import { WebButton } from '@shared/components/WebButton';
import { toast } from '@shared/components/Toast';
import { CampaignStatusBar } from '@features/campaign/components/CampaignStatusBar';
import { CampaignContents } from '@features/campaign/components/CampaignContents';
import { CampaignValue } from '@features/campaign/components/CampaignValue';
import { CampaignInfoSection } from '@features/campaign/components/CampaignInfoSection';
import CampaignCTA from '@features/campaign/components/CampaignCTA';
import ReviewSection from '@features/campaign/components/ReviewSection';
import { CampaignScheduleSection } from '@features/campaign/components/CampaignScheduleSection';
import { CampaignVisitReservation } from '@features/campaign/components/CampaignVisitReservation';
import { CampaignAdditionalNotice } from '@features/campaign/components/CampaignAdditionalNotice';
import { useCampaignDetails } from '@entities/campaign/hooks/useCampaignDetails';
import { CampaignDetailPageProps } from '@entities/campaign/types/page.types';
import { usePageHeader } from '@shared/hooks/usePageHeader';
import { useApplicationDetails } from '@entities/application/hooks/useApplicationDetails';
import { useUserInfo } from '@entities/user/hooks/useUserInfo';

import styles from './page.module.scss';

export default function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { campaignId } = use(params);
  const router = useRouter();
  const { data: campaign, isLoading, error } = useCampaignDetails(campaignId);
  const { data: user } = useUserInfo();
  const { data: application } = useApplicationDetails(campaignId, user?.id ?? '', {
    enabled: !!user?.id,
  });
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  // 선정되었고 아직 예약하지 않은 상태인지 확인
  const isSelectedWithoutReservation = useMemo(() => {
    return application?.status === 'selected' && !application?.isReservated;
  }, [application]);

  usePageHeader({
    title: campaign?.brand,
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

  const keywordsText = useMemo(() => {
    if (!campaign?.keywords?.length) return '';
    return campaign.keywords.join(', ');
  }, [campaign]);

  const keywordsTextForCopy = useMemo(() => {
    if (!campaign?.keywords?.length) return '';
    return campaign.keywords.map((keyword) => `#${keyword}`).join(' ');
  }, [campaign]);

  const handleCopyKeywords = useCallback(async () => {
    if (!keywordsTextForCopy) {
      return;
    }

    try {
      await navigator.clipboard.writeText(keywordsTextForCopy);
      toast.success('키워드가 복사되었어요');
    } catch (error) {
      console.error('복사 실패:', error);
      toast.error('키워드 복사에 실패했어요');
    }
  }, [keywordsTextForCopy]);

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
    <div
      className={`${styles.Page} ${
        isSelectedWithoutReservation ? styles['Page--reservation-pending'] : ''
      }`}
    >
      <CampaignCTA campaign={campaign} />
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

      {campaign.status !== 'completed' && campaign.status !== 'closed' && (
        <CampaignScheduleSection campaign={campaign} />
      )}

      <BulletListSection title="당첨 조건" items={campaign.requirements || []} />

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

      {campaign.address && <AddressMap placeName={campaign.brand} address={campaign.address} />}

      {/* 리뷰 미션 */}
      {campaign.status !== 'completed' &&
        campaign.status !== 'closed' &&
        campaign.reviewMission &&
        campaign.reviewMission.length > 0 && (
          <>
            <BulletListSection
              title="후기 미션 안내"
              items={campaign.reviewMission}
              showDivider={false}
            />

            {/* 후기 미션 안내 추가 안내사항 */}
            {campaign.reviewMissionNotice && (
              <CampaignAdditionalNotice content={campaign.reviewMissionNotice} />
            )}
          </>
        )}

      {/* 키워드 */}
      {campaign.status !== 'completed' && campaign.status !== 'closed' && keywordsText && (
        <div className={styles.Page__KeywordsSection}>
          <WebButton
            buttonType="copy"
            label="키워드"
            text={keywordsText}
            onClick={handleCopyKeywords}
          />
        </div>
      )}

      {/* 체험 시 주의사항 */}
      {campaign.status !== 'completed' &&
        campaign.status !== 'closed' &&
        campaign.precautions &&
        campaign.precautions.length > 0 && (
          <BulletListSection
            title="체험 시 주의사항"
            items={campaign.precautions}
            backgroundColor="var(--color-gray-50)"
            noPadding={true}
            textColor="var(--color-gray-800)"
            showDivider={false}
          />
        )}
    </div>
  );
}
