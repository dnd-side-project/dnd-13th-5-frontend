export const getBenefitKeys = (benefitString: string): string[] => {
  if (!benefitString) return [];

  return benefitString
    .split('#')
    .filter(item => item.includes('-')) // 유효한 키-값 쌍만 필터링
    .map(item => item.split('-')[0]); // 첫 번째 '-' 이전의 키만 추출
};
