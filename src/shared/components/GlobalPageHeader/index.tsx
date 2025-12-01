'use client';

import { useHeaderStore } from '@shared/store/useHeaderStore';
import { PageHeader } from '../PageHeader';

export function GlobalPageHeader() {
  const { title, showBackButton, showXButton, isVisible, rightAction, onBack, onX } =
    useHeaderStore();

  if (!isVisible) return null;

  return (
    <PageHeader
      title={title}
      showBackButton={showBackButton}
      showXButton={showXButton}
      rightAction={rightAction}
      onBack={onBack ?? undefined}
      onX={onX ?? undefined}
    />
  );
}
