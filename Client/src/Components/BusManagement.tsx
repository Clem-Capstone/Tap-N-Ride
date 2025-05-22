import React, { useState, useEffect } from 'react';
import { Trash2, PlusCircle } from 'lucide-react';
import SideBar from './SideBar';
import Header from './Header';
import axios from 'axios';

interface BusProps {
  id: number;
  busID: string;
  status: string;
  routeName: string;
  area: string;
  _id: string;
}

interface RouteProps {
  id: string;
  name: string;
}

const staticAreas = [
  { id: 1, name: 'BUKIDNON' },
  { id: 2, name: 'MISAMIS ORIENTAL' },
];

const BusManagement: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [buses, setBuses] = useState<BusProps[]>([]);
  const [routes, setRoutes] = useState<RouteProps[]>([]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newBus, setNewBus] = useState<{ busID: string; status: string; routeID: string; area: string }>({
    busID: '',
    status: 'inactive',
    routeID: '',
    area: '',
  });

  useEffect(() => {
    fetchBuses();
    fetchRoutes();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get('/api/buses');
      setBuses(
        response.data.map((bus: any, idx: number) => ({
          id: idx + 1,
          _id: bus._id,
          busID: bus.busID,
          status: bus.status,
          routeName: bus.routeID?.name || 'Unknown',
          area: bus.area || 'Not Assigned',
        }))
      );
    } catch (error) {
      console.error('Failed to fetch buses:', error);
    }
  };

  const fetchRoutes = async () => {
    try {
      const response = await axios.get('/api/routes');
      setRoutes(
        response.data.map((route: any) => ({
          id: route._id,
          name: route.name,
        }))
      );
    } catch (error) {
      console.error('Failed to fetch routes:', error);
    }
  };

  const addBus = async () => {
    if (!newBus.busID || !newBus.routeID || !newBus.area) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('/api/buses', {
        busID: newBus.busID,
        routeID: newBus.routeID,
        status: newBus.status,
        area: newBus.area,
      });

      setBuses([
        ...buses,
        {
          id: buses.length + 1,
          _id: response.data._id,
          busID: response.data.busID,
          status: response.data.status,
          routeName: response.data.routeID.name,
          area: response.data.area,
        },
      ]);

      setNewBus({ busID: '', status: 'inactive', routeID: '', area: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add bus:', error.response?.data || error.message);
    }
  };

  const updateStatus = async (mongoId: string, newStatus: string) => {
    try {
      await axios.put(`/api/buses/${mongoId}`, { status: newStatus });
      setBuses(
        buses.map((bus) =>
          bus._id === mongoId ? { ...bus, status: newStatus } : bus
        )
      );
    } catch (error) {
      console.error('Failed to update bus status:', error);
    }
  };

  const deleteBus = async (mongoId: string) => {
    if (!window.confirm('Are you sure you want to delete this bus?')) return;

    try {
      await axios.delete(`/api/buses/${mongoId}`);
      setBuses(buses.filter((bus) => bus._id !== mongoId));
    } catch (error) {
      console.error('Failed to delete bus:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Bus Management</h1>

            <div className="mb-4 flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                <PlusCircle className="mr-2" /> Add New Bus
              </button>
            </div>

            {showAddForm && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h2 className="text-lg font-semibold mb-4">Add New Bus</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Bus Number"
                    value={newBus.busID}
                    onChange={(e) => setNewBus({ ...newBus, busID: e.target.value })}
                    className="border p-2 rounded-md"
                  />
                  <select
                    value={newBus.area}
                    onChange={(e) => setNewBus({ ...newBus, area: e.target.value })}
                    className="border p-2 rounded-md"
                  >
                    <option value="" disabled>
                      Select Area
                    </option>
                    {staticAreas.map((area) => (
                      <option key={area.id} value={area.name}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={newBus.routeID}
                    onChange={(e) => setNewBus({ ...newBus, routeID: e.target.value })}
                    className="border p-2 rounded-md"
                  >
                    <option value="" disabled>
                      Select Route
                    </option>
                    {routes.map((route) => (
                      <option key={route.id} value={route.id}>
                        {route.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={newBus.status}
                    onChange={(e) => setNewBus({ ...newBus, status: e.target.value })}
                    className="border p-2 rounded-md"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="out-of-service">Out of Service</option>
                  </select>
                </div>
                <button
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                  onClick={addBus}
                >
                  Save Bus
                </button>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">ID</th>
                    <th className="px-4 py-2 text-left text-gray-600">Bus Number</th>
                    <th className="px-4 py-2 text-left text-gray-600">Area</th>
                    <th className="px-4 py-2 text-left text-gray-600">Route</th>
                    <th className="px-4 py-2 text-left text-gray-600">Status</th>
                    <th className="px-4 py-2 text-left text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map((bus) => (
                    <tr key={bus.id} className="border-t">
                      <td className="px-4 py-2 text-gray-700">{bus.id}</td>
                      <td className="px-4 py-2 text-gray-700">{bus.busID}</td>
                      <td className="px-4 py-2 text-gray-700">{bus.area}</td>
                      <td className="px-4 py-2 text-gray-700">{bus.routeName}</td>
                      <td className="px-4 py-2 text-gray-700">
                        <select
                          value={bus.status}
                          onChange={(e) => updateStatus(bus._id, e.target.value)}
                          className="border p-1 rounded-md"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="out-of-service">Out of Service</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 flex space-x-2">
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => deleteBus(bus._id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {buses.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-gray-500">
                        No buses found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BusManagement;
