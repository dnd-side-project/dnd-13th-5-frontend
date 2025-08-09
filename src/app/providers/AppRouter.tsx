import { DashboardPage } from '@/pages/dashboard';
import { HomePage } from '@/pages/home';
import { Route, Routes } from 'react-router-dom';

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
  </Routes>
);
