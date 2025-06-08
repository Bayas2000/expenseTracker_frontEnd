


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import rocket from "../../assets/target.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Line,
} from "recharts";
import Select from "react-select";
import CreateExpenseTargetModal from "./GoalsModal";
import { LoadGoalsDetails } from "../../Store/Goals";
import api from "../../api/api";
import { toast } from "react-toastify";

const Goals = () => {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const monthOptions = [...Array(12)].map((_, i) => {
    const month = new Date(0, i).toLocaleString("default", { month: "long" });
    return { label: month, value: month };
  });

  const [selectedMonth, setSelectedMonth] = React.useState(
    monthOptions.find((m) => m.value === currentMonth)
  );

  const entry = useSelector((state) => state.goals?.goals_list);
  const [modalOpen, setModalOpen] = React.useState(false);

  useEffect(() => {
    dispatch(LoadGoalsDetails(selectedMonth?.label, currentYear));
  }, [selectedMonth]);

  const handleCreateTarget = (targetData) => {
    api
      .post("/budget/set-budget-amount", targetData)
      .then(() => {
        toast.success("Expense target added successfully");
        setModalOpen(false);
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const limit = entry?.safeExpenseLimit ?? 0;
  const totalExpense = entry?.expense?.reduce((sum, e) => sum + e.amount, 0) ?? 0;

  const chartData = entry?.expense?.map((e) => {
    const day = new Date(e.transactionDate).getDate();
    const total = e.amount;
    return {
      date: `${day}`,
      total,
      green: Math.min(total, limit),
      red: total > limit ? total - limit : 0,
    };
  }) ?? [];

  return (
    <div className="p-4 lg:w-[100%] mx-auto">
      <div
        className={`lg:w-[80%] mx-auto mt-5 rounded-xl p-6 shadow-sm transition-colors duration-300 ${
          mode === "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <img className="h-7" src={rocket} alt="Target" />
            <h1 className="text-2xl font-bold">Expense Goals</h1>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center text-blue-500 hover:underline"
          >
            Create Expense Target
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              viewBox="0 0 512 512"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <path d="M368 128 L192 304 V368 H256 L432 192 Z" />
              <path d="M352 64 H144 C117.5 64 96 85.5 96 112 v288 c0 26.5 21.5 48 48 48 h224 c26.5 0 48 -21.5 48 -48 V300" />
            </svg>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10">
          {entry?.expenseTargetAmount && (
            <SummaryCard title="Expense Target" value={`₹${entry.expenseTargetAmount}`} color="text-blue-600" />
          )}
          {entry?.safeExpenseLimit && (
            <SummaryCard title="Daily Limit" value={`₹${entry.safeExpenseLimit}`} color="text-green-600" />
          )}
          {entry?.expense && (
            <SummaryCard
              title="Avg Daily Expense"
              value={`₹${Math.round(totalExpense / entry.totalDaysInMonth)}`}
              color="text-yellow-500"
            />
          )}
          {entry?.expense && (
            <SummaryCard
              title="Avg Weekly Expense"
              value={`₹${Math.round(totalExpense / (entry.totalDaysInMonth / 7))}`}
              color="text-purple-600"
            />
          )}
        </div>

        {/* Chart */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Expense Overview - {selectedMonth?.label}</h2>
            <Select
              className="w-48"
              options={monthOptions}
              value={selectedMonth}
              onChange={setSelectedMonth}
              isClearable
            />
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="2 2" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                label={{ value: "Days", position: "insideBottom", offset: -2, fontSize: 12 }}
              />
              <YAxis
                label={{ value: "Amount (₹)", angle: -90, position: "insideLeft", fontSize: 12 }}
              />
              <Tooltip
                content={({ active, payload, label }) =>
                  active && payload?.length ? (
                    <div className="bg-white p-2 shadow rounded text-sm text-gray-800">
                      <p>Day: {label}</p>
                      <p>Total: ₹{payload[0].payload.total}</p>
                      <p>Within Limit: ₹{payload[0].payload.green}</p>
                      <p>Over Limit: ₹{payload[0].payload.red}</p>
                    </div>
                  ) : null
                }
              />
              <ReferenceLine
                y={limit}
                stroke="#6366F1"
                strokeDasharray="4 4"
                label={{
                  position: "right",
                  value: `₹${limit} Limit`,
                  fontSize: 12,
                  fill: "#6B7280",
                }}
              />
              <Line type="monotone" dataKey="total" stroke="#FBBF24" strokeWidth={2} dot={{ r: 3 }} />
              <Bar dataKey="green" stackId="a" fill="#10B981" />
              <Bar dataKey="red" stackId="a" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <CreateExpenseTargetModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateTarget}
      />
    </div>
  );
};

const SummaryCard = ({ title, value, color }) => (
  <div className="bg-gray-100 rounded-xl p-4 shadow-sm text-center">
    <h4 className="text-gray-600 text-sm font-medium">{title}</h4>
    <p className={`text-lg font-bold ${color}`}>{value}</p>
  </div>
);

export default Goals;

