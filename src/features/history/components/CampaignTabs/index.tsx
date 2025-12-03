'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

import { IconChevronRight, IconWarningCircle } from '@pop-ui/foundation';

import { EmptyState } from '@shared/components';
import { ROUTES } from '@shared/config/routes';

import { useMyCampaigns, filterCampaignsByStatus } from '@entities/history/hooks/useMyCampaigns';
import { useUserInfo } from '@entities/user/hooks/useUserInfo';
import { TAB_CONFIG, STATUS_EMPTY_MAP, HISTORY_MESSAGES } from '@features/history/constants';

import type { TabKey } from '@features/history/constants';

import { CampaignList } from '../CampaignList';

import styles from './style.module.scss';

export function CampaignTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // 캠페인 목록 훅에서 데이터를 가져와 탭별 카운트 계산
  const { data: userInfo } = useUserInfo();
  const { data: campaigns } = useMyCampaigns(userInfo?.id || '');

  const counts = useMemo(() => {
    const map: Record<TabKey, number> = {} as Record<TabKey, number>;
    TAB_CONFIG.forEach((t) => {
      map[t.key] = filterCampaignsByStatus(campaigns, t.key).length;
    });
    return map;
  }, [campaigns]);

  // '미선정' 상태 카운트 (TAB_CONFIG에 포함되어 있지 않으므로 별도 계산)
  const rejectedCount = useMemo(() => {
    return (campaigns || []).filter((c) => c.status === 'rejected').length;
  }, [campaigns]);

  // 후기 미등록 체험 존재 여부 확인
  const hasUnreviewedClosedCampaigns = useMemo(() => {
    return (campaigns || []).some(
      (c) => c.campaign.status === 'closed' && c.reviewStatus === 'notReviewed',
    );
  }, [campaigns]);

  const currentTab = (searchParams.get('tab') as TabKey) || 'pending';
  const activeIndex = TAB_CONFIG.findIndex((tab) => tab.key === currentTab);
  const validIndex = activeIndex >= 0 ? activeIndex : 0;

  // URL에 탭이 없거나 잘못된 경우 기본값으로 리다이렉트
  useEffect(() => {
    if (!searchParams.get('tab') || activeIndex < 0) {
      router.replace('/my?tab=pending', { scroll: false });
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
        <div className={styles.CampaignTabs__Tabs} role="tablist" aria-label="체험 상태별 탭">
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
                <span aria-hidden="true">{tab.label}</span>
                <span aria-hidden="true">{counts[tab.key] ?? 0}</span>
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
        {TAB_CONFIG.map((tab) => {
          const filteredCampaigns = filterCampaignsByStatus(campaigns, tab.key);
          const isEmpty = filteredCampaigns.length === 0;
          const showWarning = tab.key === 'reviewed' && hasUnreviewedClosedCampaigns;

          return (
            <SwiperSlide key={tab.key} className={styles.CampaignTabs__Slide}>
              <div
                role="tabpanel"
                aria-labelledby={`tab-${tab.key}`}
                id={`panel-${tab.key}`}
                tabIndex={0}
                aria-label={tab.label}
              >
                {/* 경고 메시지 - 탭 상단 */}
                {showWarning && (
                  <div className={styles.CampaignTabs__WarningBanner} role="alert">
                    <IconWarningCircle size={12} color="var(--color-red-500)" />
                    <span>{HISTORY_MESSAGES.UNREGISTERED_REVIEW_WARNING}</span>
                  </div>
                )}

                <CampaignList status={tab.key} />
                <div className={styles.CampaignTabs__LinkContainer}>
                  {tab.key === 'pending' && rejectedCount > 0 && (
                    <Link href={ROUTES.MY_REJECTED} className={styles.CampaignTabs__RejectedLink}>
                      {HISTORY_MESSAGES.REJECTED_HISTORY}
                      <IconChevronRight size={16} color="var(--color-gray-800)" />
                    </Link>
                  )}
                </div>
                {isEmpty && <EmptyState variant={STATUS_EMPTY_MAP[tab.key]} />}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
