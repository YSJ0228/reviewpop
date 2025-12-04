# 체험 상세페이지 UI 개선

## 변경 사항

### 1. BulletListSection 패딩 개선

- `noPadding` 모드일 때 오른쪽에도 16px 패딩이 적용되도록 수정
- 좌우 패딩 일관성 개선

### 2. PageHeader 브랜드명 표시

- 체험 상세페이지의 PageHeader에 브랜드명(`campaign.brand`) 표시
- `usePageHeader` 훅에 `title` prop 전달

### 3. ImageGallery 스타일 개선

- 컨테이너에 16px border-radius 적용
- 각 이미지에 4px border-radius 적용
- gap을 8px에서 4px로 조정하여 더 깔끔한 레이아웃
- `overflow: hidden` 추가로 컨테이너 모서리 처리

### 4. CampaignImagesPage 갤러리 스타일 개선

- `GalleryGrid` 컨테이너에 16px border-radius 적용
- 각 이미지(`GalleryItem`)에 4px border-radius 적용
- gap을 8px에서 4px로 조정하여 ImageGallery와 일관성 유지
- `overflow: hidden` 추가로 컨테이너 모서리 처리

## 수정된 파일

- `src/features/campaign/components/BulletListSection/style.module.scss`
- `src/app/campaign/[campaignId]/page.tsx`
- `src/shared/components/ImageViewer/ImageGallery.module.scss`
- `src/app/campaign/[campaignId]/images/page.module.scss`

## 스크린샷

(필요시 추가)
