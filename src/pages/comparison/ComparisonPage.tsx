import AlarmButton from '@/shared/ui/button/AlarmButton';
import { MobileLayout } from '@/shared/ui/layout';

export const ComparisonPage = () => (
  <MobileLayout
    headerProps={{
      centerSlot: '비교하기',
      rightSlot: <AlarmButton />,
    }}
  >
    ComparisonPage
  </MobileLayout>
);
