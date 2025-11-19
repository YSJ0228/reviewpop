import { useDisclosure } from '@mantine/hooks';
import { Modal as MantineModal } from '@mantine/core';
import { Button, LoadingSpinner } from '@shared/components';
import { ModalProps, VARIANT_MAP, MODAL_TEXTS_PRESET } from './types';
import styles from './style.module.scss';
import { cloneElement, useState } from 'react';

export function Modal({ texts, variant = 'confirm', children, onConfirm }: ModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);

  const buttonVariant = VARIANT_MAP[variant];
  // variant별 기본 텍스트 프리셋을 가져온 후, texts prop으로 부분적으로 덮어쓰기
  const modalTexts = { ...MODAL_TEXTS_PRESET[variant], ...texts };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      close();
    } catch (error) {
      console.error('요청 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // children에 onClick 이벤트 주입 (기존 onClick 오버라이드)
  const triggerElement = cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      e.preventDefault?.();
      e.stopPropagation?.();
      open();
    },
  });

  return (
    <>
      <MantineModal
        opened={opened}
        // @ts-expect-error - Mantine Modal v8의 타입 정의 문제로 인해 onClose가 타입에 포함되지 않았지만 실제로는 필수 prop입니다
        onClose={close}
        withCloseButton={false}
        centered
        classNames={{
          content: styles.Modal,
          body: styles.Modal__Body,
        }}
      >
        <div className={styles.Modal__Title}>{modalTexts.title}</div>
        <div className={styles.Modal__Text}>{modalTexts.content}</div>
        <div className={styles.Modal__Buttons}>
          <Button onClick={close} variant="secondary" className={styles.Modal__Button}>
            {modalTexts.cancelButton}
          </Button>
          <Button
            className={styles.Modal__Button}
            onClick={handleConfirm}
            variant={buttonVariant}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="small" color="white" /> : modalTexts.confirmButton}
          </Button>
        </div>
      </MantineModal>

      {triggerElement}
    </>
  );
}
