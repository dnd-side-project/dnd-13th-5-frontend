import { Route, Routes } from 'react-router-dom';

import PrivateRouter from '@/app/providers/PrivateRouter';
import PublicRouter from '@/app/providers/PublicRouter';
import { AlarmPage } from '@/pages/alarm';
import { ComparisonAddPage, ComparisonPage } from '@/pages/comparison';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { EmailEditPage, MyPage } from '@/pages/my';
import { SignupPage } from '@/pages/signup';
import {
  BenefitDetailPage,
  SubscriptionDetailPage,
  SubscriptionEditPage,
  SubscriptionsPage,
} from '@/pages/subscriptions';
import SubscriptionRegisterPage from '@/pages/subscriptions/SubscriptionRegisterPage';
import { ROUTES } from '@/shared/config/routes';

export const AppRouter = () => (
  <>
    <Routes>
      {/* 로그인하지 않아도 접근 가능 */}
      <Route element={<PublicRouter />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Route>

      {/* 로그인해야 접근 가능 */}
      <Route element={<PrivateRouter />}>
        <Route path={ROUTES.SUBSCRIPTIONS} element={<SubscriptionsPage />} />
        <Route path={ROUTES.SUBSCRIPTION_DETAIL()} element={<SubscriptionDetailPage />} />
        <Route path={ROUTES.SUBSCRIPTION_EDIT()} element={<SubscriptionEditPage />} />
        <Route path={ROUTES.SUBSCRIPTION_BENEFIT_DETAIL()} element={<BenefitDetailPage />} />
        <Route path={ROUTES.COMPARISON()} element={<ComparisonPage />} />
        <Route path={ROUTES.COMPARISON_ADD} element={<ComparisonAddPage />} />
        <Route path={ROUTES.SUBSCRIPTIONS_REGISTER} element={<SubscriptionRegisterPage />} />

        <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
        <Route path={ROUTES.ALARM} element={<AlarmPage />} />
        <Route path={ROUTES.EMAIL_EDIT} element={<EmailEditPage />} />
      </Route>
    </Routes>
  </>
);
