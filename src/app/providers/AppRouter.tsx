import { Route, Routes } from 'react-router-dom';

import { AlarmPage } from '@/pages/alarm';

import { ComparisonAddPage, ComparisonPage } from '@/pages/comparison';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { EmailEditPage, MyPage } from '@/pages/my';
import { SignupPage } from '@/pages/signup';
import {
  SubscriptionDetailPage,
  SubscriptionEditPage,
  SubscriptionsPage,
} from '@/pages/subscriptions';
import { ROUTES } from '@/shared/config/routes';


export const AppRouter = () => (
  <Routes>
    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
    <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
    <Route path={ROUTES.HOME} element={<HomePage />} />
    <Route path={ROUTES.SUBSCRIPTIONS} element={<SubscriptionsPage />} />
    <Route path={ROUTES.SUBSCRIPTION_DETAIL()} element={<SubscriptionDetailPage />} />
    <Route path={ROUTES.SUBSCRIPTION_EDIT()} element={<SubscriptionEditPage />} />
    <Route path={ROUTES.COMPARISON} element={<ComparisonPage />} />
    <Route path={ROUTES.COMPARISON_ADD} element={<ComparisonAddPage />} />

    <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
    <Route path={ROUTES.ALARM} element={<AlarmPage />} />
    <Route path={ROUTES.EMAIL_EDIT} element={<EmailEditPage />} />

    {/* 회원가입 */}
    {/* <Route
      element={
        <MobileLayout
          showBottom={false}
          headerProps={{ leftSlot: <BackButton />, centerSlot: '회원가입' }}
        />
      }
    ></Route> */}
  </Routes>
);
