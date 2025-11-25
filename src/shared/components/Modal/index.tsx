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

  // 이벤트 버블링 방지 헬퍼
  const preventBubbling = (callback: () => void | Promise<void>) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

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
      {/* 
        Mantine Modal은 Portal을 사용하므로 DOM 트리 상에서는 분리되어 있지만,
        React Event 트리 상에서는 자식으로 취급되어 이벤트가 버블링됩니다.
        Link 컴포넌트 내부에서 사용 시 페이지 이동을 방지하기 위해 
        빈 div로 감싸서 버블링되는 이벤트를 차단합니다.
      */}
      <div onClick={(e) => e.stopPropagation()}>
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
            <Button
              onClick={preventBubbling(close)}
              variant="secondary"
              className={styles.Modal__Button}
            >
              {modalTexts.cancelButton}
            </Button>
            <Button
              className={styles.Modal__Button}
              onClick={preventBubbling(handleConfirm)}
              variant={buttonVariant}
              disabled={isLoading}
              size="medium"
            >
              {isLoading ? <LoadingSpinner size="small" color="white" /> : modalTexts.confirmButton}
            </Button>
          </div>
        </MantineModal>
      </div>

      {cloneElement(trigger as React.ReactElement<{ onClick?: React.MouseEventHandler }>, {
        onClick: preventBubbling(open),
      })}
    </>
  );
}
