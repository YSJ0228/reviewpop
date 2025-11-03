'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { CampaignList } from '../CampaignList/CampaignList';
import { TAB_CONFIG, STATUS_DESCRIPTIONS } from '../../types/campaign.types';
import type { TabKey } from '../../types/campaign.types';
import styles from './CampaignTabs.module.scss';

// Swiper CSS 임포트
import 'swiper/css';

export function CampaignTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentTab = (searchParams.get('tab') as TabKey) || 'applied';
  const activeIndex = TAB_CONFIG.findIndex((tab) => tab.key === currentTab);
  const validIndex = activeIndex >= 0 ? activeIndex : 0;

  // URL에 탭이 없거나 잘못된 경우 기본값으로 리다이렉트
  useEffect(() => {
    if (!searchParams.get('tab') || activeIndex < 0) {
      router.replace('/my?tab=applied', { scroll: false });
    }
  }, [searchParams, activeIndex, router]);

  // Swiper 인스턴스가 변경될 때 슬라이드 동기화
  useEffect(() => {
    if (swiperInstance && validIndex !== swiperInstance.activeIndex) {
      swiperInstance.slideTo(validIndex, 0); // 0ms로 즉시 이동
    }
  }, [swiperInstance, validIndex]);

  // 탭 클릭 핸들러
  const handleTabClick = (index: number) => {
    swiperInstance?.slideTo(index);
    const newTab = TAB_CONFIG[index].key;
    router.replace(`/my?tab=${newTab}`, { scroll: false });
  };

  // Swiper 슬라이드 변경 핸들러
  const handleSlideChange = (swiper: SwiperType) => {
    const newTab = TAB_CONFIG[swiper.activeIndex].key;
    router.replace(`/my?tab=${newTab}`, { scroll: false });
  };

  // 키보드 네비게이션 핸들러
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = index > 0 ? index - 1 : TAB_CONFIG.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = index < TAB_CONFIG.length - 1 ? index + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = TAB_CONFIG.length - 1;
        break;
      default:
        return;
    }

    handleTabClick(newIndex);
    // 포커스를 새 탭으로 이동
    tabRefs.current[newIndex]?.focus();
  };

  // 탭 인디케이터 바 위치 계산
  const indicatorTransform = `translateX(${validIndex * 100}%)`;

  return (
    <div className={styles.CampaignTabs}>
      {/* 탭 바 (sticky) */}
      <div className={styles.CampaignTabs__TabBar}>
        <div className={styles.CampaignTabs__Tabs} role="tablist" aria-label="캠페인 상태별 탭">
          {TAB_CONFIG.map((tab, index) => {
            const tabClassName = [
              styles.CampaignTabs__Tab,
              validIndex === index ? styles['CampaignTabs__Tab--Active'] : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={tab.key}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                aria-selected={validIndex === index}
                aria-controls={`panel-${tab.key}`}
                id={`tab-${tab.key}`}
                tabIndex={validIndex === index ? 0 : -1}
                onClick={() => handleTabClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={tabClassName}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div
          className={styles.CampaignTabs__Indicator}
          style={{
            transform: indicatorTransform,
            width: `${100 / TAB_CONFIG.length}%`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Swiper 컨텐츠 */}
      <Swiper
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        initialSlide={validIndex}
        spaceBetween={0}
        slidesPerView={1}
        speed={300}
        touchRatio={1}
        threshold={10}
        className={styles.CampaignTabs__Swiper}
        allowTouchMove={true}
      >
        {TAB_CONFIG.map((tab) => (
          <SwiperSlide key={tab.key} className={styles.CampaignTabs__Slide}>
            <div
              role="tabpanel"
              aria-labelledby={`tab-${tab.key}`}
              id={`panel-${tab.key}`}
              tabIndex={0}
              aria-label={STATUS_DESCRIPTIONS[tab.key]}
            >
              <CampaignList status={tab.key} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
