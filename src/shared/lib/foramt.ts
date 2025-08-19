export const clamp = (n: number, min = 0, max = 100) => Math.min(max, Math.max(min, n));

export const percent = (used: number, total: number) =>
  total <= 0 ? 0 : clamp(Math.round((used / total) * 100));

export const formatKRW = (n: number) => `${new Intl.NumberFormat('ko-KR').format(Math.round(n))  }원`;

export const formatKoreanDate = (d = new Date()) => `${d.getMonth() + 1}월 ${d.getDate()}일`;
