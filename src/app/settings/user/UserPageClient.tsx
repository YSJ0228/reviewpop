'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@mantine/core';

import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { Form } from '@shared/components/Form';
import { useUpdateUserInfo } from '@entities/user/hooks/useUpdateUserInfo';
import { FormDataType } from '@shared/components/Form/types';
import { HeaderConfig, toast } from '@shared/components';

import styles from './page.module.scss';

export default function UserPageClient() {
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
