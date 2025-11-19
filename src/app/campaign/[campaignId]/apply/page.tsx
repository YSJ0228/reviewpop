'use client';

import { Suspense, useState } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';

import styles from './page.module.scss';
import { LabeledInput } from '@shared/components/LabeledInput';
import { WebButton } from '@shared/components/WebButton';
import { CampaignApplyCard } from '@features/campaign/components/CampaignApplyCard';

/**
 * 캠페인 신청 페이지
 * - 하단 탭: X
 * - 캠페인 신청 폼
 *
 * TODO:
 * 1. [ ] ApplyForm 컴포넌트 구현 (@features/campaign/components/ApplyForm)
 * 2. [ ] 폼 validation 추가 (필수 항목 체크)
 * 3. [ ] 신청 API 연동 (useApplyCampaign 훅)
 * 4. [ ] 신청 완료 시 /campaign/[id]/apply/complete로 리다이렉트
 * 5. [ ] 에러 처리 (이미 신청한 경우, 마감된 경우 등)
 */
export default function CampaignApplyPage({ params }: { params: { campaignId: string } }) {
  const [text, setText] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [buttonType, setButtonType] = useState<'connect' | 'edit'>('connect');
  const [isBottomSheet, setIsBottomSheet] = useState<boolean>(false);
  return (
    <main className={styles.CampaignApplyPage}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          {/* TODO: ApplyForm 컴포넌트 추가 */}
          <CampaignApplyCard
            brand="그라운드 220"
            size="sm"
            providedItems={['티셔츠 2개 제작 체험', '하이볼 2잔 무료 체험']}
          />
          <div className={styles.CampaignApplyPage__ApplyForm}>
            <WebButton
              label="네이버 블로그 주소"
              buttonType={buttonType}
              onClick={() => setIsBottomSheet(true)}
            />
            <LabeledInput
              label="이름"
              text={text}
              setText={setText}
              inputType="name"
              placeholder="이름을 입력해주세요"
            />
            <LabeledInput
              label="전화번호"
              text={phone}
              setText={setPhone}
              isButton={true}
              isText={true}
              inputType="url"
              placeholder="01012345678"
            />
          </div>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
