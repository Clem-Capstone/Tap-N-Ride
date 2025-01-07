import React, { useState } from "react";
import TransactionTable from "./TransactionTable";
import SideBar from "./SideBar";
import Header from "./Header";

const Transactions: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar isOpen={sidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <TransactionTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transactions;
