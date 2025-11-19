'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';

import styles from './page.module.scss';

/**
 * 체험 이미지 목록 페이지
 * - 하단 탭: X
 * - 체험의 전체 이미지 목록 표시
 * - 이미지 클릭 시 전체화면 모달 뷰어 표시
 *
 * TODO:
 * 1. [ ] ImageGallery 컴포넌트 구현 (@features/campaign/components/ImageGallery)
 * 2. [ ] ImageViewer 모달 연동 (@shared/components/ImageViewer)
 * 3. [ ] 체험 이미지 API 연동
 * 4. [ ] Swiper를 사용한 이미지 뷰어 구현
 */
export default function CampaignImagesPage({ params }: { params: { campaignId: string } }) {
  return (
    <main className={styles.CampaignImagesPage}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          {/* TODO: ImageGallery 컴포넌트 추가 */}
          <div className={styles.Placeholder}>
            <p>체험 ID: {params.campaignId}</p>
            <p>전체 이미지 목록</p>
            <p className={styles.Todo}>
              features/campaign/components/ImageGallery 컴포넌트를 구현하세요
            </p>
          </div>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
