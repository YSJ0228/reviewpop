'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Loader } from '@mantine/core';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { useInfiniteCampaigns, useCampaigns } from '@entities/campaign/hooks/useCampaigns';
import { CampaignTab } from '@features/campaign/components/CampaignTab';
import {
  BeforeRecruitingCampaignList,
  RecruitingCampaignList,
  CompletedCampaignList,
} from '@features/campaign';

import { CampaignTabKey } from '@entities/campaign/types/campaign.types';

import styles from './page.module.scss';

export default function Home() {
  const [activeTab, setActiveTab] = useState<CampaignTabKey>('recruiting');
  const isScrolling = useRef(false);
  const recruitingRef = useRef<HTMLDivElement>(null);
  const beforeRecruitingRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef<HTMLDivElement>(null);
  const SCROLL_ANIMATION_DURATION = 500;

  const recruitingQuery = useCampaigns({ status: 'recruiting' });
  const beforeRecruitingQuery = useCampaigns({ status: 'beforeRecruiting' });
  const completedQuery = useInfiniteCampaigns({ size: 10, status: 'completed' });

  const handleScroll = (status: CampaignTabKey) => {
    isScrolling.current = true;
    setActiveTab(status);
    setTimeout(() => {
      isScrolling.current = false;
    }, SCROLL_ANIMATION_DURATION);

    if (status === 'recruiting' && recruitingRef.current) {
      recruitingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (status === 'beforeRecruiting' && beforeRecruitingRef.current) {
      beforeRecruitingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (status === 'completed' && completedRef.current) {
      completedRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-observer-id');
            if (id) {
              setActiveTab(id as CampaignTabKey);
            }
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      },
    );

    const refs = [recruitingRef.current, beforeRecruitingRef.current, completedRef.current];
    refs.forEach((ref) => ref && observer.observe(ref));

    return () => {
      refs.forEach((ref) => ref && observer.unobserve(ref));
      observer.disconnect();
    };
  }, []);

  const hasRecruiting = (recruitingQuery.data?.length ?? 0) > 0;
  const hasBeforeRecruiting = (beforeRecruitingQuery.data?.length ?? 0) > 0;
  const hasCompleted = (completedQuery.data?.pages[0]?.content.length ?? 0) > 0;

  return (
    <main className={styles.HomeContainer}>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <CampaignTab
            selectedTab={activeTab}
            onTabClick={handleScroll}
            campaignExists={{
              recruiting: hasRecruiting,
              beforeRecruiting: hasBeforeRecruiting,
              completed: hasCompleted,
            }}
          />
          <div className={styles.ListContainer}>
            <section
              ref={recruitingRef}
              id="recruiting"
              className={styles.ScrollSection}
              data-observer-id="recruiting"
            >
              <RecruitingCampaignList data={recruitingQuery.data} />
            </section>

            <div
              id="beforeRecruiting"
              ref={beforeRecruitingRef}
              className={styles.ScrollSection}
              data-observer-id="beforeRecruiting"
            >
              <BeforeRecruitingCampaignList data={beforeRecruitingQuery.data} />
            </div>

            <section
              ref={completedRef}
              id="completed"
              className={styles.ScrollSection}
              data-observer-id="completed"
            >
              <CompletedCampaignList
                data={completedQuery.data}
                isLoading={completedQuery.isLoading}
                fetchNextPage={completedQuery.fetchNextPage}
                hasNextPage={completedQuery.hasNextPage}
                isFetchingNextPage={completedQuery.isFetchingNextPage}
              />
            </section>
          </div>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
