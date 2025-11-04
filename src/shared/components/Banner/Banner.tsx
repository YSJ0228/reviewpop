'use client';

import styles from './Banner.module.scss';

/**
 * 배너 컴포넌트
 *
 * TODO:
 * 1. [ ] 배너 이미지 슬라이더 구현 (Swiper 사용)
 * 2. [ ] 자동 재생 기능
 * 3. [ ] 배너 클릭 시 링크 이동
 * 4. [ ] 인디케이터 (점) 표시
 */

interface BannerItem {
  id: string;
  imageUrl: string;
  linkUrl?: string;
  alt: string;
}

interface BannerProps {
  items: BannerItem[];
  autoplay?: boolean;
  interval?: number; // ms
}

export function Banner({ items, autoplay = true, interval = 3000 }: BannerProps) {
  // TODO: Swiper 라이브러리를 사용하여 배너 슬라이더 구현

  return (
    <div className={styles.Banner}>
      <div className={styles.Placeholder}>
        <p>배너 컴포넌트</p>
        <p className={styles.Todo}>Swiper를 사용하여 배너 슬라이더를 구현하세요</p>
      </div>
    </div>
  );
}
