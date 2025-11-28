import Link from 'next/link';
import Image from 'next/image';

import { useBlogReviews } from '@features/review/hooks/useBlogReviews';

import type { CampaignCardProps } from './types';

import styles from './style.module.scss';

export function CompletedCard({ campaign }: CampaignCardProps) {
  const { data: blogReviews } = useBlogReviews(campaign.id);

  return (
    <div className={styles.CampaignCard__Container}>
      <Link href={`/campaign/${campaign.id}`} className={styles.CampaignCard__Link}>
        <article className={styles.CampaignCard} aria-label={`${campaign.brand} ${campaign.title}`}>
          <Image
            src={campaign.thumbnail}
            alt={`${campaign.brand} ${campaign.title} 체험 이미지`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.CampaignCard__Badge} aria-label={`상태: ${campaign.location}`}>
            {campaign.location ? `${campaign.location.sido} ${campaign.location.sigungu}` : '전국'}
          </div>
          <div className={styles.CampaignCard__Wrapper}>
            <div className={styles.CampaignCard__Header}>
              <span className={styles.CampaignCard__Brand}>{campaign.brand}</span>
              <h3 className={styles.CampaignCard__Title}>{campaign.title}</h3>
              <p className={styles.CampaignCard__Items}>{campaign.providedItem}</p>
            </div>
            <div className={styles.CampaignCard__Content__Closed}>
              <span>종료된 체험</span>
            </div>
          </div>
        </article>
      </Link>
      {blogReviews.length > 0 && (
        <div className={styles.BlogReviewList}>
          {blogReviews.map((review) => (
            <a
              key={review.id}
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.BlogReviewItem}
            >
              <h4 className={styles.BlogReviewItem__Title}>{review.title}</h4>
              <div className={styles.BlogReviewItem__Content}>
                <span className={styles.BlogReviewItem__Article}>{review.article}</span>
                <div className={styles.BlogReviewItem__Thumbnail}>
                  <Image
                    src={review.thumbnail}
                    alt={review.title}
                    fill
                    sizes="56px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
