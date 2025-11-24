'use client';

import { Suspense, use, useState } from 'react';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { LabeledInput } from '@shared/components/LabeledInput';
import { WebButton } from '@shared/components/WebButton';
import { CampaignApplyCard } from '@features/campaign/components/CampaignApplyCard';
import { TextArea } from '@features/campaign/components/TextArea';
import { useInputValidate } from '@entities/campaign/hooks/useInputValidate';

import styles from './page.module.scss';
import { useCampaignDetails } from '@features/campaign';
import { useDisclosure } from '@mantine/hooks';
import { BlogBottomSheet } from '@features/campaign/components/BlogBottomSheet';
import { CautionBottomSheet } from '@features/campaign/components/CautionBottomSheet';
import { ButtonBar } from '@features/campaign/components/ButtonBar';

/**
 * 체험 신청 페이지
 * - 하단 탭: X
 * - 체험 신청 폼
 *
 * TODO:
 * 1. [ ] ApplyForm 컴포넌트 구현 (@features/campaign/components/ApplyForm)
 * 2. [ ] 폼 validation 추가 (필수 항목 체크)
 * 3. [ ] 신청 API 연동 (useApplyCampaign 훅)
 * 4. [ ] 신청 완료 시 /campaign/[id]/apply/complete로 리다이렉트
 * 5. [ ] 에러 처리 (이미 신청한 경우, 마감된 경우 등)
 */
interface CampaignApplyPageProps {
  params: Promise<{
    campaignId: string;
  }>;
}

export default function CampaignApplyPage({ params }: CampaignApplyPageProps) {
  const { campaignId } = use(params);
  const { data: campaign } = useCampaignDetails(campaignId);

  const nameInput = useInputValidate('name');
  const phoneInput = useInputValidate('phone');
  const urlInput = useInputValidate('url');
  const [blogAddress, setBlogAddress] = useState<string>('');

  const [blogOpened, { open: blogOpen, close: blogClose }] = useDisclosure();
  const [cautionOpened, { open: cautionOpen, close: cautionClose }] = useDisclosure();

  return (
    <main className={styles.CampaignApplyPage}>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩 중...</div>}>
          {/* TODO: ApplyForm 컴포넌트 추가 */}
          <CampaignApplyCard
            brand={campaign?.brand ?? ''}
            size="sm"
            providedItems={campaign?.providedItems ?? ''}
          />
          <div className={styles.CampaignApplyPage__ApplyForm}>
            <WebButton
              label="네이버 블로그 주소"
              buttonType="connect"
              onClick={blogOpen}
              text={blogAddress}
            />
            <LabeledInput
              label="이름"
              placeholder="이름 입력"
              value={nameInput.value}
              setValue={nameInput.setValue}
              errorMsg={nameInput.error}
            />
            <LabeledInput
              label="전화번호"
              placeholder="01012345678"
              value={phoneInput.value}
              setValue={phoneInput.setValue}
              errorMsg={phoneInput.error}
            />

            <TextArea
              label="전달하고 싶은 한마디(선택)"
              maxTextCount={300}
              text={''}
              setText={() => {}}
              placeholder="체험단에 선정되어야 할 이유가 있다면 알려주세요!"
            />
          </div>
          <ButtonBar
            text="다음"
            variant="primary"
            onClick={cautionOpen}
            disabled={!!urlInput.error || !!nameInput.error || !!phoneInput.error}
          />

          <BlogBottomSheet
            opened={blogOpened}
            onClose={blogClose}
            input={urlInput}
            setBlogAddress={setBlogAddress}
          />
          <CautionBottomSheet opened={cautionOpened} onClose={cautionClose} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
