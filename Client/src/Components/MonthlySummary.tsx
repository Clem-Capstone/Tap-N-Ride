const MonthlySummary: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6" style={{ height: "400px" }}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Summary</h2>
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={summaryData}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" label={{ value: "Day", position: "insideBottom", offset: -5 }} />
            <YAxis
              label={{ value: "Amount (₱)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
