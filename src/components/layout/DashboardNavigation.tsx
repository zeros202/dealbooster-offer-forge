
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  FileText,
  Image,
  Globe,
  BarChart3,
  Settings,
  Layout,
  Home,
} from 'lucide-react';

const navigationItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/proposal-generator', icon: FileText, label: 'Proposals' },
  { to: '/image-editor', icon: Image, label: 'Image Editor' },
  { to: '/landing-builder', icon: Globe, label: 'Landing Pages' },
  { to: '/templates', icon: Layout, label: 'Templates' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export const DashboardNavigation = () => {
  return (
    <aside className="w-64 bg-white shadow-sm border-r">
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
