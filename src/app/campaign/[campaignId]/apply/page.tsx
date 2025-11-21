'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';

import { LabeledInput } from '@shared/components/LabeledInput';
import { WebButton } from '@shared/components/WebButton';
import { CampaignApplyCard } from '@features/campaign/components/CampaignApplyCard';
import { TextArea } from '@features/campaign/components/TextArea';
import { Button } from '@shared/components';
import { useInputValidate } from '@entities/campaign/hooks/useInputValidate';

import styles from './page.module.scss';
import { Drawer } from '@mantine/core';

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
export default function CampaignApplyPage({ params }: { params: { campaignId: string } }) {
  const nameInput = useInputValidate('name');
  const phoneInput = useInputValidate('phone');
  const urlInput = useInputValidate('url');
  const [buttonType, setButtonType] = useState<'connect' | 'edit'>('connect');
  const [isBlogDrawer, setIsBlogDrawer] = useState<boolean>(false);
  const [isCautionDrawer, setIsCautionDrawer] = useState<boolean>(false);

  const [confirmMsg, setConfirmMsg] = useState<string>('');

  const router = useRouter();
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
              onClick={() => setIsBlogDrawer(true)}
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
          <div className={styles.CampaignApplyPage__ButtonBar}>
            <Button variant="primary" onClick={() => setIsCautionDrawer(true)} fullWidth>
              다음
            </Button>
          </div>
          {isBlogDrawer && (
            <Drawer
              opened
              position="bottom"
              radius="xl"
              onClose={() => setIsBlogDrawer(false)}
              styles={{
                content: {
                  maxWidth: 448,
                  width: '100%',
                  margin: '0 auto',
                },
              }}
              title="블로그 아이디를 입력해주세요"
            >
              <LabeledInput
                label="블로그 주소"
                placeholder="네이버 블로그 아이디 입력"
                value={urlInput.value}
                setValue={urlInput.setValue}
                errorMsg={urlInput.error}
                showButton
                showPreview
                confirmMsg={confirmMsg}
                onClick={() => setConfirmMsg('블로그 주소가 확인되었어요')}
              />
              <div className={styles.CampaignApplyPage__ButtonBar}>
                <Button variant="primary" onClick={() => setIsBlogDrawer(true)} fullWidth>
                  저장
                </Button>
              </div>
            </Drawer>
          )}
          {isCautionDrawer && (
            <Drawer
              opened
              position="bottom"
              onClose={() => setIsCautionDrawer(false)}
              radius="xl"
              styles={{
                content: {
                  maxWidth: 448,
                  width: '100%',
                  margin: '0 auto',
                },
              }}
              title="체험단 참여 시 주의사항을 확인해주세요"
            ></Drawer>
          )}
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
