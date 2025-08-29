export type BenefitMap = Record<string, string[]>;

export const parseBenefit = (benefitString: string): BenefitMap => {
  if (!benefitString) return {};

  return benefitString
    .split('#')
    .map(s => s.trim())
    .filter(s => s.length > 0 && s.includes('$')) // 형식 불량 세그먼트 무시
    .reduce<BenefitMap>((acc, item) => {
      const [rawKey, ...rawValues] = item.split('$');
      const key = rawKey.trim();
      const values = rawValues.map(v => v.trim()).filter(v => v.length > 0);
      if (key.length === 0 || values.length === 0) return acc;
      acc[key] = [...(acc[key] ?? []), ...values]; // 동일 키 누적
      return acc;
    }, {});
};

export type BenefitItem = {
  key: string;
  value: string;
};
