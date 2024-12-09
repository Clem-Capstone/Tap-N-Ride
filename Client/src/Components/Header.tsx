import React from 'react';
import { Bell, Menu, Search, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button onClick={onMenuClick} className="text-gray-300 hover:text-white mr-4">
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">TAP-N-RIDE</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <button className="text-gray-300 hover:text-white">
            <Bell className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <img
              src="/placeholder.svg?height=32&width=32"
              alt="User"
              className="w-8 h-8 rounded-full mr-2"
            />
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;