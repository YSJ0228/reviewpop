import { ReactElement, MouseEvent } from 'react';
import { ModalProps as MantineModalProps } from '@mantine/core';
import type { ModalVariant } from './constants';

/**
 * Modal 컴포넌트의 Props 타입 정의
 *
 * MantineModalProps를 상속받아 Mantine Modal의 모든 속성을 사용할 수 있습니다.
 */
export interface ModalProps extends Omit<MantineModalProps, 'onClose' | 'opened'> {
  /** 모달을 열기 위한 트리거 요소 */
  trigger: ReactElement;
  /** 확인 버튼 클릭 시 실행될 핸들러 */
  onConfirm: () => void | Promise<void>;
  /** 모달 유형과 버튼 스타일을 함께 결정 */
  variant?: ModalVariant;
  // confirm : 신청, warning : 탈퇴, outline : 예약/신청 취소
  /** 프리셋을 부분적으로 덮어쓸 ModalContentTexts */
  texts?: Partial<ModalContentTexts>;
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
