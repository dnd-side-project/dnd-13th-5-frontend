import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import { cn } from '@/shared/lib';
import BottomNavigation from '@/shared/ui/bottom-navigation/BottomNavigation';
import type { HeaderProps } from '@/shared/ui/header/Header';
import Header from '@/shared/ui/header/Header';

type BodyVariant = 'white' | 'gray';

interface MobileLayoutProps {
  children?: ReactNode;
  showHeader?: boolean;
  showBottom?: boolean;
  headerProps?: HeaderProps;
  bodyVariant?: BodyVariant;
  bodyClassName?: string;
}

const MobileLayout = ({
  children,
  showHeader = true,
  showBottom = true,
  headerProps,
  bodyVariant = 'white',
  bodyClassName,
}: MobileLayoutProps) => {
  const bodyColor = bodyVariant === 'gray' ? 'bg-gray-50' : 'bg-white';

  return (
    <div className="min-h-dvh bg-gray-200 flex flex-col">
      <div className="app-shell flex flex-col flex-grow text-gray-800 ">
        {showHeader && <Header {...headerProps} />}

        <main
          className={cn(
            `app-body flex-grow p-5 ${bodyColor} ${showBottom ? 'pb-[calc(56px+env(safe-area-inset-bottom))]' : ''}`,
            bodyClassName,
          )}
        >
          <section className="cols-6 gap-2">
            <div className="col-span-6">{children ?? <Outlet />}</div>
          </section>
        </main>

        {showBottom && <BottomNavigation />}
      </div>
    </div>
  );
};

export default MobileLayout;
