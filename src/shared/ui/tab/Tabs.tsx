import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { cn } from '@/shared/lib';

// Tabs.Root
export const Tabs = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) => (
  <TabsPrimitive.Root
    className={cn('flex flex-col flex-grow', className)}
    data-slot="tabs"
    {...props}
  />
);

// Tabs.List
export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('flex', className)} // cx로 기본 스타일 적용
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

// Tabs.Trigger
export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'px-4 py-2 border-b text-gray-500 typo-body-m-medium', // 기본 스타일
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'data-[state=active]:border-b-2 data-[state=active]:text-gray-800 data-[state=active]:border-gray-800', // 활성화 상태 스타일
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// Tabs.Content
export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('flex-grow p-5', className)} // 기본 스타일
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
