import React, { useState, useEffect } from "react";
import { Users, Grid, FileText, Coins } from "lucide-react";
import SideBar from "./SideBar";
import Header from "./Header";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DashboardCardProps {
  label: string;
  value: string | number;
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
  const [metrics, setMetrics] = useState<DashboardCardProps[]>([]);
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    fetchMetrics();
    fetchRecentTransactions();
  }, []);

  const fetchMetrics = async () => {
    try {
      const [cardholdersRes, busesRes, routesRes] = await Promise.all([
        axios.get("/api/cardholders/count"), // Fetch total users
        axios.get("/api/buses/active"), // Fetch active buses
        axios.get("/api/routes/completed/count"),
      ]);

      setMetrics([
        {
          icon: Users,
          label: "Total Cardholders",
          value: cardholdersRes.data.count || 0,
          color: "bg-cyan-500",
        },
        {
          icon: Grid,
          label: "Active Buses",
          value: busesRes.data.activeBuses || 0,
          color: "bg-green-500",
        },
        {
          icon: FileText,
          label: "Completed Routes",
          value: routesRes.data.count || 0,
          color: "bg-orange-500",
        },
      ]);
    } catch (error) {
      console.error("Failed to fetch metrics:", error);
    }
  };

  const fetchRecentTransactions = async () => {
    try {
      const response = await axios.get("/api/transactions?limit=5&sort=-createdAt");
      const fetchedTransactions = response.data.data || [];

      setTransactions(
        fetchedTransactions.map((txn: any, idx: number) => ({
          id: idx + 1,
          amount: txn.paymentAmount || 0, // Fallback to 0 if undefined
          date: txn.createdAt
            ? new Date(txn.createdAt).toLocaleDateString()
            : "Unknown",
        }))
      );
    } catch (error) {
      console.error("Failed to fetch recent transactions:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
            <MetricCards metrics={metrics} />
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
              style={{ minHeight: "400px" }} // Ensure sufficient height for the grid
            >
              {/* Monthly Summary */}
              <div className="h-full">
                <MonthlySummary />
              </div>
              
              {/* Recent Transactions */}
              <div className="h-full">
                <RecentTransactions transactions={transactions} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
  
};

const MetricCards: React.FC<{ metrics: DashboardCardProps[] }> = ({ metrics }) => {
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
  const [monthlyData, setMonthlyData] = useState<{ day: number; totalAmount: number }[]>([]);

  useEffect(() => {
    const fetchMonthlySummary = async () => {
      try {
        const response = await axios.get("/api/transactions/monthly-summary");
        const formattedData = response.data.data.map((entry: any) => ({
          day: entry._id, // Assuming `_id` is the day of the month
          totalAmount: entry.totalAmount,
        }));
        setMonthlyData(formattedData);
      } catch (error) {
        console.error("Failed to fetch monthly summary:", error);
      }
    };

    fetchMonthlySummary();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Summary</h2>
      {monthlyData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" label={{ value: "Day", position: "insideBottom", offset: -10 }} />
            <YAxis label={{ value: "Amount (₱)", angle: -90, position: "insideLeft" }} />
            <Tooltip formatter={(value: any) => `₱${value}`} />
            <Line type="monotone" dataKey="totalAmount" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">No data available for this month.</p>
      )}
    </div>
  );
};

const RecentTransactions: React.FC<{ transactions: TransactionProps[] }> = ({ transactions }) => {
  // Limit the transactions to the latest 5
  const latestTransactions = transactions.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {latestTransactions.map((transaction) => (
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
        {latestTransactions.length === 0 && (
          <p className="text-gray-500 text-center">No recent transactions available</p>
        )}
      </div>
    </div>
  );
};


export default Dashboard;
