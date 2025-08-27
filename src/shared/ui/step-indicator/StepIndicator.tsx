import { cn } from '@/shared/lib';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const StepIndicator = ({ currentStep, totalSteps, className }: StepIndicatorProps) => (
    <div className={cn('flex items-center gap-1 w-full', className)}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div
            key={stepNumber}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors',
              isActive || isCompleted ? 'bg-red-500' : 'bg-gray-200',
            )}
          />
        );
      })}
    </div>
  );
