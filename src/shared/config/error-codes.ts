export const ERROR_MESSAGES: Record<string, string> = {
  // 예: 'SS-001': '로그인에 성공했어요.',
  // 예: 'SS-201': '내 구독을 불러왔어요.',
  // 예: 'SS-204': '구독이 등록되었어요.',
};

export const pickErrorMessage = (code?: string, fallback?: string) =>
  (code && ERROR_MESSAGES[code]) || fallback || '문제가 발생했어요. 잠시 후 다시 시도해주세요.';
