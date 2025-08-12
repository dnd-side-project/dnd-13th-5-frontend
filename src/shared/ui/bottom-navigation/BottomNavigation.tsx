import { Icons } from '@/shared/assets/icons';
import { Icon, IconProps } from '@/shared/ui/icon';
import { NavLink } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  icon: IconProps;
  href: string;
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: '홈',
    icon: { component: Icons.Home },
    href: '/',
  },
  {
    id: 'mysub',
    label: '내 구독',
    icon: { component: Icons.Sub },
    href: '/subscriptions/my',
  },
  {
    id: 'comparison',
    label: '비교하기',
    icon: { component: Icons.Comparison, variant: 'fill' },
    href: '/comparison',
  },
  {
    id: 'profile',
    label: '마이페이지',
    icon: { component: Icons.User },
    href: '/my',
  },
];

const linkClass = (active: boolean) =>
  `flex flex-col items-center gap-1 typo-label-s-medium ${
    active ? 'text-primary-700' : 'text-gray-500'
  }`;

const BottomNavigation = () => (
  <nav className="fixed bottom-0 z-50 inset-x-0 bg-white max-w-sm w-full mx-auto">
    <div className="px-5 fixed-bottom-safe border-t border-gray-100">
      <ul className="grid grid-cols-4 text-center py-[10px]">
        {navItems.map(({ id, label, icon, href }) => (
          <li key={id}>
            <NavLink
              to={href}
              className={({ isActive }) => linkClass(isActive)}
              aria-label={label}
            >
              <Icon {...icon} />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

export default BottomNavigation;
