import { TButtonType } from './types';

type TButtonConfigItem = {
  image: string;
  label: string;
  class: string;
};

export const BUTTON_CONFIG: Record<TButtonType, TButtonConfigItem> = {
  copy: {
    image: '',
    label: '복사',
    class: `WebButton__Button--Copy`,
  },
  edit: {
    image: '/images/BlogLogo.svg',
    label: '수정',
    class: `WebButton__Button--Edit`,
  },
  connect: {
    image: '/images/BlogLogo.svg',
    label: '연결하기',
    class: `WebButton__Button--Connect`,
  },
} as const;

export const TEXT = {
  placeholder: '블로그를 연결해주세요',
  connectedLabel: '연결됨',
};
