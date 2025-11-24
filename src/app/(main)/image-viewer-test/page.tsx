'use client';

import { ImageGallery } from '@shared/components/ImageViewer';

import styles from './page.module.scss';

/**
 * ImageViewer 컴포넌트 테스트 페이지
 * - ImageGallery 컴포넌트를 사용하여 2x2 그리드 레이아웃으로 이미지 표시
 * - 이미지 클릭 시 해당 이미지부터 ImageViewer 열기
 * - 마지막 이미지에 전체보기 버튼 (4장 초과 시 노출)
 *
 * 실제 프로젝트에서 사용하는 이미지 URL 패턴을 사용합니다.
 */
export default function ImageViewerTestPage() {
  // 실제 프로젝트에서 사용하는 이미지 URL 패턴 (캠페인 이미지 예시)
  // mockCampaigns.ts에서 사용하는 패턴과 동일
  const testImages = [
    'https://picsum.photos/seed/campaign1/800/600',
    'https://picsum.photos/seed/campaign1-2/800/600',
    'https://picsum.photos/seed/campaign1-3/800/600',
    'https://picsum.photos/seed/campaign1-4/800/600',
    'https://picsum.photos/seed/campaign1-5/800/600',
    'https://picsum.photos/seed/campaign1-6/800/600',
    'https://picsum.photos/seed/campaign1-7/800/600',
    'https://picsum.photos/seed/campaign1-8/800/600',
  ];

  return (
    <main className={styles.Container}>
      <div className={styles.Header}>
        <h1 className={styles.Title}>ImageViewer 테스트</h1>
        <p className={styles.Description}>이미지를 클릭하면 전체화면 뷰어가 열립니다.</p>
        <p className={styles.Info}>총 {testImages.length}개의 이미지</p>
      </div>

      {/* ImageGallery 컴포넌트 사용 */}
      <ImageGallery images={testImages} />
    </main>
  );
}
