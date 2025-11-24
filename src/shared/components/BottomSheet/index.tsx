import { Drawer } from '@mantine/core';

import { BottomSheetProps } from './types';

import styles from './style.module.scss';

export function BottomSheet({
  opened,
  onClose,
  title,
  children,
  titleSize = 20,
  height = 560,
  withCloseButton = true,
}: BottomSheetProps) {
  return (
    <Drawer
      opened={opened}
      position="bottom"
      onClose={onClose}
      withCloseButton={withCloseButton}
      styles={{
        content: {
          width: '100%',
          margin: '0 auto',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          height,
        },
        header: {
          paddingBottom: 8,
        },
      }}
    >
      {title && (
        <h1 className={styles.BottomSheet__Title} style={{ fontSize: `${titleSize}px` }}>
          {title}
        </h1>
      )}
      <div className={styles.BottomSheet__Body}>{children}</div>
    </Drawer>
  );
}
