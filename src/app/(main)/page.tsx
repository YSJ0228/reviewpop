'use client';

import { Suspense, useEffect, useRef, useState } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { CampaignTab } from '@features/campaign/components/CampaignTab';
import { CampaignList } from '@features/campaign';

import { filterCampaignsByStatus, useCampaigns } from '@entities/campaign/hooks/useCampaigns';
import { CampaignTabKey } from '@entities/campaign/types/campaign.types';

import styles from './page.module.scss';

export default function Home() {
  const [activeTab, setActiveTab] = useState<CampaignTabKey>('recruiting');
  const { data: campaigns, isLoading, error } = useCampaigns();
  const isScrolling = useRef(false);
  const recruitingRef = useRef<HTMLDivElement>(null);
  const beforeRecruitingRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef<HTMLDivElement>(null);

  const filteredCampaigns = {
    recruiting: filterCampaignsByStatus(campaigns, 'recruiting'),
    before_recruiting: filterCampaignsByStatus(campaigns, 'before_recruiting'),
    completed: filterCampaignsByStatus(campaigns, 'completed'),
  };

  const campaignExists = {
    recruiting: filterCampaignsByStatus(campaigns, 'recruiting').length > 0,
    before_recruiting: filterCampaignsByStatus(campaigns, 'before_recruiting').length > 0,
    completed: filterCampaignsByStatus(campaigns, 'completed').length > 0,
  };

  const handleScroll = (status: CampaignTabKey) => {
    isScrolling.current = true;
    setActiveTab(status);
    setTimeout(() => {
      isScrolling.current = false;
    }, 500);
    if (status === 'recruiting')
      recruitingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (status === 'before_recruiting')
      beforeRecruitingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (status === 'completed')
      completedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isScrolling.current) {
            if (entry.target === recruitingRef.current) setActiveTab('recruiting');
            if (entry.target === beforeRecruitingRef.current) setActiveTab('before_recruiting');
            if (entry.target === completedRef.current) setActiveTab('completed');
          }
        });
      },
      {
        rootMargin: '-100px 0px -55% 0px',
        threshold: 0,
      },
    );

    if (recruitingRef.current) observer.observe(recruitingRef.current);
    if (beforeRecruitingRef.current) observer.observe(beforeRecruitingRef.current);
    if (completedRef.current) observer.observe(completedRef.current);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div
        className={styles['CampaignList--Loading']}
        role="status"
        aria-live="polite"
        aria-label="체험 목록 로딩 중"
      >
        <div className={styles.CampaignList__Spinner} />
        <span>로딩 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['CampaignList--Error']} role="alert" aria-live="assertive">
        <p>데이터를 불러오는데 실패했습니다.</p>
        <p className={styles.CampaignList__ErrorMessage}>
          {error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}
        </p>
      </div>
    );
  }

  return (
    <main className={styles.HomeContainer}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          <CampaignTab
            selectedTab={activeTab}
            onTabClick={handleScroll}
            campaignExists={campaignExists}
          />
          <div className={styles.ListContainer}>
            <div ref={recruitingRef} className={styles.ScrollSection}>
              <CampaignList status="recruiting" filteredCampaigns={filteredCampaigns.recruiting} />
            </div>
            {campaignExists.before_recruiting && (
              <div ref={beforeRecruitingRef} className={styles.ScrollSection}>
                <CampaignList
                  status="before_recruiting"
                  filteredCampaigns={filteredCampaigns.before_recruiting}
                />
              </div>
            )}
            {campaignExists.completed && (
              <div ref={completedRef} className={styles.ScrollSection}>
                <CampaignList status="completed" filteredCampaigns={filteredCampaigns.completed} />
              </div>
            )}
          </div>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
