# Banner (배너)

## 📌 컴포넌트 설명

홈 화면에서 사용되는 배너 슬라이더 컴포넌트입니다.

여러 배너 이미지를 자동으로 슬라이드하며, 클릭 시 지정된 링크로 이동합니다.

## 🎯 주요 기능

- 배너 이미지 슬라이더 (Swiper 사용)
- 자동 재생 기능
- 배너 클릭 시 링크 이동
- 인디케이터 (점) 표시

## 🔧 사용 예시

### 기본 사용법

```typescript
import { Banner } from '@shared/components/Banner';

const banners = [
  {
    id: '1',
    imageUrl: '/images/banner1.jpg',
    linkUrl: '/campaign/123',
    alt: '첫 번째 배너',
  },
  {
    id: '2',
    imageUrl: '/images/banner2.jpg',
    linkUrl: '/campaign/456',
    alt: '두 번째 배너',
  },
];

function HomePage() {
  return (
    <div>
      <Banner items={banners} />
    </div>
  );
}
```

### 자동 재생 비활성화

```typescript
<Banner items={banners} autoplay={false} />
```

### 재생 간격 변경

```typescript
// 5초마다 슬라이드 (기본값: 3000ms)
<Banner items={banners} interval={5000} />
```

## 📝 Props

```typescript
interface BannerItem {
  id: string;
  imageUrl: string;
  linkUrl?: string; // 선택적
  alt: string;
}

interface BannerProps {
  items: BannerItem[];
  autoplay?: boolean; // 기본값: true
  interval?: number; // 기본값: 3000 (ms)
}
```

## ✅ 구현 체크리스트

- [ ] Swiper 라이브러리 설치 및 설정
- [ ] 배너 이미지 슬라이더 구현
- [ ] 자동 재생 기능
- [ ] 인디케이터 (점) 표시
- [ ] 배너 클릭 시 링크 이동 (Next.js Link 사용)
- [ ] 반응형 디자인 (모바일 최적화)
- [ ] 로딩 상태 처리
- [ ] 이미지 최적화 (Next.js Image 컴포넌트 사용 고려)

## 💡 구현 팁

### Swiper 설치

```bash
yarn add swiper
```

### Swiper 기본 사용법

```typescript
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

<Swiper
  modules={[Autoplay, Pagination]}
  autoplay={{ delay: interval }}
  pagination={{ clickable: true }}
>
  {items.map((item) => (
    <SwiperSlide key={item.id}>
      <img src={item.imageUrl} alt={item.alt} />
    </SwiperSlide>
  ))}
</Swiper>
```

## 🎨 디자인 가이드

- 배너 높이: 모바일 기준 200px 권장
- 인디케이터 위치: 하단 중앙
- 이미지 비율: 16:9 또는 2:1
- 터치 제스처: 좌우 스와이프 지원

## 🔗 관련 페이지

- 홈 (`/`) - 배너 표시
