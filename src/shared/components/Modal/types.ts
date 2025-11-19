import { ReactElement, MouseEvent } from 'react';
import { ModalProps as MantineModalProps } from '@mantine/core';
import type { ButtonProps } from '@shared/components/Button/types';

/**
 * Modal 컴포넌트의 Props 타입 정의
 *
 * MantineModalProps를 상속받아 Mantine Modal의 모든 속성을 사용할 수 있습니다.
 */
export interface ModalProps extends MantineModalProps {
  /** 모달을 열기 위한 트리거 요소 (onClick 핸들러가 있을 수 있음) */
  children: ReactElement<{ onClick?: (e: MouseEvent) => void }>;
  /** 모달 유형과 버튼 스타일을 함께 결정 */
  variant?: 'confirm' | 'warning' | 'outline';
  // confirm : 신청, warning : 탈퇴, outline : 예약/신청 취소
  /** 프리셋을 부분적으로 덮어쓸 ModalContentTexts */
  texts?: Partial<ModalContentTexts>;
  /** 확인 버튼 클릭 시 실행될 비동기 함수 */
  onConfirm: () => Promise<void>;
}

/**
 * Variant별 텍스트 설정 인터페이스
 */
export interface ModalContentTexts {
  title: string;
  content: string;
  confirmButton: string;
  cancelButton: string;
}

/**
 * Modal variant에 따른 Button variant 매핑
 */
export const VARIANT_MAP: Record<NonNullable<ModalProps['variant']>, ButtonProps['variant']> = {
  confirm: 'primary',
  warning: 'warning',
  outline: 'outline',
} as const;

/**
 * variant별 기본 텍스트 프리셋
 */
export const MODAL_TEXTS_PRESET: Record<NonNullable<ModalProps['variant']>, ModalContentTexts> = {
  confirm: {
    title: '신청을 취소할까요?',
    content: '모집 기간 내에는 다시 신청할 수 있어요',
    confirmButton: '신청 취소',
    cancelButton: '닫기',
  },
  warning: {
    title: '정말 탈퇴하시겠어요?',
    content: '탈퇴 시 체험단 신청 내역과 후기 기록이 모두 삭제되며 복구할 수 없습니다.',
    confirmButton: '탈퇴',
    cancelButton: '취소',
  },
  outline: {
    title: '예약을 취소할까요?',
    content: '방문 기간 내에는 다시 신청할 수 있어요',
    confirmButton: '신청 취소',
    cancelButton: '닫기',
  },
} as const;
