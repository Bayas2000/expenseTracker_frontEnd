import React, { useState } from "react";
import { FiTrendingUp, FiUsers, FiCalendar, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../../api/api";
import CreateGroup from "../groupsList/CreateGroup";

const savingsData = [
  { name: "Jan", amount: 1200 },
  { name: "Feb", amount: 1800 },
  { name: "Mar", amount: 1500 },
  { name: "Apr", amount: 2000 },
];

const recentActivity = [
  "Farith added $500 to Group Alpha",
  "Group Beta created by Ayesha",
  "Sundar invested $1200 in Mutual Funds",
  "Ravi joined Group Alpha",
];

const GroupDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Business Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <div className="p-4">
            <FiUsers className="text-2xl mb-2" />
            <p className="text-sm text-gray-500">Total Groups</p>
            <p className="text-xl font-semibold">6</p>
          </div>
        </div>
        <div>
          <div className="p-4">
            <FiTrendingUp className="text-2xl mb-2" />
            <p className="text-sm text-gray-500">Total Investments</p>
            <p className="text-xl font-semibold">$15,200</p>
          </div>
        </div>
        <div>
          <div className="p-4">
            <FiTrendingUp className="text-2xl mb-2" />
            <p className="text-sm text-gray-500">Total Savings</p>
            <p className="text-xl font-semibold">$8,750</p>
          </div>
        </div>
        <div>
          <div className="p-4">
            <FiCalendar className="text-2xl mb-2" />
            <p className="text-sm text-gray-500">Pending Contributions</p>
            <p className="text-xl font-semibold">$1,200</p>
          </div>
        </div>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investment Chart */}
        <div>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Savings Over Time</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={savingsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-2 text-sm">
              {recentActivity.map((item, i) => (
                <li
                  key={i}
                  className="bg-gray-100 p-2 rounded-md text-gray-800"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <FiPlus /> Create Group
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Add Savings
        </button>
      </div>

      {showModal && (
        <CreateGroup showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default GroupDashboard;
