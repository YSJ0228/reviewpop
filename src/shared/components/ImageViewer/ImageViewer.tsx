'use client';

import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Zoom, Navigation } from 'swiper/modules';

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

  // 모달이 닫혔다가 다시 열릴 때 currentSlide를 initialIndex로 초기화
  // 모달이 열릴 때 즉시 카운터를 표시하기 위해 필요
  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      // 모달이 열릴 때만 초기화하므로 성능 영향 최소화
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

  // 슬라이드 변경 핸들러
  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.activeIndex);
  };

  if (!isOpen || images.length === 0) return null;

  return (
    <div className={styles.ImageViewer}>
      {/* 배경 오버레이 */}
      <div className={styles.Overlay} onClick={onClose} />

      {/* 헤더 */}
      <div className={styles.Header}>
        {/* 이미지 카운터 */}
        <div className={styles.Counter}>
          {currentSlide + 1} / {images.length}
        </div>

        {/* 닫기 버튼 */}
        <button className={styles.CloseButton} onClick={onClose} aria-label="닫기">
          ✕
        </button>
      </div>

      {/* 이미지 컨테이너 */}
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
                  alt={`이미지 ${index + 1}`}
                  className={styles.Image}
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
