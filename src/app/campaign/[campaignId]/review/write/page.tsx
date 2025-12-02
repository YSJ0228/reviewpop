'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { usePageHeader } from '@shared/hooks/usePageHeader';
import { ReviewForm } from '@features/review/components/ReviewForm';
import styles from './page.module.scss';

/**
 * 체험 후기 작성 페이지
 * - 하단 탭: X
 * - 체험 완료 후 후기 작성
 * - 진입점: 나의 체험 > 선정된 체험 > 후기 작성 버튼
 *
 * TODO:
 * 1. [ ] ReviewForm 컴포넌트 구현 (@features/review/components/ReviewForm)
 * 2. [ ] 텍스트 입력 (제목, 내용)
 * 3. [ ] 이미지 업로드 기능
 * 4. [ ] 별점 입력 기능
 * 5. [ ] 후기 제출 API 연동 (useSubmitReview 훅)
 * 6. [ ] 제출 완료 시 나의 체험 또는 체험 상세로 이동
 */
export default function ReviewWritePage({ params }: { params: { campaignId: string } }) {
  usePageHeader({
    showBackButton: true,
    title: '체험 후기 등록',
    showXButton: false,
    isVisible: true,
  });

  return (
    <main className={styles.ReviewWritePage}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          <ReviewForm />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
