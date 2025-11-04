'use client';

import { useEffect } from 'react';

import styles from './ImageViewer.module.scss';

/**
 * 이미지 뷰어 모달 (전체화면)
 *
 * TODO:
 * 1. [ ] Swiper를 사용한 이미지 슬라이더 구현
 * 2. [ ] 줌 인/아웃 기능
 * 3. [ ] 닫기 버튼
 * 4. [ ] 이미지 카운터 표시 (1/10 등)
 * 5. [ ] ESC 키로 닫기
 * 6. [ ] 배경 클릭 시 닫기
 */

interface ImageViewerProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageViewer({ images, initialIndex = 0, isOpen, onClose }: ImageViewerProps) {
  // ESC 키 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.ImageViewer}>
      {/* 배경 오버레이 */}
      <div className={styles.Overlay} onClick={onClose} />

      {/* 이미지 뷰어 컨텐츠 */}
      <div className={styles.Content}>
        {/* TODO: Swiper 이미지 슬라이더 구현 */}
        <div className={styles.Placeholder}>
          <p>이미지 뷰어 모달</p>
          <p className={styles.Todo}>Swiper를 사용하여 이미지 뷰어를 구현하세요</p>
          <p className={styles.Todo}>총 {images.length}개 이미지</p>
        </div>

        {/* 닫기 버튼 */}
        <button className={styles.CloseButton} onClick={onClose} aria-label="닫기">
          ✕
        </button>
      </div>
    </div>
  );
}
