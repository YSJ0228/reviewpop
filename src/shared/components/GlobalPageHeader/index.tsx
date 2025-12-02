'use client';

import { useShallow } from 'zustand/react/shallow';

import { useHeaderStore } from '@shared/store/useHeaderStore';

import { PageHeader } from '../PageHeader';

export function GlobalPageHeader() {
  const { title, showBackButton, showXButton, isVisible, rightAction, onBack, onX } =
    useHeaderStore(
      useShallow((state) => ({
        title: state.title,
        showBackButton: state.showBackButton,
        showXButton: state.showXButton,
        isVisible: state.isVisible,
        rightAction: state.rightAction,
        onBack: state.onBack,
        onX: state.onX,
      })),
    );

  if (!isVisible) return null;

  return (
    <PageHeader
      title={title}
      showBackButton={showBackButton}
      showXButton={showXButton}
      rightAction={rightAction}
      onBack={onBack || undefined}
      onX={onX ?? undefined}
    />
  );
}
