// RoutesArea.tsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import RoutesTable from './RoutesTable';
import axios from 'axios';

interface Route {
  id: string;
  abbreviation: string;
  name: string;
  branchStation: string;
  dateTimeAdded: string;
  isOpen: boolean;
}

const RoutesArea: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get('/api/routes');
      setRoutes(
        response.data.map((route: any, index: number) => ({
          ...route,
          id: index + 1, // Custom index for display
        }))
      );
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Routes Management</h1>
            <RoutesTable routes={routes} fetchRoutes={fetchRoutes} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RoutesArea;