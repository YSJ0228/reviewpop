export function handleNaverMapClick(address: string) {
  if (address) {
    window.open(`https://map.naver.com/p/search/${encodeURIComponent(address)}`, '_blank');
  }
}
