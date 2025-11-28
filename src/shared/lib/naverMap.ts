export function handleNaverMapClick(address: string) {
  if (!address || typeof address !== 'string') {
    console.warn('유효하지 않은 주소입니다.');
    return;
  }

  const trimmedAddress = address.trim();
  if (trimmedAddress.length === 0) {
    console.warn('주소가 비어있습니다.');
    return;
  }

  window.open(
    `https://map.naver.com/p/search/${encodeURIComponent(trimmedAddress)}`,
    '_blank',
    'noopener,noreferrer',
  );
}
