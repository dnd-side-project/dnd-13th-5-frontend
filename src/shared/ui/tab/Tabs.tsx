import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

type ClassValue = string | false | null | undefined;
const cx = (...args: ClassValue[]) => args.filter(Boolean).join(' ');

// Tabs.Root
export const Tabs = (
  props: React.ComponentProps<typeof TabsPrimitive.Root>,
) => (
  <TabsPrimitive.Root
    className="flex flex-col flex-grow"
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
    className={cx('flex', className)} // cx로 기본 스타일 적용
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
    className={cx(
      'px-4 py-2 border-b text-gray-500 typo-body-m-medium', // 기본 스타일
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
    className={cx('flex-grow p-5', className)} // 기본 스타일
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
