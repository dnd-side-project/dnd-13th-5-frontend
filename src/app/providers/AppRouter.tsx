import { Route, Routes } from 'react-router-dom';

import { DashboardPage } from '@/pages/dashboard';
import { HomePage } from '@/pages/home';

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
  </Routes>
);
