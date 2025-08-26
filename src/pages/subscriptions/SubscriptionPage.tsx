import AlarmButton from '@/shared/ui/button/AlarmButton';
import FloatingButton from '@/shared/ui/button/FloatingButton';
import { MobileLayout } from '@/shared/ui/layout';
import { PaymentSummaryBlock } from '@/widgets/payment-summary/ui/PaymentSummaryBlock';
import { SubscriptionsSection } from '@/widgets/subscription-list/ui/SubscriptionsSection';

export const SubscriptionsPage = () => (
    <MobileLayout
      headerProps={{
        leftSlot: 'Logo',
        centerSlot: '내 구독',
        rightSlot: <AlarmButton />,
      }}
    >
      <div className="-mx-5">
        <PaymentSummaryBlock />
        <SubscriptionsSection />
      </div>
      <FloatingButton href="/subscriptions-register" />
    </MobileLayout>
  );
