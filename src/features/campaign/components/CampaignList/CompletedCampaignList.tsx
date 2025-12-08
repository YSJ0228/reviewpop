import { useEffect, useRef } from 'react';

import { CompletedCard } from '../CampaignCard/CompletedCard';
import { InfiniteCampaignListProps } from './types';

import styles from './style.module.scss';

export function CompletedCampaignList({
  data,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Omit<InfiniteCampaignListProps, 'error'>) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const campaigns = data?.pages.flatMap((page) => page.content) || [];

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (campaigns.length === 0) {
    return null; // 데이터가 없으면 렌더링 X
  }
  return (
    <div className={styles.CampaignList} role="feed" aria-label="마감된 체험 목록">
      {campaigns.map((campaign) => (
        <CompletedCard key={campaign.id} campaign={campaign} />
      ))}
      <div ref={observerRef} style={{ height: '20px', background: 'transparent' }} />
      {isFetchingNextPage && <div>추가 로딩 중...</div>}
    </div>
  );
}
