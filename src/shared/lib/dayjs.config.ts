/**
 * dayjs 글로벌 설정
 *
 * 앱 전역에서 사용할 dayjs 플러그인 및 로케일을 설정합니다.
 * layout.tsx에서 import하여 앱 시작 시 초기화됩니다.
 */

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

// relativeTime 플러그인 등록 (fromNow, toNow 등)
dayjs.extend(relativeTime);

// 한국어 로케일을 기본값으로 설정
dayjs.locale('ko');

// 설정된 dayjs를 export
export default dayjs;
