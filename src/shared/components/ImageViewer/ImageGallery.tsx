'use client';

import { useRouter } from 'next/navigation';

import styles from './ImageGallery.module.scss';

/**
 * 이미지 갤러리 컴포넌트
 * - 2x2 그리드 레이아웃으로 이미지 표시
 * - 이미지 클릭 시 해당 이미지부터 ImageViewer 열기
 * - 마지막 이미지에 전체보기 버튼 (4장 초과 시 노출)
 * - 전체보기 버튼 클릭 시 전체 이미지 목록 페이지로 이동
 */

export interface ImageGalleryProps {
  images: string[];
  maxDisplay?: number; // 그리드에 표시할 최대 이미지 수 (기본값: 4)
  galleryPath?: string; // 전체 이미지 목록 페이지 경로 (기본값: '/image-viewer-test/gallery')
  viewerPath?: string; // 개별 이미지 뷰어 페이지 경로 (기본값: '/image-viewer-test/view')
}

export function ImageGallery({
  images,
  maxDisplay = 4,
  galleryPath = '/image-viewer-test/gallery',
  viewerPath = '/image-viewer-test/view',
}: ImageGalleryProps) {
  const router = useRouter();

  if (images.length === 0) {
    return null;
  }

  // 그리드에 표시할 이미지 (최대 maxDisplay개)
  const displayImages = images.slice(0, maxDisplay);
  const hasMoreImages = images.length > maxDisplay;

  const handleImageClick = (index: number) => {
    // 개별 이미지 뷰어 페이지로 이동
    const imagesParam = encodeURIComponent(JSON.stringify(images));
    router.push(`${viewerPath}/${index}?images=${imagesParam}`);
  };

  const handleViewAllClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // 전체 이미지 목록 페이지로 이동
    const imagesParam = encodeURIComponent(JSON.stringify(images));
    router.push(`${galleryPath}?images=${imagesParam}`);
  };

  return (
    <div className={styles.ImageGallery}>
      {displayImages.map((image, index) => {
        const isLastImage = index === displayImages.length - 1;
        const showViewAllButton = isLastImage && hasMoreImages;

        return (
          <div key={index} className={styles.ImageItem} onClick={() => handleImageClick(index)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={`이미지 ${index + 1}`} className={styles.Image} />
            {/* 전체보기 버튼 (마지막 이미지 오른쪽 아래) */}
            {showViewAllButton && (
              <button
                className={styles.ViewAllButton}
                onClick={handleViewAllClick}
                aria-label="전체 이미지 보기"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="3"
                    width="8"
                    height="8"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="9"
                    y="9"
                    width="8"
                    height="8"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
