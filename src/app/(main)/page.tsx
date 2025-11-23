'use client';

import { Suspense, useEffect, useRef, useState } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { CampaignTab } from '@features/campaign/components/CampaignTab';
import { CampaignList } from '@features/campaign';

import { CampaignTabKey } from '@entities/campaign/types/campaign.types';

import styles from './page.module.scss';

export default function Home() {
  const [activeTab, setActiveTab] = useState<CampaignTabKey>('recruiting');
  const isScrolling = useRef(false);
  const recruitingRef = useRef<HTMLDivElement>(null);
  const beforeRecruitingRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <main className={styles.HomeContainer}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          <CampaignTab selectedTab={activeTab} onTabClick={handleScroll} />
          <div className={styles.ListContainer}>
            <div ref={recruitingRef} className={styles.ScrollSection}>
              <CampaignList status="recruiting" />
            </div>
            <div ref={beforeRecruitingRef} className={styles.ScrollSection}>
              <CampaignList status="before_recruiting" />
            </div>
            <div ref={completedRef} className={styles.ScrollSection}>
              <CampaignList status="completed" />
            </div>
          </div>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
