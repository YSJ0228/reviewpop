import type { EmptyStateConfig, EmptyStateVariant } from './types';

const MESSAGES = {
  CHECK_CAMPAIGNS: '지금 진행중인 체험을 구경해보세요.',
  BUTTON_DEFAULT: '진행중인 체험 보러가기',
} as const;

export const EMPTY_STATE_MAP: Record<EmptyStateVariant, EmptyStateConfig> = {
  'no-selected': {
    description: '아직 선정된 체험이 없네요.\n좋은 결과가 있을 거예요.',
    showButton: true,
    buttonText: MESSAGES.BUTTON_DEFAULT,
  },
  'no-registered': {
    description: `아직 작성한 체험이 없네요.\n${MESSAGES.CHECK_CAMPAIGNS}`,
    showButton: true,
    buttonText: MESSAGES.BUTTON_DEFAULT,
  },
  'no-applied': {
    description: `아직 신청한 체험이 없네요.\n${MESSAGES.CHECK_CAMPAIGNS}`,
    showButton: true,
    buttonText: MESSAGES.BUTTON_DEFAULT,
  },
  'no-completed': {
    description: `아직 완료한 체험이 없네요.\n${MESSAGES.CHECK_CAMPAIGNS}`,
    showButton: true,
    buttonText: MESSAGES.BUTTON_DEFAULT,
  },
  'no-opened': {
    title: '지금은 모집중인 체험이 없어요',
    description: '지난 체험들을 구경해보세요',
    showButton: false,
  },
};
