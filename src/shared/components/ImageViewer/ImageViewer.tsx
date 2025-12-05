'use client';

import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Zoom, Navigation } from 'swiper/modules';
import { IconClose } from '@pop-ui/foundation';

import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';

import styles from './ImageViewer.module.scss';

/**
 * 이미지 뷰어 모달 (전체화면)
 *
 * 기능:
 * - Swiper를 사용한 이미지 슬라이더
 * - 줌 인/아웃 기능 (더블 탭 또는 핀치 제스처)
 * - 좌우 화살표 네비게이션
 * - 이미지 카운터 표시 (1/10 등)
 * - ESC 키로 닫기
 * - 배경 클릭 시 닫기
 * - 닫기 버튼
 */

interface ImageViewerProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageViewer({ images, initialIndex = 0, isOpen, onClose }: ImageViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(initialIndex);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const prevIsOpenRef = useRef(isOpen);

  // ESC 키 이벤트 처리
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // 스크롤 잠금 처리 (모달이 닫힐 때 및 컴포넌트 언마운트 시 복원)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // cleanup: 컴포넌트 언마운트 시 스크롤 복원 (페이지 이동 시에도 동작)
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 모달이 다시 열릴 때 currentSlide를 initialIndex로 초기화 (카운터 즉시 표시)
  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      setCurrentSlide(initialIndex);
    }
    prevIsOpenRef.current = isOpen;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Swiper 인스턴스가 변경되거나 initialIndex가 변경될 때 슬라이드 이동
  useEffect(() => {
    if (swiperInstance && isOpen) {
      swiperInstance.slideTo(initialIndex, 0);
    }
  }, [swiperInstance, initialIndex, isOpen]);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.activeIndex);
  };

  if (!isOpen || images.length === 0) return null;

  return (
    <div className={styles.ImageViewer}>
      <div className={styles.Overlay} onClick={onClose} />

      <div className={styles.Header}>
        <div className={styles.Counter}>
          {currentSlide + 1} / {images.length}
        </div>

        <button className={styles.CloseButton} onClick={onClose} aria-label="닫기">
          <IconClose />
        </button>
      </div>

      <div className={styles.ImageContainer}>
        <Swiper
          modules={[Zoom, Navigation]}
          zoom={{
            maxRatio: 3,
            minRatio: 1,
          }}
          navigation={true}
          initialSlide={initialIndex}
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          className={styles.Swiper}
          spaceBetween={0}
          slidesPerView={1}
          allowTouchMove={true}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className={styles.Slide}>
              <div className="swiper-zoom-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  className={styles.Image}
                  alt={`이미지 ${index + 1}`}
                  draggable={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
