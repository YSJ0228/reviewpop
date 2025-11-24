# ImageViewer (이미지 뷰어)

## 📌 컴포넌트 설명

전체화면 이미지 뷰어 모달 컴포넌트입니다.

이미지 목록을 슬라이드 형태로 보여주며, 줌 인/아웃 기능을 제공합니다.

## 🎯 주요 기능

- 전체화면 모달
- 이미지 슬라이더 (Swiper 사용)
- 줌 인/아웃 기능
- 이미지 카운터 표시 (예: 1/10)
- ESC 키로 닫기
- 배경 클릭 시 닫기
- 닫기 버튼

## 🔧 사용 예시

### 기본 사용법

```typescript
import { useState } from 'react';
import { ImageViewer } from '@shared/components/ImageViewer';

function ImageGallery() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/images/photo1.jpg',
    '/images/photo2.jpg',
    '/images/photo3.jpg',
  ];

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsViewerOpen(true);
  };

  return (
    <div>
      {/* 이미지 그리드 */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          onClick={() => handleImageClick(index)}
          style={{ cursor: 'pointer' }}
        />
      ))}

      {/* 이미지 뷰어 모달 */}
      <ImageViewer
        images={images}
        initialIndex={currentIndex}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </div>
  );
}
```

## 📝 Props

```typescript
interface ImageViewerProps {
  images: string[]; // 이미지 URL 배열
  initialIndex?: number; // 시작 인덱스 (기본값: 0)
  isOpen: boolean; // 모달 열림 상태
  onClose: () => void; // 닫기 핸들러
}
```

## ✅ 구현 체크리스트

- [x] 전체화면 모달 구조
- [x] ESC 키로 닫기
- [x] 배경 클릭 시 닫기
- [x] 닫기 버튼
- [x] Swiper 이미지 슬라이더 구현
- [x] 좌우 화살표 버튼
- [x] 이미지 카운터 (1/10 형식)
- [x] 줌 인/아웃 기능
- [x] 터치 제스처 (좌우 스와이프)
- [ ] 로딩 상태 표시 (선택적)

## 💡 구현 팁

### Swiper 줌 기능 사용

```typescript
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';

<Swiper
  modules={[Zoom, Navigation]}
  zoom={true}
  navigation={true}
  initialSlide={initialIndex}
>
  {images.map((image, index) => (
    <SwiperSlide key={index}>
      <div className="swiper-zoom-container">
        <img src={image} alt={`이미지 ${index + 1}`} />
      </div>
    </SwiperSlide>
  ))}
</Swiper>
```

### 이미지 카운터 구현

```typescript
const [currentSlide, setCurrentSlide] = useState(initialIndex);

<Swiper
  onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
>
  {/* ... */}
</Swiper>

<div className={styles.counter}>
  {currentSlide + 1} / {images.length}
</div>
```

## 🎨 디자인 가이드

- 배경: 검은색 반투명 (opacity: 0.9)
- 닫기 버튼: 우측 상단, 흰색
- 이미지 카운터: 하단 중앙, 흰색 텍스트
- 화살표: 좌우 여백, 흰색
- 줌: 더블 탭 또는 핀치 제스처

## 📱 모바일 최적화

- 터치 제스처 지원 (스와이프, 핀치 줌)
- 전체화면 시 스크롤 방지
- 안전 영역 고려 (safe-area-inset)

## 🔗 사용 위치

- 캠페인 이미지 목록 (`/campaign/[id]/images`)
- 캠페인 상세 페이지 (`/campaign/[id]`)
- 후기 이미지 (선택적)
