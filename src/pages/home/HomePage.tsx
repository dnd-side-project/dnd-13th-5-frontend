import AlarmButton from '@/shared/ui/button/AlarmButton';
import { MobileLayout } from '@/shared/ui/layout';

export const HomePage = () => (
  <MobileLayout
    headerProps={{
      leftSlot: 'Logo',
      rightSlot: <AlarmButton />,
      colorVariant: 'gray',
    }}
    bodyVariant="gray"
  >
    HomePage
  </MobileLayout>
);
