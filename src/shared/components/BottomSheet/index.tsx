import { Drawer } from '@mantine/core';

import { BottomSheetProps } from './types';

import styles from './style.module.scss';

export function BottomSheet({
  opened,
  onClose,
  title,
  children,
  footer,
  titleSize = 20,
  height = 560,
  withCloseButton = true,
}: BottomSheetProps) {
  // footer가 있을 때만 flex 레이아웃 적용
  const hasFooter = !!footer;

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
          ...(hasFooter && {
            display: 'flex',
            flexDirection: 'column',
          }),
        },
        header: {
          paddingBottom: 8,
        },
        body: {
          ...(hasFooter && {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }),
        },
      }}
    >
      {title && (
        <h2 className={styles.BottomSheet__Title} style={{ fontSize: `${titleSize}px` }}>
          {title}
        </h2>
      )}
      <div className={hasFooter ? styles.BottomSheet__Content : undefined}>{children}</div>
      {footer && <div className={styles.BottomSheet__Footer}>{footer}</div>}
    </Drawer>
  );
}
