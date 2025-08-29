import { Route, Routes } from 'react-router-dom';

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

import { ProtectedRoute } from '../router/ProtectedRoute';

export const AppRouter = () => (
  <>
    <Routes>
      {/* 비로그인 사용자만 접근 가능한 페이지 */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <ProtectedRoute requireAuth={false}>
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.SIGNUP}
        element={
          <ProtectedRoute requireAuth={false}>
            <SignupPage />
          </ProtectedRoute>
        }
      />
      {/* 모든 사용자가 접근 가능한 페이지 */}
      <Route path={ROUTES.HOME} element={<HomePage />} />

      {/* 로그인 사용자만 접근 가능한 페이지 */}
      <Route
        path={ROUTES.SUBSCRIPTIONS}
        element={
          <ProtectedRoute>
            <SubscriptionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.SUBSCRIPTION_DETAIL()}
        element={
          <ProtectedRoute>
            <SubscriptionDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.SUBSCRIPTION_EDIT()}
        element={
          <ProtectedRoute>
            <SubscriptionEditPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.SUBSCRIPTION_BENEFIT_DETAIL()}
        element={
          <ProtectedRoute>
            <BenefitDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.COMPARISON()}
        element={
          <ProtectedRoute>
            <ComparisonPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.COMPARISON_ADD}
        element={
          <ProtectedRoute>
            <ComparisonAddPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.SUBSCRIPTIONS_REGISTER}
        element={
          <ProtectedRoute>
            <SubscriptionRegisterPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.MY_PAGE}
        element={
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ALARM}
        element={
          <ProtectedRoute>
            <AlarmPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.EMAIL_EDIT}
        element={
          <ProtectedRoute>
            <EmailEditPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </>
);
