'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';

import { EmptyState } from '@shared/components';
import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { CampaignTab } from '@features/campaign/components/CampaignTab';
import {
  BeforeRecruitingCampaignList,
  RecruitingCampaignList,
  CompletedCampaignList,
} from '@features/campaign';

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
  const SCROLL_ANIMATION_DURATION = 500;

  const filteredCampaigns = useMemo(
    () => ({
      recruiting: filterCampaignsByStatus(campaigns, 'recruiting'),
      before_recruiting: filterCampaignsByStatus(campaigns, 'before_recruiting'),
      completed: filterCampaignsByStatus(campaigns, 'completed'),
    }),
    [campaigns],
  );

  const campaignExists = {
    recruiting: filteredCampaigns.recruiting.length > 0,
    before_recruiting: filteredCampaigns.before_recruiting.length > 0,
    completed: filteredCampaigns.completed.length > 0,
  };

  const handleScroll = (status: CampaignTabKey) => {
    isScrolling.current = true;
    setActiveTab(status);
    setTimeout(() => {
      isScrolling.current = false;
    }, SCROLL_ANIMATION_DURATION);
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

    const refs = [recruitingRef.current, beforeRecruitingRef.current, completedRef.current];
    refs.forEach((ref) => ref && observer.observe(ref));

    return () => {
      refs.forEach((ref) => ref && observer.unobserve(ref));
      observer.disconnect();
    };
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
            <section
              ref={recruitingRef}
              id="recruiting"
              className={styles.ScrollSection}
              data-observer-id="recruiting"
            >
              {filteredCampaigns.recruiting.length === 0 ? (
                <EmptyState variant="no-opened" />
              ) : (
                <RecruitingCampaignList filteredCampaigns={filteredCampaigns.recruiting} />
              )}
            </section>

            {filteredCampaigns.before_recruiting.length !== 0 && (
              <section
                ref={beforeRecruitingRef}
                id="before_recruiting"
                className={styles.ScrollSection}
                data-observer-id="before_recruiting"
              >
                <BeforeRecruitingCampaignList
                  filteredCampaigns={filteredCampaigns.before_recruiting}
                />
              </section>
            )}
            {filteredCampaigns.completed.length !== 0 && (
              <section
                ref={completedRef}
                id="completed"
                className={styles.ScrollSection}
                data-observer-id="completed"
              >
                <CompletedCampaignList filteredCampaigns={filteredCampaigns.completed} />
              </section>
            )}
          </div>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
