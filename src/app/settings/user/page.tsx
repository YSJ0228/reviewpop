'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@mantine/core';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { Form } from '@shared/components/Form';
import { useUpdateUserInfo } from '@entities/user/hooks/useUpdateUserInfo';
import { FormDataType } from '@shared/components/Form/types';

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
        router.push('/settings');
      },
      onError: (error) => {
        alert('정보 수정에 실패했습니다: ' + error.message);
      },
    });
  };

  return (
    <main className={styles.UserPage}>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Form onClick={handleSave} showTextArea={false} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
