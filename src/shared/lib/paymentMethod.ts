/**
 * 결제수단 ID를 결제수단명으로 변환하는 매퍼
 */
const PAYMENT_METHOD_MAP: Record<number, string> = {
  1: '신한카드',
  2: '삼성카드',
  3: '국민카드',
  4: '현대카드',
  5: 'NH농협카드',
  6: 'BC카드',
  7: '우리카드',
  8: '하나카드',
  9: '롯데카드',
  10: '토스페이',
  11: '카카오페이',
  12: 'PAYCO',
  13: '삼성페이',
  14: '네이버페이',
  15: 'SSGPAY',
  16: 'AliPAY',
  17: '토스뱅크',
  18: '카카오뱅크',
  19: 'KB국민은행',
  20: '신한은행',
  21: '하나은행',
  22: '우리은행',
  23: 'NH농협은행',
  24: '기업은행',
  25: 'SC제일은행',
  26: '경남은행',
  27: '부산은행',
  28: '광주은행',
  29: '전북은행',
  30: '제주은행',
  31: '수협은행',
  32: '케이뱅크',
  33: 'iM뱅크',
};

/**
 * 결제수단 ID를 결제수단명으로 변환
 * @param id 결제수단 ID
 * @returns 결제수단명 또는 '알 수 없는 결제수단'
 */
export const getPaymentMethodName = (id: number | string): string => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;

  if (Number.isNaN(numericId)) {
    return '알 수 없는 결제수단';
  }

  return PAYMENT_METHOD_MAP[numericId] || '알 수 없는 결제수단';
};

/**
 * 모든 결제수단 목록을 반환
 * @returns 결제수단 ID와 이름의 배열
 */
export const getAllPaymentMethods = (): Array<{ id: number; name: string }> =>
  Object.entries(PAYMENT_METHOD_MAP).map(([id, name]) => ({
    id: parseInt(id, 10),
    name,
  }));
