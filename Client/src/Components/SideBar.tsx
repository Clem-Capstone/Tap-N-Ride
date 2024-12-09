import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  ArrowLeftRight,
  UserCog,
  Users,
  Coins,
  FileText,
  Map,
  Settings,
  LogOut,
  Table,
} from 'lucide-react';
import logo from '../img/pabama-logo.png';

interface SideBarProps {
  isOpen: boolean;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen }) => {
  const location = useLocation();
  const menuItems: MenuItem[] = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: ArrowLeftRight, label: 'Transactions', path: '/transactions' },
    { icon: UserCog, label: 'Admins', path: '/admins' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Map, label: 'Routes', path: '/routes' },
    { icon: Table, label: 'Fare Matrix', path: '/fare-matrix' },
    { icon: Coins, label: 'Top Up', path: '/top-up' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className={`bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4">
        <img src={logo} alt="Logo" className="w-16 h-16 rounded-full mx-auto mb-2" />
        <p className={`text-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>Welcome</p>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 no-underline ${
              location.pathname === item.path ? 'bg-gray-700 text-white' : ''
            }`}
          >
            <item.icon className={`h-5 w-5 ${isOpen ? 'mr-3' : 'mr-0'}`} />
            <span className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              {item.label}
            </span>
          </Link>
        ))}
        <button
          onClick={() => {
            /* Implement logout functionality */
          }}
          className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 w-full text-left no-underline"
        >
          <LogOut className={`h-5 w-5 ${isOpen ? 'mr-3' : 'mr-0'}`} />
          <span className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            Logout
          </span>
        </button>
      </nav>
    </aside>
  );
};

export default SideBar;
