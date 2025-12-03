import { renderToString } from 'react-dom/server';
import { IconMapMarker } from '@pop-ui/foundation';

import type { NaverLatLng, NaverMap, NaverMarker } from './types';

// 마커 스타일 상수
const MARKER_SIZE = 48;
const MARKER_BORDER_WIDTH = 5;
// aqua-500 색상: #0fd3d8 (글로벌 CSS 변수 --color-aqua-500와 동일)
const MARKER_AQUA_COLOR = '#0fd3d8';

/**
 * 마커 아이콘 SVG 생성
 */
function createMarkerIconSvg(): string {
  return renderToString(
    <IconMapMarker size={MARKER_SIZE} color={MARKER_AQUA_COLOR} filled={true} />,
  );
}

/**
 * 마커 테두리 SVG 생성
 */
function createMarkerBorderSvg(markerIconSvg: string): string {
  const borderSize = MARKER_SIZE + MARKER_BORDER_WIDTH * 2;

  return markerIconSvg
    .replace(new RegExp(`width="${MARKER_SIZE}"`, 'g'), `width="${borderSize}"`)
    .replace(new RegExp(`height="${MARKER_SIZE}"`, 'g'), `height="${borderSize}"`)
    .replace(new RegExp(MARKER_AQUA_COLOR.replace('#', '#'), 'g'), 'white')
    .replace(new RegExp(`fill="${MARKER_AQUA_COLOR}"`, 'g'), 'fill="white"')
    .replace(new RegExp(`stroke="${MARKER_AQUA_COLOR}"`, 'g'), 'stroke="white"');
}

/**
 * 네이버 지도 마커 생성
 */
export function createNaverMarker(
  position: NaverLatLng,
  map: NaverMap,
  markerWrapperClass: string,
  markerBorderClass: string,
  markerIconClass: string,
): NaverMarker {
  const markerIconSvg = createMarkerIconSvg();
  const borderSvg = createMarkerBorderSvg(markerIconSvg);
  const anchorSize = (MARKER_SIZE + MARKER_BORDER_WIDTH * 2) / 2;

  return new window.naver.maps.Marker({
    position,
    map,
    icon: {
      content: `
        <div class="${markerWrapperClass}">
          <div class="${markerBorderClass}">${borderSvg}</div>
          <div class="${markerIconClass}">${markerIconSvg}</div>
        </div>
      `,
      anchor: new window.naver.maps.Point(anchorSize, anchorSize),
    },
  });
}

/**
 * 네이버 저작권 문구 숨김 처리
 */
export function hideNaverCopyright(mapContainer: HTMLElement): void {
  const selectors = [
    '.nmap_logo',
    'img[alt*="naver" i]',
    'img[alt*="NAVER"]',
    '[title*="naver" i]',
    '[title*="NAVER"]',
    'a[href*="naver.com" i]',
    'a[href*="NAVER.COM"]',
  ];

  selectors.forEach((selector) => {
    const elements = mapContainer.querySelectorAll(selector);
    elements.forEach((element) => {
      (element as HTMLElement).style.display = 'none';
    });
  });

  // 텍스트 내용으로 검색 (fallback)
  const allElements = mapContainer.querySelectorAll('*');
  allElements.forEach((element) => {
    const text = element.textContent?.toLowerCase() || '';
    if (text.includes('naver') || text.includes('corp')) {
      (element as HTMLElement).style.display = 'none';
    }
  });
}
