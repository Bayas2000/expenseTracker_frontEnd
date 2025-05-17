import React from "react";

const summaryCards = [
  {
    title: "Balance",
    value: "$60,900",
    change: "+7.4%",
    color: "#FDF5ED",
  },
  {
    title: "Spending",
    value: "$1,200",
    change: "+3.4%",
    color: "#EAF4EC",
  },
  {
    title: "Portfolio",
    value: "$142,390",
    change: "+3.1%",
    color: "#E7EFFA",
  },
  {
    title: "Investment",
    value: "$32,390",
    change: "+11.4%",
    color: "#EDF4F1",
  },
];

const SummaryCard = ({ title, value, change, color }) => (
  <div
    className="rounded-xl p-5 shadow-sm w-full"
    style={{ backgroundColor: color }}
  >
    <p className="text-gray-600 text-sm mb-1">{title}</p>
    <p className="text-xl font-bold text-gray-800">{value}</p>
    <p className="text-xs text-green-600 mt-1">{change} than last month</p>
  </div>
);

const SummaryCardsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 ">
      {summaryCards.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  );
};

export default SummaryCardsGrid;
