import React, { useState } from 'react';
import { Bell, Menu, Search, ChevronDown, Grid, ArrowLeftRight, UserCog, Users, Coins, FileText, Map, Settings, LogOut } from 'lucide-react';
import logo from '../img/pabama-logo.png';
import { Link, useLocation } from 'react-router-dom';
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
  path: string;
}

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

interface TransactionProps {
  id: number;
  amount: number;
  date: string;
}

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
            <MetricCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <MonthlySummary />
              <RecentTransactions />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const MetricCards: React.FC = () => {
  const metrics: DashboardCardProps[] = [
    { icon: Users, label: 'Total Cardholders', value: '100', color: 'bg-cyan-500' },
    { icon: Grid, label: 'Active Buses', value: '20', color: 'bg-green-500' },
    { icon: FileText, label: 'Completed Routes', value: '10', color: 'bg-orange-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric) => (
        <div key={metric.label} className={`${metric.color} rounded-lg shadow-md p-6 text-white`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{metric.label}</h3>
            <metric.icon className="h-6 w-6" />
          </div>
          <p className="text-3xl font-bold">{metric.value}</p>
        </div>
      ))}
    </div>
  );
};

const MonthlySummary: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Summary</h2>
      <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center text-gray-500">
        Chart Placeholder
      </div>
    </div>
  );
};

const RecentTransactions: React.FC = () => {
  const transactions: TransactionProps[] = [
    { id: 1, amount: 500, date: '2024-09-11' },
    { id: 2, amount: 500, date: '2024-09-12' },
    { id: 3, amount: 500, date: '2024-09-13' },
    { id: 4, amount: 500, date: '2024-09-14' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-full p-2 mr-3">
                <Coins className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">Transaction {transaction.id}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <p className="font-semibold text-green-500">+₱{transaction.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;