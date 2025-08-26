export type BenefitMap = Record<string, string[]>;

export const parseBenefit = (benefitString: string): BenefitMap => {
  if (!benefitString) return {};

  return benefitString
    .split('#')
    .filter(Boolean)
    .reduce<BenefitMap>((acc, item) => {
      const [key, ...rest] = item.split('-'); // '이름-값' 형태
      const values = rest.join('-').split('-');

      acc[key] = values;
      return acc;
    }, {});
};

export type BenefitItem = {
  key: string;
  value: string;
};
