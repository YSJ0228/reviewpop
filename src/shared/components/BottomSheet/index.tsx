import { Drawer } from '@mantine/core';

import { Button } from '../Button';

import { BottomSheetProps } from './types';

import styles from './style.module.scss';

export function BottomSheet({ onClose, onClick, title }: BottomSheetProps) {
  return (
    <Drawer
      opened
      position="bottom"
      onClose={onClose}
      styles={{
        content: {
          maxWidth: 448,
          width: '100%',
          margin: '0 auto',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
        },
      }}
      title={title}
    >
      <div className={styles.BottomSheet__ButtonBar}>
        <Button variant="primary" onClick={onClick} fullWidth>
          저장
        </Button>
      </div>
    </Drawer>
  );
}
