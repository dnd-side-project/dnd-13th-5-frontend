import { useState } from 'react';

import BackButton from '@/shared/ui/button/BackButton';
import { MobileLayout } from '@/shared/ui/layout';
import { StepIndicator } from '@/shared/ui/step-indicator';
import { SubscriptionRegisterWidget } from '@/widgets/subscription-register/SubscriptionRegisterWidget';

function SubscriptionRegister() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  return (
    <MobileLayout
      headerProps={{
        leftSlot: <BackButton />,
        centerSlot: (
          <div className="flex-1 w-full">
            <StepIndicator currentStep={step} totalSteps={4} />
          </div>
        ),
        centerExpanded: true,
      }}
      showBottom={false}
    >
      <SubscriptionRegisterWidget step={step} setStep={setStep} />
    </MobileLayout>
  );
}

export default SubscriptionRegister;
