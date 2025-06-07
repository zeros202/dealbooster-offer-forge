
import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardNavigation } from './DashboardNavigation';
import { DashboardHeader } from './DashboardHeader';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardNavigation />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
