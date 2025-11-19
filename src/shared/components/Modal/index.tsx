import { useDisclosure } from '@mantine/hooks';
import { Modal as MantineModal } from '@mantine/core';
import { Button } from '@shared/components';
import { ModalProps, VARIANT_MAP, MODAL_TEXTS_PRESET } from './types';
import styles from './style.module.scss';

export function Modal({ texts, variant = 'confirm', children, onClose }: ModalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const buttonVariant = VARIANT_MAP[variant];
  const modalTexts = { ...MODAL_TEXTS_PRESET[variant], ...texts };

  const handleConfirm = async () => {
    await onClose();
    console.log('요청 완료');
    close();
  };

  return (
    <>
      <MantineModal
        opened={opened}
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
          <Button className={styles.Modal__Button} onClick={handleConfirm} variant={buttonVariant}>
            {modalTexts.confirmButton}
          </Button>
        </div>
      </MantineModal>

      <div onClick={open}>{children}</div>
    </>
  );
}
