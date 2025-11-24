'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { PageHeader } from '@shared/components/PageHeader';

import styles from './page.module.scss';

/**
 * 전체 이미지 목록 페이지
 * - 전체보기 버튼 클릭 시 이동
 * - 모든 이미지를 그리드로 표시
 * - 이미지 클릭 시 개별 이미지 뷰어 페이지로 이동
 */
export default function ImageGalleryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 쿼리 파라미터에서 이미지 URL 배열 가져오기
  const images = useMemo(() => {
    const imagesParam = searchParams.get('images');
    if (imagesParam) {
      try {
        const decoded = decodeURIComponent(imagesParam);
        return JSON.parse(decoded) as string[];
      } catch (error) {
        console.error('Failed to parse images:', error);
        return [];
      }
    }
    return [];
  }, [searchParams]);

  const handleImageClick = (index: number) => {
    // 개별 이미지 뷰어 페이지로 이동
    const imagesParam = encodeURIComponent(JSON.stringify(images));
    router.push(`/image-viewer-test/view/${index}?images=${imagesParam}`);
  };

  if (images.length === 0) {
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
      <main className={styles.GalleryPage}>
        <div className={styles.GalleryGrid}>
          {images.map((image, index) => (
            <div key={index} className={styles.GalleryItem} onClick={() => handleImageClick(index)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={`이미지 ${index + 1}`} className={styles.GalleryImage} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
