export const clamp = (n: number, min = 0, max = 100) => Math.min(max, Math.max(min, n));

export const percent = (used: number, total: number) =>
  total <= 0 ? 0 : clamp(Math.round((used / total) * 100));

export const formatKRW = (n: number) => `${new Intl.NumberFormat('ko-KR').format(Math.round(n))}원`;

export const formatKoreanDate = (d = new Date()) => `${d.getMonth() + 1}월 ${d.getDate()}일`;

export const formatDDay = (dateString: string) => {
  const targetDate = new Date(dateString);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'D-Day';
  if (diffDays > 0) return `D-${diffDays}`;
  return `D+${Math.abs(diffDays)}`;
};
