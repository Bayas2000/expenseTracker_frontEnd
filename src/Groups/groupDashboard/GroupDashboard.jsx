
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { FiTrendingUp, FiUsers, FiCalendar } from "react-icons/fi";


const savingsData = [
  { name: "Jan", amount: 1000 },
  { name: "Feb", amount: 1200 },
  { name: "Mar", amount: 1500 },
  { name: "Apr", amount: 1700 },
  { name: "May", amount: 2000 },
  { name: "Jun", amount: 2300 },
];

const investmentData = [
  { name: "Group A", investment: 4000 },
  { name: "Group B", investment: 3000 },
  { name: "Group C", investment: 5000 },
  { name: "Group D", investment: 2500 },
];

const stats = [
  {
    icon: <FiUsers className="text-white text-xl" />,
    label: "Total Groups",
    value: "6",
    bg: "bg-indigo-500",
  },
  {
    icon: <FiTrendingUp className="text-white text-xl" />,
    label: "Total Investments",
    value: "$15,200",
    bg: "bg-emerald-500",
  },
  {
    icon: <FiTrendingUp className="text-white text-xl" />,
    label: "Total Savings",
    value: "$8,750",
    bg: "bg-blue-500",
  },
  {
    icon: <FiCalendar className="text-white text-xl" />,
    label: "Pending Contributions",
    value: "$1,200",
    bg: "bg-yellow-500",
  },
];

const GroupDashboard = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">📊 Group Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition-all"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

       {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Savings Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={savingsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Investment by Group</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={investmentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
              <Bar dataKey="investment" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>


      <div className="text-center text-gray-400 mt-10">
        <p>📈 More visual insights coming soon...</p>
      </div>
    </div>
  );
};

export default GroupDashboard;

