import { useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Checkbox } from '@mantine/core';

import { BottomSheet } from '@shared/components/BottomSheet';
import { usePostApplication } from '@entities/application/hooks/usePostApplication';

import { ButtonBar } from '../ButtonBar';

import { CautionBottomSheetProps } from './types';

import styles from './style.module.scss';

const notices = [
  '블로그 후기 작성 필수 (문자로 개별 연락하여 카카오톡 오픈채팅으로 가이드라인 제공 예정)',
  '방문 후 3일 이내에 작성 필수입니다.',
  '업로드 후 3개월 유지 필수입니다.',
  '체험단 선정 후 카카오톡 오픈채팅으로 최종 방문 예약 도와드립니다.',
  '공지사항 미숙지 후 지원하실 경우 선발에 영향을 줄 수 있습니다.',
] as const;

export function CautionBottomSheet({ opened, onClose, formData }: CautionBottomSheetProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const { mutate } = usePostApplication();
  const params = useParams();
  const campaignId = params.campaignId as string;
  const handleClick = () => {
    mutate(
      {
        campaignId,
        userId: 'kakao-1001',
        ...formData,
      },
      {
        onSuccess: () => {
          router.push(`${pathname}/complete`);
        },
        onError: (error) => {
          // 필요하면 error 객체로 상세 처리 가능
          alert(error.message);
        },
      },
    );
  };

  return (
    <BottomSheet opened={opened} onClose={onClose} title="체험단 참여 시 주의사항을 확인해주세요">
      <h2 className={styles.CautionBottomSheet__SubTitle}>체험단 참여 시 주의사항</h2>
      <ul className={styles.CautionBottomSheet__Caution}>
        {notices.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>

      <div className={styles.CautionBottomSheet__CheckBox}>
        <Checkbox
          size="sm"
          checked={checked}
          onChange={(e) => setChecked(e.currentTarget.checked)}
        />{' '}
        <span className={styles.CautionBottomSheet__AgreeText}>모두 동의합니다.</span>
      </div>
      <ButtonBar text="신청하기" onClick={handleClick} variant="primary" disabled={!checked} />
    </BottomSheet>
  );
}
