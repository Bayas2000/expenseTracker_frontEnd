import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const spendingData = [
  { day: "Sun", amount: 24000 },
  { day: "Mon", amount: 32000 },
  { day: "Tue", amount: 18000 },
  { day: "Wed", amount: 45000 }, 
  { day: "Thu", amount: 30000 },
  { day: "Fri", amount: 37000 },
  { day: "Sat", amount: 22000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow text-black text-xs">
        <p className="font-medium">{label}</p>
        <p>${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const GroupChart = () => {
  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: "#007C7C" }}>
      <h3 className="text-white text-lg font-semibold mb-2">Spending</h3>
      <p className="text-white text-sm mb-4">
        $1,200 <span className="text-green-300 text-xs">+3.4%</span>
      </p>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={spendingData}>
          <CartesianGrid stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="day"
            stroke="#fff"
            tick={{ fill: "#fff", fontSize: 12 }}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="amount"
            radius={[6, 6, 0, 0]}
            fill="#FAEED1"
            // Highlight Wednesday bar
            shape={({ x, y, width, height, payload }) => {
              const color = payload.day === "Wed" ? "#ffffff" : "#FAEED1";
              return (
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={color}
                  rx={6}
                  ry={6}
                />
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GroupChart;
