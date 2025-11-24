'use client';

import { use, useState, useMemo } from 'react';

import { PageHeader } from '@shared/components/PageHeader';
import { ImageViewer } from '@shared/components/ImageViewer';
import { useCampaignDetails } from '@entities/campaign/hooks/useCampaignDetails';

import styles from './page.module.scss';

/**
 * 체험 이미지 목록 페이지
 * - 체험의 전체 이미지 목록을 그리드로 표시
 * - 이미지 클릭 시 전체화면 모달 뷰어 표시
 */
interface CampaignImagesPageProps {
  params: Promise<{
    campaignId: string;
  }>;
}

export default function CampaignImagesPage({ params }: CampaignImagesPageProps) {
  const { campaignId } = use(params);
  const { data: campaign, isLoading, error } = useCampaignDetails(campaignId);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const images = useMemo(() => {
    if (!campaign) return [];
    if (campaign.imageUrls && campaign.imageUrls.length > 0) {
      return campaign.imageUrls;
    }
    if (campaign.imageUrl) {
      return [campaign.imageUrl];
    }
    return [];
  }, [campaign]);

  const handleImageClick = (index: number) => {
    setViewerIndex(index);
  };

  const handleCloseViewer = () => {
    setViewerIndex(null);
  };

  if (isLoading) {
    return (
      <div>
        <PageHeader showBackButton />
        <div className={styles.Loading}>
          <p>이미지를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !campaign || images.length === 0) {
    return (
      <div>
        <PageHeader showBackButton />
        <div className={styles.Empty}>
          <p>이미지를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader showBackButton />
      <main className={styles.CampaignImagesPage}>
        <div className={styles.GalleryGrid}>
          {images.map((image, index) => (
            <div key={index} className={styles.GalleryItem} onClick={() => handleImageClick(index)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={`${campaign.title} 이미지 ${index + 1}`}
                className={styles.GalleryImage}
              />
            </div>
          ))}
        </div>
      </main>

      {viewerIndex !== null && (
        <ImageViewer
          images={images}
          initialIndex={viewerIndex}
          isOpen={true}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  );
}
