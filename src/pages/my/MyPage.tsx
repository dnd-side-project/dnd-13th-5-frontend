import AlarmButton from '@/shared/ui/button/AlarmButton';
import { MobileLayout } from '@/shared/ui/layout';

export const MyPage = () => (
  <MobileLayout
    headerProps={{
      leftSlot: 'Logo',
      rightSlot: <AlarmButton />,
    }}
  >
    MyPage
  </MobileLayout>
);
