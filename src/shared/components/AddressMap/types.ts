// 네이버 지도 API 타입 정의
export interface NaverLatLng {
  lat(): number;
  lng(): number;
}

export interface NaverMap {
  setCenter(center: NaverLatLng): void;
  setZoom(zoom: number): void;
}

export interface NaverMarker {
  setPosition(position: NaverLatLng): void;
  setMap(map: NaverMap | null): void;
}

export interface NaverPoint {
  x: number;
  y: number;
}

export interface NaverMapOptions {
  center: NaverLatLng;
  zoom: number;
  zoomControl: boolean;
  zoomControlOptions: {
    position: number;
  };
  scaleControl?: boolean;
  logoControl?: boolean;
  minZoom?: number;
  maxZoom?: number;
  scrollWheelZoom?: boolean;
  disableDoubleClickZoom?: boolean;
  draggable?: boolean;
}

export interface NaverMarkerOptions {
  position: NaverLatLng;
  map: NaverMap;
  icon?: {
    content: string;
    anchor: NaverPoint;
  };
}

export interface GeocodeResponse {
  v2: {
    meta: {
      totalCount: number;
    };
    addresses: Array<{
      x: string;
      y: string;
    }>;
  };
}

declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (element: HTMLElement, options: NaverMapOptions) => NaverMap;
        Marker: new (options: NaverMarkerOptions) => NaverMarker;
        LatLng: new (lat: number, lng: number) => NaverLatLng;
        Point: new (x: number, y: number) => NaverPoint;
        Position: {
          TOP_RIGHT: number;
        };
        Service: {
          geocode: (
            options: { query: string },
            callback: (status: number, response: GeocodeResponse) => void,
          ) => void;
          Status: {
            OK: number;
            ERROR: number;
          };
        };
        Event?: {
          addListener: (target: NaverMap, event: string, handler: () => void) => unknown;
          removeListener?: (target: NaverMap, event: string, listener: unknown) => void;
        };
      };
    };
    navermap_authFailure?: () => void;
  }
}
