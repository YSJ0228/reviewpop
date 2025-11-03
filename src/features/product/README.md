# Product Feature (제품 기능)

## 📌 이 폴더는 무엇인가요?

제품 목록 조회, 상세 정보 확인, 필터링 등 **제품 관련 모든 기능**을 관리하는 폴더입니다.

## 📁 폴더 구조 (예정)

```
product/
├── components/      # 제품 전용 컴포넌트
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   └── ProductFilter.tsx
├── hooks/           # 제품 전용 커스텀 훅
│   ├── useProducts.ts
│   └── useProductFilter.ts
└── api/             # 제품 API 호출 함수
    └── productApi.ts
```

## 🎯 주요 기능 (예정)

- [ ] 제품 목록 조회
- [ ] 제품 상세 조회
- [ ] 제품 필터링 (카테고리, 가격 등)
- [ ] 제품 검색

## 💡 시작하기

1. 필요한 하위 폴더 생성 (`components/`, `hooks/`, `api/`)
2. 제품 관련 컴포넌트 작성
3. API 호출 함수 작성
