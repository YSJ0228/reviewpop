'use client';

import { useState, cloneElement } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal as MantineModal } from '@mantine/core';
import { Button, LoadingSpinner } from '@shared/components';
import { ModalProps } from './types';
import { VARIANT_MAP, MODAL_TEXTS_PRESET } from './constants';
import styles from './style.module.scss';

export function Modal({ texts, variant = 'confirm', trigger, onConfirm, ...props }: ModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);

  const buttonVariant = VARIANT_MAP[variant];
  // variant별 기본 텍스트 프리셋 가져온 후, texts prop으로 부분적으로 덮어쓰기
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

  return (
    <>
      {cloneElement(trigger as React.ReactElement<{ onClick?: React.MouseEventHandler }>, {
        onClick: (e: React.MouseEvent) => {
          // 모달 트리거가 다른 클릭 가능한 요소 내부에 있을 수 있으므로
          // 이벤트 전파를 중단하여 의도하지 않은 동작 방지
          e.stopPropagation();
          e.preventDefault();
          open();
        },
      })}
      <div
        className={styles.Modal__Wrapper}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <MantineModal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          centered
          classNames={{
            content: styles.Modal,
            body: styles.Modal__Body,
          }}
          {...props}
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
              size="medium"
            >
              {isLoading ? <LoadingSpinner size="small" color="white" /> : modalTexts.confirmButton}
            </Button>
          </div>
        </MantineModal>
      </div>
    </>
  );
}
