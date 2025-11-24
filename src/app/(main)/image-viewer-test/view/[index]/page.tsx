'use client';

import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useMemo } from 'react';

import { ImageViewer } from '@shared/components/ImageViewer';

/**
 * 개별 이미지 뷰어 페이지
 * - 전체 이미지 목록에서 이미지 클릭 시 이동
 * - ImageViewer 컴포넌트를 페이지로 표시
 */
export default function ImageViewPage() {
  const router = useRouter();
  const params = useParams();
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

  // URL에서 인덱스 가져오기
  const currentIndex = useMemo(() => {
    const index = parseInt(params.index as string, 10);
    return !isNaN(index) ? index : 0;
  }, [params.index]);

  const handleClose = () => {
    // 전체 이미지 목록 페이지로 돌아가기
    const imagesParam = encodeURIComponent(JSON.stringify(images));
    router.push(`/image-viewer-test/gallery?images=${imagesParam}`);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <ImageViewer images={images} initialIndex={currentIndex} isOpen={true} onClose={handleClose} />
  );
}
