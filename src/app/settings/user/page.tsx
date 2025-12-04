'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@mantine/core';

import { toast } from '@shared/components/Toast';
import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { Form } from '@shared/components/Form';
import { useUpdateUserInfo } from '@entities/user/hooks/useUpdateUserInfo';
import { FormDataType } from '@shared/components/Form/types';
import { HeaderConfig } from '@shared/components';

import styles from './page.module.scss';

/**
 * 설정 페이지
 * - 하단 탭: X
 * - 진입점: 프로필 페이지 > 설정 버튼
 *
 * TODO:
 * 1. [ ] Settings 컴포넌트 구현 (@features/profile/components/Settings)
 * 2. [ ] 알림 설정
 * 3. [ ] 개인정보 설정
 * 4. [ ] 로그아웃 버튼
 * 5. [ ] 회원탈퇴 버튼
 * 6. [ ] 앱 정보 (버전, 이용약관, 개인정보처리방침)
 */
export default function UserPage() {
  const updateUser = useUpdateUserInfo();
  const router = useRouter();

  const handleSave = (formData: FormDataType) => {
    updateUser.mutate(formData, {
      onSuccess: () => {
        toast.success('정보가 수정되었습니다.');
        router.push('/settings');
      },
      onError: (error) => {
        toast.error('정보 수정에 실패하였습니다.');
      },
    });
  };

  return (
    <main className={styles.UserPage}>
      <HeaderConfig title="개인정보" showBackButton />
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Form onClick={handleSave} showTextArea={false} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
