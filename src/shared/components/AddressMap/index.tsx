'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';

import { env } from '@shared/config/env';
import { handleNaverMapClick } from '@shared/lib/naverMap';

import type { NaverLatLng, NaverMap } from './types';
import { createNaverMarker, hideNaverCopyright } from './utils';
import styles from './style.module.scss';

// 지도 기본 설정
const DEFAULT_ZOOM_LEVEL = 17;
const DEFAULT_POSITION = {
  lat: 37.5665, // 서울 시청
  lng: 126.978,
};

// API 로딩 설정
const API_RETRY_DELAY = 50; // ms
const API_MAX_RETRIES = 40; // 최대 2초 대기
const API_INITIAL_DELAY = 100; // ms
const COPYRIGHT_HIDE_DELAY = 500; // ms

/**
 * 기본 위치 좌표 생성
 */
function createDefaultPosition(): NaverLatLng {
  return new window.naver.maps.LatLng(DEFAULT_POSITION.lat, DEFAULT_POSITION.lng);
}

export interface AddressMapProps {
  /** 장소 이름 */
  placeName: string;
  /** 주소 */
  address: string;
  /** 지도 높이 (기본값: 140px) */
  height?: string;
  /** 위도 (선택사항, 주소 대신 좌표 사용) */
  latitude?: number;
  /** 경도 (선택사항, 주소 대신 좌표 사용) */
  longitude?: number;
}

/**
 * 주소와 지도를 표시하는 컴포넌트
 *
 * 기능:
 * - 네이버 지도 표시
 * - 마커 표시
 * - 장소 이름과 네이버 지도 버튼
 * - 주소 정보 표시
 */
export function AddressMap({
  placeName,
  address,
  height = '140px',
  latitude,
  longitude,
}: AddressMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<NaverMap | null>(null);
  const eventListenersRef = useRef<Array<{ target: NaverMap; event: string; listener: unknown }>>(
    [],
  );
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // 컴포넌트 마운트 시 네이버 지도 API가 이미 로드되어 있는지 확인
  useEffect(() => {
    if (window.naver?.maps) {
      setIsMapLoaded(true);
    }
  }, []);

  // 지도 초기화 함수
  const initializeMap = useCallback(
    (position: NaverLatLng) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = new window.naver.maps.Map(mapRef.current, {
        center: position,
        zoom: DEFAULT_ZOOM_LEVEL,
        minZoom: DEFAULT_ZOOM_LEVEL,
        maxZoom: DEFAULT_ZOOM_LEVEL,
        zoomControl: false,
        scaleControl: false,
        logoControl: false,
        scrollWheelZoom: false,
        disableDoubleClickZoom: true,
        draggable: false,
      });

      mapInstanceRef.current = map;

      const handleCopyrightHide = () => {
        if (mapRef.current) {
          hideNaverCopyright(mapRef.current);
        }
      };

      // 저작권 숨김 처리
      setTimeout(handleCopyrightHide, COPYRIGHT_HIDE_DELAY);

      // 이벤트 리스너 등록
      if (window.naver.maps.Event) {
        const idleListener = window.naver.maps.Event.addListener(map, 'idle', handleCopyrightHide);
        eventListenersRef.current.push({ target: map, event: 'idle', listener: idleListener });

        const clickHandler = () => {
          handleNaverMapClick(address);
        };
        const clickListener = window.naver.maps.Event.addListener(map, 'click', clickHandler);
        eventListenersRef.current.push({ target: map, event: 'click', listener: clickListener });
      }

      // 마커 생성
      createNaverMarker(
        position,
        map,
        styles.AddressMap__MarkerWrapper,
        styles.AddressMap__MarkerBorder,
        styles.AddressMap__MarkerIcon,
      );

      // 지도가 컨테이너 크기를 인식하도록 resize 이벤트 트리거
      const triggerResize = () => {
        if (mapInstanceRef.current && window.naver?.maps?.Event?.trigger) {
          try {
            window.naver.maps.Event.trigger(mapInstanceRef.current, 'resize');
          } catch (error) {
            console.warn('지도 resize 이벤트 트리거 실패:', error);
          }
        }
        window.dispatchEvent(new Event('resize'));
      };

      // 여러 번 시도하여 지도가 확실히 렌더링되도록 함
      requestAnimationFrame(() => {
        triggerResize();
        setTimeout(() => {
          triggerResize();
          setTimeout(triggerResize, 100);
        }, 50);
      });

      // ResizeObserver로 컨테이너 크기 변경 감지
      if (mapRef.current && typeof ResizeObserver !== 'undefined') {
        resizeObserverRef.current = new ResizeObserver(() => {
          if (mapInstanceRef.current && window.naver?.maps?.Event?.trigger) {
            try {
              window.naver.maps.Event.trigger(mapInstanceRef.current, 'resize');
            } catch {
              // 무시
            }
          }
        });
        resizeObserverRef.current.observe(mapRef.current);
      }
    },
    [address],
  );

  // 지도 초기화 useEffect
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current || mapInstanceRef.current) {
      return;
    }

    if (!window.naver?.maps) {
      return;
    }

    // 컨테이너가 DOM에 마운트되고 크기가 계산될 때까지 대기
    const checkContainerReady = () => {
      if (!mapRef.current) return false;

      const rect = mapRef.current.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };

    const initializeWhenReady = () => {
      if (!checkContainerReady()) {
        // 컨테이너가 준비되지 않았으면 다음 프레임에 다시 시도
        requestAnimationFrame(initializeWhenReady);
        return;
      }

      try {
        if (latitude && longitude) {
          const position = new window.naver.maps.LatLng(latitude, longitude);
          initializeMap(position);
        } else {
          window.naver.maps.Service.geocode({ query: address }, (status, response) => {
            if (status === window.naver.maps.Service.Status.ERROR) {
              console.error('주소 검색 실패:', {
                address,
                status,
                response,
              });
              setMapError('주소를 찾을 수 없습니다. 기본 위치로 표시됩니다.');
              initializeMap(createDefaultPosition());
              return;
            }

            if (response.v2.meta.totalCount === 0) {
              console.warn('검색된 주소가 없습니다:', address);
              setMapError('주소를 찾을 수 없습니다. 기본 위치로 표시됩니다.');
              initializeMap(createDefaultPosition());
              return;
            }

            const item = response.v2.addresses[0];
            const position = new window.naver.maps.LatLng(Number(item.y), Number(item.x));
            initializeMap(position);
            setMapError(null);
          });
        }
      } catch (error) {
        console.error('지도 초기화 오류:', error);
        setMapError('지도를 불러오는데 실패했습니다.');
      }
    };

    requestAnimationFrame(initializeWhenReady);

    // cleanup: 이벤트 리스너 및 ResizeObserver 제거
    const currentMapRef = mapRef.current;
    return () => {
      // ResizeObserver 정리
      if (resizeObserverRef.current && currentMapRef) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }

      if (window.naver?.maps?.Event && mapInstanceRef.current) {
        eventListenersRef.current.forEach(({ target, event, listener }) => {
          try {
            // target이 유효하고 mapInstanceRef와 같은지 확인
            if (
              window.naver.maps.Event?.removeListener &&
              listener &&
              target &&
              target === mapInstanceRef.current
            ) {
              window.naver.maps.Event.removeListener(target, event, listener);
            }
          } catch (error) {
            console.warn('이벤트 리스너 제거 실패:', error);
          }
        });
        eventListenersRef.current = [];
      }
      mapInstanceRef.current = null;
    };
  }, [isMapLoaded, latitude, longitude, address, initializeMap]);

  const handleScriptLoad = useCallback(() => {
    window.navermap_authFailure = function () {
      console.error('네이버 지도 인증 실패');
      setMapError('네이버 지도 인증에 실패했습니다. Client ID와 Web 서비스 URL을 확인해주세요.');
    };

    let retryCount = 0;

    const checkNaverReady = () => {
      if (window.naver?.maps) {
        setIsMapLoaded(true);
      } else {
        retryCount++;
        if (retryCount < API_MAX_RETRIES) {
          setTimeout(checkNaverReady, API_RETRY_DELAY);
        } else {
          setMapError(
            '네이버 지도 API를 불러오는데 실패했습니다. 클라이언트 ID와 웹 서비스 URL을 확인해주세요.',
          );
        }
      }
    };

    setTimeout(checkNaverReady, API_INITIAL_DELAY);
  }, []);

  const handleScriptError = useCallback(() => {
    setMapError(
      '지도 스크립트를 불러오는데 실패했습니다. 클라이언트 ID와 웹 서비스 URL을 확인해주세요.',
    );
  }, []);

  const mapContainerStyle = { '--map-height': height } as React.CSSProperties;

  // 공통 Info 섹션 렌더링
  const renderInfoSection = () => (
    <div className={styles.AddressMap__Info}>
      <div className={styles.AddressMap__PlaceName}>{placeName}</div>
      <button
        type="button"
        onClick={() => handleNaverMapClick(address)}
        className={styles.AddressMap__Button}
        aria-label="네이버 지도에서 위치 보기"
      >
        <Image src="/images/NaverMapLogo.svg" alt="네이버 맵" width={20} height={20} />
        <span>네이버 지도</span>
      </button>
    </div>
  );

  if (!env.naverMapClientId) {
    return (
      <div className={styles.AddressMap}>
        <h3 className={styles.AddressMap__Title}>주소</h3>
        <div className={styles.AddressMap__Card}>
          <div className={styles.AddressMap__MapContainer} style={mapContainerStyle}>
            <div className={styles.AddressMap__Error}>
              <p>네이버 지도 API 클라이언트 ID가 설정되지 않았습니다.</p>
            </div>
          </div>
          {renderInfoSection()}
        </div>
        <div className={styles.AddressMap__Address}>{address}</div>
      </div>
    );
  }

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${env.naverMapClientId}&submodules=geocoder`}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />

      <div className={styles.AddressMap}>
        <h3 className={styles.AddressMap__Title}>주소</h3>

        <div className={styles.AddressMap__Card}>
          <div className={styles.AddressMap__MapContainer} style={mapContainerStyle}>
            {mapError ? (
              <div className={styles.AddressMap__Error}>
                <p>{mapError}</p>
              </div>
            ) : (
              <div ref={mapRef} className={styles.AddressMap__Map} />
            )}
          </div>
          {renderInfoSection()}
        </div>

        <div className={styles.AddressMap__Address}>{address}</div>
      </div>
    </>
  );
}
