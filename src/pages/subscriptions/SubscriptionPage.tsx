import { Logo } from '@/shared/assets/images';
import FloatingButton from '@/shared/ui/button/FloatingButton';
import { MobileLayout } from '@/shared/ui/layout';
import { PaymentSummaryBlock } from '@/widgets/payment-summary/ui/PaymentSummaryBlock';
import { SubscriptionsSection } from '@/widgets/subscription-list/ui/SubscriptionsSection';

export const SubscriptionsPage = () => (
  <MobileLayout
    headerProps={{
      leftSlot: <img src={Logo} alt="Logo" className="h-7" />,
    }}
    sectionClassName="min-h-[85dvh]"
    bodyVariant="gray"
  >
    <div className="min-h-full bg-gray-50 relative max-w-md ">
      <PaymentSummaryBlock />
      <SubscriptionsSection />
      <FloatingButton href="/subscriptions-register" />
    </div>
  </MobileLayout>
);
