import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import OrdersPage from './OrdersPage';
import CoursesPage from './CoursesPage';
import FavoritesPage from './FavoritesPage';
import { useState } from 'react';

const DashboardRouter = () => {
  // In a real app, you would check authentication here
  const [isAuthenticated] = useState(true);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<OrdersPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
};

export default DashboardRouter;
