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
import { ChevronDown } from "lucide-react";

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

  // console.log(entry , 'entry');

  useEffect(() => {
    dispatch(LoadGoalsDetails(selectedMonth?.label, currentYear));
  }, [selectedMonth]);

  const handleCreateTarget = (targetData) => {
    api
      .post("/budget/set-budget-amount", targetData)
      .then(() => {
        toast.success("Expense target added successfully");
        dispatch(LoadGoalsDetails(selectedMonth?.label, currentYear));
        setModalOpen(false);
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const limit = entry?.safeExpenseLimit ?? 0;
  const totalExpense =
    entry?.expense?.reduce((sum, e) => sum + e.amount, 0) ?? 0;

  const chartData =
    entry?.expense?.map((e) => {
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
    <div className="px-4 py-2 max-w-full w-full mx-auto">
      <div
        className={`w-full md:max-w-5xl mx-auto mt-4 rounded-xl p-4 sm:p-6 shadow-sm transition-colors duration-300 ${
          mode === "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-2">
            <img className="h-6 sm:h-7" src={rocket} alt="Target" />
            <h1 className="text-xl sm:text-2xl font-bold whitespace-nowrap">
              Expense Goals
            </h1>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center text-blue-500 text-sm sm:text-base hover:underline"
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
        {entry.expenseTargetAmount && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <SummaryCard
              title="Expense Target"
              value={`₹${entry.expenseTargetAmount}`}
              color="text-blue-600"
            />
            <SummaryCard
              title="Daily Limit"
              value={`₹${entry.safeExpenseLimit}`}
              color="text-green-600"
            />
            <SummaryCard
              title="Avg Daily Expense"
              value={`₹${Math.round(totalExpense / entry.totalDaysInMonth)}`}
              color="text-yellow-500"
            />
            <SummaryCard
              title="Avg Weekly Expense"
              value={`₹${Math.round(
                totalExpense / (entry.totalDaysInMonth / 7)
              )}`}
              color="text-purple-600"
            />
          </div>
        )}

        {/* Chart Section */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            <h2 className="text-base sm:text-lg font-semibold">
              Expense Overview - {selectedMonth?.label}
            </h2>

            <div className="sm:w-[160px] w-full">
              <Select
                value={selectedMonth}
                onChange={(opt) => setSelectedMonth(opt)}
                options={monthOptions}
                isClearable
                isSearchable={false}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => (
                    <ChevronDown className="text-gray-500 w-4 h-4 mr-2" />
                  ),
                }}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: mode === "dark" ? "#1f2937" : "#f3f4f6",
                    borderColor: state.isFocused ? "#3b82f6" : "transparent",
                    boxShadow: "none",
                    padding: "2px 6px",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    minHeight: "32px",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: mode === "dark" ? "#e5e7eb" : "#111827",
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: "0.5rem",
                    zIndex: 20,
                  }),
                }}
              />
            </div>
          </div>

          {/* Chart */}
          {entry && chartData && (
            <div className="w-full h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="2 2" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10 }}
                    label={{
                      value: "Days",
                      position: "insideBottom",
                      offset: -5,
                      fontSize: 10,
                    }}
                  />
                  <YAxis
                    width={35}
                    tick={{ fontSize: 10 }}
                    // Remove vertical label to save space
                    // Keep only values without long text like "Amount (₹)"
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
                      position: "top",
                      value: `₹${limit} Limit`,
                      fontSize: 10,
                      fill: "#6B7280",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#FBBF24"
                    strokeWidth={2}
                    dot={{ r: 2 }}
                  />
                  <Bar dataKey="green" stackId="a" fill="#10B981" />
                  <Bar dataKey="red" stackId="a" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
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
  <div className="bg-gray-100 rounded-xl p-3 sm:p-4 shadow-sm text-center">
    <h4 className="text-gray-600 text-xs sm:text-sm font-medium">{title}</h4>
    <p className={`text-base sm:text-lg font-bold ${color}`}>{value}</p>
  </div>
);

export default Goals;
