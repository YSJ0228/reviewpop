/**
 * Mock Data 생성을 위한 자체 Random Utils
 * (외부 라이브러리 의존성 제거)
 */

/**
 * min(포함) ~ max(포함) 사이의 랜덤 정수 반환
 */
export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 배열에서 랜덤한 요소 하나 반환
 */
export const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * 배열에서 랜덤한 요소 여러 개 반환 (중복 허용 X)
 */
export const getRandomElements = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const pick = Math.floor(Math.random() * (i + 1));
    [shuffled[pick], shuffled[i]] = [shuffled[i], shuffled[pick]];
  }
  return shuffled.slice(0, count);
};

/**
 * 랜덤 Boolean 반환
 */
export const getRandomBoolean = (): boolean => {
  return Math.random() < 0.5;
};

/**
 * 랜덤 ID 생성 (간단한 버전)
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * 랜덤 날짜 반환 (ISO String)
 */
export const getRandomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
};

/**
 * 랜덤 이미지 URL 반환 (Lorem Picsum 활용)
 */
export const getRandomImage = (width: number, height: number): string => {
  return `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
};
