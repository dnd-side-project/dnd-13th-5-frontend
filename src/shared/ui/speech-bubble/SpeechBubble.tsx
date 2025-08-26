import type { PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/utils';

interface SpeechBubbleProps {
  className?: string;
}

export const SpeechBubble = ({ children, className }: PropsWithChildren<SpeechBubbleProps>) => (
    <div
      className={cn(
        'relative rounded-lg border border-primary-700 bg-white px-5 py-[10px] text-center',
        className,
      )}
    >
      {children}
      <div
        className="absolute bottom-[-8px] right-[25px] h-0 w-0 border-x-8 border-t-8 border-x-transparent border-t-primary-300"
        style={{ transform: 'translateY(0)' }}
      />
      <div
        className="absolute bottom-[-6.5px] right-[25px] h-0 w-0 border-x-[7px] border-t-[7px] border-x-transparent border-t-white"
        style={{ transform: 'translateY(0)' }}
      />
    </div>
  );
