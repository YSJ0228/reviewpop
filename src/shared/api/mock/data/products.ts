/**
 * Mock 제품 데이터
 *
 * 테스트 및 개발용 가짜 제품 데이터입니다.
 */

import type { Product } from '@entities/product/types/product.types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: '무선 이어폰 Pro',
    category: '전자기기',
    price: 129000,
    image: 'https://via.placeholder.com/300x300?text=Product+1',
    description: '고음질 무선 이어폰',
    stock: 50,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: '스마트 워치',
    category: '전자기기',
    price: 299000,
    image: 'https://via.placeholder.com/300x300?text=Product+2',
    description: '건강을 관리하는 스마트 워치',
    stock: 30,
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 3,
    name: '휴대용 스피커',
    category: '전자기기',
    price: 89000,
    image: 'https://via.placeholder.com/300x300?text=Product+3',
    description: '어디서나 음악을 즐기세요',
    stock: 100,
    createdAt: '2024-01-03T00:00:00Z',
  },
  {
    id: 4,
    name: '노트북 거치대',
    category: '액세서리',
    price: 35000,
    image: 'https://via.placeholder.com/300x300?text=Product+4',
    description: '인체공학적 노트북 거치대',
    stock: 80,
    createdAt: '2024-01-04T00:00:00Z',
  },
  {
    id: 5,
    name: '무선 마우스',
    category: '액세서리',
    price: 45000,
    image: 'https://via.placeholder.com/300x300?text=Product+5',
    description: '조용하고 편안한 무선 마우스',
    stock: 0, // 품절
    createdAt: '2024-01-05T00:00:00Z',
  },
  {
    id: 6,
    name: '기계식 키보드',
    category: '액세서리',
    price: 159000,
    image: 'https://via.placeholder.com/300x300?text=Product+6',
    description: '타건감이 좋은 기계식 키보드',
    stock: 25,
    createdAt: '2024-01-06T00:00:00Z',
  },
];
