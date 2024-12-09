import React, { useState } from 'react';
import { Bell, Menu, Search, ChevronDown } from 'lucide-react';
import TransactionTable from './TransactionTable';
import logo from '../img/pabama-logo.png';
import SideBar from './SideBar'
import Header from './Header'

interface HeaderProps {
  onMenuClick: () => void;
}

interface SideBarProps {
  isOpen: boolean;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
}

const Transactions: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Transactions</h1>
            <TransactionTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transactions;