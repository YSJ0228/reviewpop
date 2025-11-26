import type { ButtonProps } from '@shared/components/Button/types';
import type { ModalContentTexts } from './types';

export type ModalVariant = 'confirm' | 'warning' | 'outline';

/**
 * Modal variant → Button variant 매핑
 */
export const VARIANT_MAP: Record<ModalVariant, ButtonProps['variant']> = {
  confirm: 'primary',
  warning: 'warning',
  outline: 'outline',
} as const;

/**
 * Modal variant별 기본 텍스트 프리셋
 */
export const MODAL_TEXTS_PRESET: Record<ModalVariant, ModalContentTexts> = {
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
