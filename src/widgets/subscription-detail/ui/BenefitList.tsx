import { ContentsCard } from '@/shared/ui/contents-card';

type Props = {
  benefitsMap: Record<string, string[]>;
  uniqueBenefitKeys: string[];
};

export const BenefitList = ({ benefitsMap, uniqueBenefitKeys }: Props) => (
    <div className="space-y-5">
      {uniqueBenefitKeys.map(key => {
        const benefitValues = benefitsMap[key] ?? [];

        return (
          <ContentsCard
            key={key}
            left={
              <div className="space-y-3">
                <p className="typo-body-s-medium text-gray-800">{key}</p>
                <ul className="typo-body-s-medium text-gray-500">
                  {benefitValues.map((value, index) => (
                    <li key={index} className="whitespace-pre-wrap">
                      • {value}
                    </li>
                  ))}
                </ul>
              </div>
            }
            className="bg-white"
          />
        );
      })}
    </div>
  );
