import { ReviewRequest } from '@entities/review';
import { getRandomElement, getRandomImage } from '@/mocks/utils/random';

const MODIFICATION_CONTENTS = [
  '사진이 너무 어둡습니다. 밝게 보정 부탁드립니다.',
  '브랜드 로고가 잘 보이게 다시 찍어주세요.',
  '필수 키워드가 누락되었습니다. "데이트팝"을 포함해주세요.',
  '본문에 오타가 있습니다. 확인 부탁드립니다.',
  '지도 첨부가 안 되어 있습니다.',
];

const PRECAUTIONS = [
  '수정 기한은 요청일로부터 3일 이내입니다.',
  '가이드라인을 준수하지 않을 경우 재수정 요청이 있을 수 있습니다.',
  '문의사항은 1:1 문의를 이용해주세요.',
];

export const createEditRequest = (): ReviewRequest => {
  return {
    image: getRandomImage(480, 320),
    content: getRandomElement(MODIFICATION_CONTENTS),
    precaution: PRECAUTIONS,
  };
};
