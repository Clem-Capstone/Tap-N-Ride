import React, { useState } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import UsersTable from './UsersTable';

const Users: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Pabama Card Holders</h1>
            <UsersTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;