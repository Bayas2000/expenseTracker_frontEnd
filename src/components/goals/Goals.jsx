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

  const monthOptions = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];

  const [selectedMonth, setSelectedMonth] = React.useState(
    monthOptions.find((month) => month.value === currentMonth)
  );

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    dispatch(LoadGoalsDetails(selectedMonth?.label, currentYear));
  }, [selectedMonth]);

  const entry = useSelector((state) => state.goals?.goals_list);

  const [modalOpen, setModalOpen] = React.useState(false);

  const handleCreateTarget = (targetData) => {
    console.log("Expense target created:", targetData);
    api
      .post("/budget/set-budget-amount", targetData)
      .then((res) => {
        toast.success("Expense target is added successfully");
        setModalOpen(false);
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };

  const limit = entry?.safeExpenseLimit ?? 0;

  const chartData =
    entry?.expense?.map((e) => {
      const day = new Date(e.transactionDate).getDate();
      const total = e.amount;
      return {
        date: `${day}`,
        total,
        yellow: total,
        green: Math.min(total, limit),
        red: total > limit ? total - limit : 0,
      };
    }) ?? [];

  const totalExpense =
    entry?.expense?.reduce((sum, e) => sum + e.amount, 0) ?? 0;

  return (
    <div className="p-4 lg:w-[100%] mx-auto">
      <div
        className={`${
          mode === "dark" ? "bg-[#F1F1F1] text-[#2D3A45]" : "bg-white"
        } lg:w-[80%] mt-5 rounded-lg p-4 shadow-sm`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold p-2 flex items-center">
            Manage Expenses
            <img className="h-6 ml-2" src={rocket} alt="target icon" />
          </h2>
          <span
            onClick={() => setModalOpen(true)}
            className="flex items-center hover:text-blue-400 hover:border-b-[1px] border-blue-200 cursor-pointer"
          >
            Create expense target
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
              className="ml-[2px]"
            >
              <path d="M368 128 L192 304 V368 H256 L432 192 Z" />
              <path d="M352 64 H144 C117.5 64 96 85.5 96 112 v288 c0 26.5 21.5 48 48 48 h224 c26.5 0 48 -21.5 48 -48 V300" />
            </svg>
          </span>
        </div>

        <div className="h-[1px] w-full bg-gray-200 my-2" />

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6 px-2">
          {entry?.expenseTargetAmount && (
            <div className="bg-gray-100 rounded-xl p-4 shadow-sm text-center">
              <h4 className="text-gray-600 text-sm font-medium">
                Expense Target
              </h4>
              <p className="text-lg font-bold text-blue-600">
                ₹{entry.expenseTargetAmount}
              </p>
            </div>
          )}

          {entry?.safeExpenseLimit && (
            <div className="bg-gray-100 rounded-xl p-4 shadow-sm text-center">
              <h4 className="text-gray-600 text-sm font-medium">Daily Limit</h4>
              <p className="text-lg font-bold text-green-600">
                ₹{entry.safeExpenseLimit}
              </p>
            </div>
          )}

          {entry?.expense && (
            <div className="bg-gray-100 rounded-xl p-4 shadow-sm text-center">
              <h4 className="text-gray-600 text-sm font-medium">
                Avg Daily Expense
              </h4>
              <p className="text-lg font-bold text-yellow-500">
                ₹{Math.round(totalExpense / entry.totalDaysInMonth)}
              </p>
            </div>
          )}

          {entry?.expense && (
            <div className="bg-gray-100 rounded-xl p-4 shadow-sm text-center">
              <h4 className="text-gray-600 text-sm font-medium">
                Avg Weekly Expense
              </h4>
              <p className="text-lg font-bold text-purple-600">
                ₹{Math.round(totalExpense / (entry.totalDaysInMonth / 7))}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-2 p-2 mt-6">
            Expense Overview - {selectedMonth?.label || currentMonth}
          </h2>
          <Select
            className="mt-4 mr-2"
            options={monthOptions}
            value={selectedMonth}
            onChange={(selectedOption) => setSelectedMonth(selectedOption)}
            isClearable
          />
        </div>

        <ResponsiveContainer width="100%" className="mt-2  " height={300}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              label={{
                value: "Days",
                position: "insideBottom",
                offset: -2,
                fontSize: 12,
                fill: "#374151",
              }}
            />
            <YAxis
              label={{
                value: "Amount ($)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fontSize: 12,
                fill: "#374151",
              }}
            />
            <Tooltip
              formatter={(value, name, props) => {
                const total = props.payload?.total ?? 0;
                const labelMap = {
                  green: "Within Limit",
                  red: "Over Limit",
                };
                return [`₹${value}`, labelMap[name] || "Total"];
              }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 shadow rounded text-sm text-gray-800">
                      <p>Day: {label}</p>
                      <p>Total: ₹{data.total}</p>
                      <p>Within Limit: ₹{data.green}</p>
                      <p>Over Limit: ₹{data.red}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* <Tooltip
              formatter={(value, name) => [
                `₹${value}`,
                name === "green" ? "Within Limit" : "Over Limit",
              ]}
            /> */}
            <CartesianGrid strokeDasharray="2 2" vertical={false} />
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
            <Line
              type="monotone"
              dataKey="total"
              stroke="#FBBF24"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Bar
              dataKey="green"
              stackId="a"
              fill="#10B981"
              animationDuration={800}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="red"
              stackId="a"
              fill="#EF4444"
              animationDuration={800}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <CreateExpenseTargetModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateTarget}
      />
    </div>
  );
};

export default Goals;
