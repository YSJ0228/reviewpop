'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IconCopy } from '@pop-ui/foundation';

import styles from './ImageGallery.module.scss';

/**
 * 이미지 갤러리 컴포넌트
 * - 2x2 그리드 레이아웃으로 이미지 표시
 * - 이미지 클릭 시 해당 이미지부터 ImageViewer 열기
 * - 마지막 이미지에 전체보기 버튼 (4장 초과 시 노출)
 * - 전체보기 버튼 클릭 시 전체 이미지 목록 페이지로 이동
 *
 * 사용 모드:
 * - 모달 모드: onImageClick 콜백이 제공되면 모달 방식으로 작동
 * - 라우팅 모드: onImageClick이 없으면 기존처럼 라우팅 방식으로 작동
 */

export interface ImageGalleryProps {
  images: string[];
  maxDisplay?: number; // 그리드에 표시할 최대 이미지 수 (기본값: 4)
  galleryPath?: string; // 전체 이미지 목록 페이지 경로 (라우팅 모드용)
  viewerPath?: string; // 개별 이미지 뷰어 페이지 경로 (라우팅 모드용)
  onImageClick?: (index: number) => void; // 모달 모드: 이미지 클릭 핸들러
  onViewAllClick?: () => void; // 모달 모드: 전체보기 버튼 클릭 핸들러
}

export function ImageGallery({
  images,
  maxDisplay = 4,
  galleryPath,
  viewerPath,
  onImageClick,
  onViewAllClick,
}: ImageGalleryProps) {
  const router = useRouter();

  const displayImages = images.length > 0 ? images.slice(0, maxDisplay) : [];
  const hasMoreImages = images.length > maxDisplay;

  // 항상 maxDisplay개의 슬롯을 표시 (이미지가 없어도 빈 슬롯으로 표시)
  const slots = Array.from({ length: maxDisplay }, (_, index) => {
    return displayImages[index] || null;
  });

  const handleImageClick = (index: number) => {
    if (onImageClick) {
      onImageClick(index);
    } else if (viewerPath) {
      const imagesParam = encodeURIComponent(JSON.stringify(images));
      router.push(`${viewerPath}/${index}?images=${imagesParam}`);
    }
  };

  const handleViewAllClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewAllClick) {
      onViewAllClick();
    } else if (galleryPath) {
      const imagesParam = encodeURIComponent(JSON.stringify(images));
      router.push(`${galleryPath}?images=${imagesParam}`);
    }
  };

  return (
    <div className={styles.ImageGallery}>
      {slots.map((image, index) => {
        const isLastImage = index === displayImages.length - 1;
        const showViewAllButton = isLastImage && hasMoreImages;
        const isEmpty = image === null;

        return (
          <div
            key={index}
            className={`${styles.ImageItem} ${isEmpty ? styles['ImageItem--empty'] : ''}`}
            onClick={!isEmpty ? () => handleImageClick(index) : undefined}
          >
            {image ? (
              <>
                <Image
                  src={image}
                  alt={`이미지 ${index + 1}`}
                  fill
                  className={styles.Image}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={90}
                />
                {showViewAllButton && (
                  <button
                    className={styles.ViewAllButton}
                    onClick={handleViewAllClick}
                    aria-label="전체 이미지 보기"
                  >
                    <IconCopy size={20} />
                  </button>
                )}
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
